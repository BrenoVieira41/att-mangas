import 'reflect-metadata';
import { launch } from 'puppeteer';
import { unlinkSync } from 'fs';
import { scheduleJob } from 'node-schedule';
import { createWorker } from 'tesseract.js';
import ReadRepository from './module/repository';
import { appDataSource } from './database';

interface Massage {
  messages: number
  result: number
}

async function lastChapter(link: string) {
  const browser = await launch();
  const page = await browser.newPage();

  const site = link;
  await page.goto(site);
  await page.evaluate(() => {
    const element = document.querySelector('div.container-box.default.color-brown');
    if (element) {
      element.scrollIntoView();
    }
  });

  const partesDaURL = site.split('/');
  const fullTitle = partesDaURL[partesDaURL.length - 2];
  const title = fullTitle.split('-');

  const titleFormated = title.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  const newTitle = titleFormated + '.png';

  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.screenshot({ path: newTitle });

  const worker = await createWorker();
  await worker.load();
  await worker.loadLanguage('por');
  await worker.initialize('por');
  const chapter = (await worker.recognize(newTitle)).data.text;
  const lastMassage = chapter.trim().split('\n');
  const wordMassage = lastMassage.map(it => it.split(' '));
  let findWord: Massage;

  for (let messages in wordMassage) {
    const result = wordMassage[messages].findIndex(it => it === 'Capítulo');
    if (result === 0) {
      findWord = { messages: Number(messages), result };
      break;
    }
  }

  const newChapter = wordMassage[findWord.messages][findWord.result + 1];
  await worker.terminate();
  unlinkSync(newTitle);
  const titleComplet = title.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return { chapter: newChapter, manga: titleComplet };
}

(async () => {
  appDataSource.initialize().then(_ => console.log('iniciado!'));
  await new Promise(resolve => setTimeout(resolve, 2000));
  const repository = new ReadRepository();

  scheduleJob('*/30 * * * *', async () => {
    const preferences = await repository.readPreference();

    for (const preference of preferences) {
      const mangaName = preference.name;
      const lastEp = await lastChapter(preference.link);
      const lastChapterSaved = await repository.lastManga(mangaName);

      if (Number(lastEp.chapter) <= Number(preference.watched)) {
        return console.log(`${mangaName}, Não teve novos lançamentos.`);
      }

      if (Number(lastChapterSaved.chapter) < Number(lastEp.chapter)) {
        await repository.addManga(mangaName, lastEp.chapter);
      }

      return console.log(`${mangaName}, possuí novos episódios. último EP = ${lastEp.chapter}`);
    }
  });
})();
