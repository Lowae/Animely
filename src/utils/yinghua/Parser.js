const jsdom = require('jsdom-jscore');
const {JSDOM} = jsdom;

const Url = 'http://m.yinghuacd.com/';

export const Banners = fetch(Url)
  .then(response => {
    return response.text();
  })
  .then(text => {
    const dom = new JSDOM(text);
    const li = dom.window.document.querySelectorAll('.swipe #slider li');
    let result = [];
    li.forEach(li => {
      let imgUrl = li.querySelector('a img').src;
      result.push({
        title: li.textContent,
        image: imgUrl,
      });
    });
    return result;
  });
