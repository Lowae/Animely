import IDOMParser from 'advanced-html-parser';
import {re} from '@babel/core/lib/vendor/import-meta-resolve';

const Url = 'http://m.yinghuacd.com/';
const pcUrl = 'http://www.yinghuacd.com';

export const HomeParser = fetch(Url)
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
  fetch(pcUrl + detailUrl)
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
      return {
        cover: dom.querySelector('.thumb img').getAttribute('src'),
        name: dom.querySelector('.fire .rate h1').textContent,
        description: dom.querySelector('.fire .info').textContent,
        playlists: playlists,
        recommends: recommendList,
      };
    });

export const VideoParser = playUrl =>
  fetch(Url + playUrl)
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
