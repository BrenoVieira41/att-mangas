import { Request, Response } from 'express';
import ReadService from './service';

class ReadController {
  async createPreference(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const createPreference = await ReadService.createPreference(data);
      return res.status(200).send(createPreference);
    } catch (error) {
      console.error(error);
      return res.status(400).send('Falha ao adicionar novo mangá.');
    }
  }

  async readAllPreferences(req: Request, res: Response): Promise<Response> {
    try {
      const preferences = await ReadService.readPreferences();
      return res.status(200).send(preferences);
    } catch (error) {
      console.error(error);
      return res.status(400).send('Falha ao ler preferências.');
    }
  }

  async readManga(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      await ReadService.updatePreference(data);
      return res.status(200).send('Ultimo episódio adicionado');
    } catch (error) {
      console.error(error);
      return res.status(400).send('Falha ao ler novo episódio.');
    }
  }
}

export default new ReadController();
// adicionar nova leitura,
// ler,

// lançados,
// ---
// escalonar novas leitura.
