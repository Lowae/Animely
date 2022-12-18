import Anime from './AnimeEntity';

export default class PageEntity {
  constructor(title: string, data: Array<Anime>) {
    this.title = title;
    this.data = data;
  }
}
