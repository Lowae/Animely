import IDOMParser from 'advanced-html-parser';
import {fetchUrl} from '../http/HttpUtils';
import HomeEntity, {Banner, Group} from '../../entity/HomeEntity';
import Anime from '../../entity/AnimeEntity';
import DetailEntity, {
  PlayEpisode,
  Recommend,
  Tag,
} from '../../entity/DetailEntity';
import VideoEntity from '../../entity/VideoEntity';
import PageEntity from '../../entity/PageEntity';
import Parser from './Parser';

const Url = 'http://m.yinghuacd.com';
const pcUrl = 'http://www.yinghuacd.com';

const HomeParser: Promise<HomeEntity> = fetchUrl(Url)
  .then(response => {
    return response.text();
  })
  .then(text => {
    const dom = IDOMParser.parse(text);
    const li = dom.querySelectorAll('.swipe #slider li');
    const banners: Array<Banner> = [];
    li.forEach(liElement => {
      let imgUrl = liElement.querySelector('a img').getAttribute('src');
      const banner = new Banner(
        liElement.textContent,
        imgUrl,
        liElement.querySelector('a').getAttribute('href'),
      );
      banners.push(banner);
    });

    // 分组列表数据
    const sections = dom.querySelector('.list');
    const titles = [];
    sections.querySelectorAll('.listtit .listtitle').forEach(element => {
      titles.push(element.textContent);
    });
    const uls = sections.querySelectorAll('ul');
    const animeGroups = titles.map((value, index) => {
      const first = uls[index * 2];
      const second = uls[index * 2 + 1];
      const animes: Array<Anime> = [];
      const map = element => {
        animes.push(getAnimeInfoByElement(element));
      };
      first.querySelectorAll('.item').forEach(map);
      second.querySelectorAll('.item').forEach(map);
      return new Group(value, animes);
    });
    return new HomeEntity(banners, animeGroups);
  });

const DetailParser = detailUrl =>
  fetchUrl(pcUrl + detailUrl)
    .then(response => {
      return response.text();
    })
    .then(text => {
      const dom = IDOMParser.parse(text);
      const playlistsE = dom.querySelectorAll('.movurl ul li');
      const playlists: Array<PlayEpisode> = [];
      playlistsE.forEach(value => {
        playlists.push(
          new PlayEpisode(
            value.textContent,
            value.querySelector('a').getAttribute('href').trimEnd(),
          ),
        );
      });
      const recommendList: Array<Recommend> = [];
      dom.querySelectorAll('.pics li').forEach(element => {
        recommendList.push(
          new Recommend(
            element.querySelector('h2').textContent,
            element.querySelector('a img').getAttribute('src'),
            element.querySelector('a').getAttribute('href'),
          ),
        );
      });
      const tags: Array<Tag> = [];
      dom.querySelectorAll('.fire .rate .sinfo span').forEach(value => {
        const label = value.querySelector('label').textContent;
        switch (label) {
          case '标签:':
          case '类型:':
            value.querySelectorAll('a').forEach(a => {
              tags.push(new Tag(a.textContent, a.getAttribute('href')));
            });
            break;
          default:
            break;
        }
      });

      return new DetailEntity(
        dom.querySelector('.thumb img').getAttribute('src'),
        dom.querySelector('.fire .rate h1').textContent,
        dom.querySelector('.fire .info').textContent,
        tags,
        playlists,
        recommendList,
      );
    });

const VideoParser = playPageUrl =>
  fetchUrl(Url + playPageUrl)
    .then(response => {
      return response.text();
    })
    .then(text => {
      const dom = IDOMParser.parse(text);
      const attribute = dom
        .querySelector('#play_1')
        .getAttribute('onClick')
        .trimEnd();
      const playUrl = attribute.substring(
        attribute.indexOf('(') + 2,
        attribute.indexOf(')') - 1,
      );

      return new VideoEntity(playUrl.substring(0, playUrl.indexOf('$')));
    });

const PageParser = pageUrl =>
  fetchUrl(Url + pageUrl)
    .then(response => {
      return response.text();
    })
    .then(text => pageParser(text));

const SearchParser = searchUrl =>
  fetchUrl(Url + searchUrl)
    .then(response => {
      return response.text();
    })
    .then(text => pageParser(text));

function pageParser(text: string) {
  const dom = IDOMParser.parse(text);
  const itemElements = dom.querySelectorAll('.list ul li');
  const items = [];
  itemElements.forEach(value => {
    items.push(getAnimeInfoByElement(value));
  });

  return new PageEntity(dom.querySelector('.list .listtit').textContent, items);
}

function getAnimeInfoByElement(element): Anime {
  const style = element
    .querySelector('.imgblock')
    .getAttribute('style')
    .trimEnd();
  const bgUrl = style.substring(style.indexOf('(') + 2, style.indexOf(')') - 1);

  return new Anime(
    element.querySelector('.itemtext').textContent,
    element.querySelector('.itemimgtext').textContent,
    bgUrl,
    element.querySelector('.itemtext').getAttribute('href'),
  );
}

const YHDM_PARSER = new Parser(
  HomeParser,
  DetailParser,
  VideoParser,
  SearchParser,
  PageParser,
);

export default YHDM_PARSER;
