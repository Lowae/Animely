import IDOMParser from 'advanced-html-parser';

const Url = 'http://m.yinghuacd.com/';

export const Banners = fetch(Url)
  .then(response => {
    return response.text();
  })
  .then(text => {
    const dom = IDOMParser.parse(text);
    const li = dom.querySelectorAll('.swipe #slider li');
    let result = [];
    li.forEach(li => {
      let imgUrl = li.querySelector('a img').getAttribute('src');
      result.push({
        title: li.textContent,
        image: imgUrl,
      });
    });
    return result;
  });
