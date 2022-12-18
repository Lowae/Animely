export default class DetailEntity {
  constructor(
    cover: string,
    name: string,
    description: string,
    tags: Array<Tag>,
    playlists: Array<PlayEpisode>,
    recommends: Array<Recommend>,
  ) {
    this.cover = cover;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.playlists = playlists;
    this.recommends = recommends;
  }
}
export class Tag {
  constructor(tag: string, href: string) {
    this.tag = tag;
    this.href = href;
  }
}

export class PlayEpisode {
  constructor(episode: string, playUrl: string) {
    this.episode = episode;
    this.playUrl = playUrl;
  }
}

export class Recommend {
  constructor(name: string, image: string, detailUrl: string) {
    this.name = name;
    this.image = image;
    this.detailUrl = detailUrl;
  }
}
