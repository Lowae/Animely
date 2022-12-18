import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {dataSourceReducer} from './reducers/DataSource';

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: {
    dataSource: dataSourceReducer,
  },
  middleware,
});

export default store;
