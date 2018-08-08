import { query as queryUsers, queryCurrent } from '../services/user';
import { reloadAuthorized } from '../utils/Authorized';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (response.status === '200') {

        reloadAuthorized();
        yield put({
          type: 'saveCurrentUser',
          payload: response.data
        });
        
        yield put(routerRedux.push('/'));
      }
    
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      console.log("saveCurrentUser",action)
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      console.log("changeNotifyCount",action)
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
