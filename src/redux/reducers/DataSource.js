import {createSlice} from '@reduxjs/toolkit';
import Parser from '../../utils/parser/Parser';
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
      label: '嘛哩嘛哩',
      host: 'malimali',
      url: 'https://www.malimali6.com/',
    },
  ],
};

const dataSourceSlice = createSlice({
  name: 'PARSER',
  initialState: {
    fromParser: {
      label: FromSource.fromParser[0].label,
      source: FromSource.fromParser[0],
    },
    fromWeb: {
      label: FromSource.fromWeb[0].label,
      source: FromSource.fromWeb[0],
    },
  },
  reducers: {
    updateFromParserAction: (state, action) => {
      state.fromParser = {
        label: action.payload,
        source: FromSource.fromParser.find(({label}) => {
          return label === action.payload;
        }),
      };
    },
    updateFromWebAction: (state, action) => {
      state.fromWeb = {
        label: action.payload,
        source: FromSource.fromWeb.find(({label}) => {
          return label === action.payload;
        }),
      };
    },
  },
});

export const {updateFromParserAction, updateFromWebAction} =
  dataSourceSlice.actions;

export const dataSourceReducer = dataSourceSlice.reducer;

export const mapDispatchToProps = dispatch => {
  return {
    updateFromParser: label => dispatch(updateFromParserAction(label)),
    updateFromWeb: label => dispatch(updateFromWebAction(label)),
  };
};

export const mapFromParserToProps = state => {
  return {
    source: state.dataSource.fromParser.source,
  };
};
export const mapFromWebToProps = state => {
  return {
    source: state.dataSource.fromWeb.source,
  };
};
