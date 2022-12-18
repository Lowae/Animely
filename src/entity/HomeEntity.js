import Anime from './AnimeEntity';

export default class HomeEntity {
  constructor(banner: Banner, group: Group) {
    this.banner = banner;
    this.group = group;
  }
}

export class Banner {
  constructor(title, image, detailUrl) {
    this.title = title;
    this.image = image;
    this.detailUrl = detailUrl;
  }
}

export class Group {
  constructor(title, data: Array<Anime>) {
    this.title = title;
    this.data = data;
  }
}
