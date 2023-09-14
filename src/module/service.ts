import ReadRepository from './repository';

class ReadService {
  private readonly readRepository: ReadRepository;

  constructor() {
    this.readRepository = new ReadRepository();
  }

  public async readPreferences(): Promise<any> {
    const readPreferences = this.readRepository.readPreference();
    return readPreferences;
  }

  public async createPreference(data: any): Promise<any> {
    const { name, link, watched } = data;
    const regex = new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i);


    if (!name || !this.validateBetween(name.length, 3, 100)) throw new Error('O nome do mangá precisa de no minimo 4 carcteres');
    if (!regex.test(link)) throw new Error('E necessário passar um link valido.');
    if (isNaN(watched)) throw new Error('E necessário passar um episódio valido.');

    const createPreference = await this.readRepository.createPreference(name.toLowerCase(), link, watched);
    return createPreference;
  }

  public async updatePreference(data: any): Promise<any> {
    const { name, watched } = data;

    if (!name || !this.validateBetween(name.length, 3, 100)) throw new Error('O nome do mangá precisa de no minimo 4 carcteres');
    if (isNaN(watched)) throw new Error('E necessário passar um episódio valido.');

    const updatePreference = await this.readRepository.updatePreference(name.toLowerCase(), watched);
    return updatePreference;
  }

  private validateBetween(value: number, min: number = 3, max: number = 255) {
    if (value > max || value < min) return false;
    return true;
  }
}

export default new ReadService();
