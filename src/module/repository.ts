import { appDataSource } from './../database/index';
import { Manga } from '../database/entity/Mangas';
import { Preferences } from '../database/entity/Preferences';

const preferencesRepository = appDataSource.getRepository(Preferences);
const mangaRepository = appDataSource.getRepository(Manga);

class ReadRepository {
  public async readPreference(): Promise<any> {
    const preferences = await preferencesRepository.find();
    return preferences;
  }

  public async createPreference(name: string, link: string, watched: string): Promise<any> {
    const createmanga = await mangaRepository.save({ chapter: watched, name: name });
    const createPreference = await preferencesRepository.save({ name, link, watched, manga_id: createmanga.id});
    return createPreference;
  }

  public async updatePreference(name: string, watched: string): Promise<any> {
    const createPreference = await preferencesRepository.update({name}, {watched});
    return createPreference;
  }

  public async lastManga(id: number): Promise<any> {
    const readManga = await mangaRepository.findOne({
      where: {id},
      order: { chapter: 'DESC' }
    });
    return readManga;
  }

  public async addManga(name: string, chapter: string): Promise<any> {
    const addManga = await mangaRepository.save({ chapter: chapter, name: name });
    return addManga;
  }
  // id
  // name
  // chapter

}

export default ReadRepository;

// manga
// link
// watched
