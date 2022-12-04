import IDOMParser from 'advanced-html-parser';

const Url = 'http://m.yinghuacd.com/';

export const Banners = fetch(Url)
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
        const style = element
          .querySelector('.imgblock')
          .getAttribute('style')
          .trimEnd();
        const bgUrl = style.substring(
          style.indexOf('(') + 2,
          style.indexOf(')') - 1,
        );
        animes.push({
          name: element.querySelector('.itemtext').textContent,
          description: element.querySelector('.itemimgtext').textContent,
          image: bgUrl,
        });
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
