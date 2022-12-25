import {createSlice} from '@reduxjs/toolkit';
import YHDM_PARSER from '../../utils/parser/YHDM';

const FromSource = {
  fromParser: [
    {
      label: '樱花动漫',
      host: 'yinghuacd',
      parser: YHDM_PARSER,
    },
  ],
  fromWeb: [
    {
      label: 'AGE动漫',
      host: 'agemys',
      url: 'https://www.agemys.net/',
      injectedScript: `
      setTimeout(function() { 
          const videoUrl = new URL(document.querySelector('iframe').src).searchParams.get('url');
          window.ReactNativeWebView.postMessage(videoUrl);
      }, 2000);
      true;
      `,
    },
    {
      label: '嘛哩嘛哩',
      host: 'malimali',
      url: 'https://www.malimali6.com/',
      injectedScript: `
      const videoUrl = new URL(document.querySelector('.MacPlayer table iframe').src).searchParams.get('url');
      window.ReactNativeWebView.postMessage(videoUrl);
      true;
      `,
    },
  ],
};

let currentParserSource = FromSource.fromParser[0];
let currentWebSource = FromSource.fromWeb[0];

export const mapParserLabelToSource = fromLabel => {
  currentParserSource = FromSource.fromParser.find(({label}) => {
    return label === fromLabel;
  });
};

export const mapWebLabelToSource = fromLabel => {
  currentWebSource = FromSource.fromWeb.find(({label}) => {
    return label === fromLabel;
  });
};

export const getCurrentWebSource = () => currentWebSource;
export const getCurrentParserSource = () => currentParserSource;
