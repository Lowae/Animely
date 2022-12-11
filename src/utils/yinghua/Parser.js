import IDOMParser from 'advanced-html-parser';
import {fetchUrl} from '../http/HttpUtils';

const Url = 'http://m.yinghuacd.com';
const pcUrl = 'http://www.yinghuacd.com';

export const HomeParser = fetchUrl(Url)
  .then(response => {
    return response.text();
  })
  .then(text => {
    const dom = IDOMParser.parse(text);
    const li = dom.querySelectorAll('.swipe #slider li');
    let banner = [];
    li.forEach(li => {
      let imgUrl = li.querySelector('a img').getAttribute('src');
      banner.push({
        title: li.textContent,
        image: imgUrl,
        detailUrl: li.querySelector('a').getAttribute('href'),
      });
    });

    // 分组列表数据
    const sections = dom.querySelector('.list');
    const titles = [];
    sections.querySelectorAll('.listtit .listtitle').forEach(element => {
      titles.push(element.textContent);
    });
    const uls = sections.querySelectorAll('ul');
    const animeGroups = titles.map((value, index, array) => {
      const first = uls[index * 2];
      const second = uls[index * 2 + 1];
      const animes = [];
      const map = (element, key, parent) => {
        animes.push(getAnimeInfoByElement(element));
      };
      first.querySelectorAll('.item').forEach(map);
      second.querySelectorAll('.item').forEach(map);
      return {
        title: value,
        data: animes,
      };
    });
    return {
      banners: banner,
      groups: animeGroups,
    };
  });

export const DetailParser = detailUrl =>
  fetchUrl(pcUrl + detailUrl)
    .then(response => {
      return response.text();
    })
    .then(text => {
      const dom = IDOMParser.parse(text);
      const playlistsE = dom.querySelectorAll('.movurl ul li');
      let playlists = [];
      playlistsE.forEach((value, key, parent) => {
        playlists.push({
          episode: value.textContent,
          playUrl: value.querySelector('a').getAttribute('href').trimEnd(),
        });
      });
      const recommendList = [];
      dom.querySelectorAll('.pics li').forEach((element, key, parent) => {
        recommendList.push({
          name: element.querySelector('h2').textContent,
          image: element.querySelector('a img').getAttribute('src'),
          detailUrl: element.querySelector('a').getAttribute('href'),
        });
      });
      const tags = [];
      dom
        .querySelectorAll('.fire .rate .sinfo span')
        .forEach((value, key, parent) => {
          const label = value.querySelector('label').textContent;
          switch (label) {
            case '标签:':
            case '类型:':
              value.querySelectorAll('a').forEach((a, key1, parent1) => {
                tags.push({
                  tag: a.textContent,
                  href: a.getAttribute('href'),
                });
              });
              break;
            default:
              break;
          }
        });
      return {
        cover: dom.querySelector('.thumb img').getAttribute('src'),
        name: dom.querySelector('.fire .rate h1').textContent,
        description: dom.querySelector('.fire .info').textContent,
        tags: tags,
        playlists: playlists,
        recommends: recommendList,
      };
    });

export const VideoParser = playUrl =>
  fetchUrl(Url + playUrl)
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

      return playUrl.substring(0, playUrl.indexOf('$'));
    });

export const PageParser = pageUrl =>
  fetchUrl(Url + pageUrl)
    .then(response => {
      return response.text();
    })
    .then(text => pageParser(text));

export function SearchParser(searchUrl) {
  console.log(Url + searchUrl);
  return fetchUrl(Url + searchUrl)
    .then(response => {
      return response.text();
    })
    .then(text => pageParser(text));
}

function pageParser(text: string) {
  const dom = IDOMParser.parse(text);
  const itemElements = dom.querySelectorAll('.list ul li');
  const items = [];
  itemElements.forEach((value, key, parent) => {
    items.push(getAnimeInfoByElement(value));
  });
  return {
    title: dom.querySelector('.list .listtit').textContent,
    data: items,
  };
}

function getAnimeInfoByElement(element) {
  const style = element
    .querySelector('.imgblock')
    .getAttribute('style')
    .trimEnd();
  const bgUrl = style.substring(style.indexOf('(') + 2, style.indexOf(')') - 1);
  return {
    name: element.querySelector('.itemtext').textContent,
    description: element.querySelector('.itemimgtext').textContent,
    image: bgUrl,
    detailUrl: element.querySelector('.itemtext').getAttribute('href'),
  };
}
