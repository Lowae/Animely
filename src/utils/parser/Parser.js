import HomeEntity from '../../entity/HomeEntity';
import DetailEntity from '../../entity/DetailEntity';
import VideoEntity from '../../entity/VideoEntity';
import PageEntity from '../../entity/PageEntity';
export default class Parser {
  constructor(
    homeParser: Promise<HomeEntity>,
    detailParser: (detailUrl: string) => Promise<DetailEntity>,
    videoParser: (playPageUrl: string) => Promise<VideoEntity>,
    searchParser: (searchUrl: string) => Promise<PageEntity>,
    pageParser: (pageUrl: string) => Promise<PageEntity>,
  ) {
    this.homeParser = homeParser;
    this.detailParser = detailParser;
    this.videoParser = videoParser;
    this.searchParser = searchParser;
    this.pageParser = pageParser;
  }
}
