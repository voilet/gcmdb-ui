import { query as queryUsers, queryCurrent,queryUserInfo, updateUserInfo } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
      userInfo:{},
  },

  effects: {
    *fetchUsers(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
          callback:payload.callback
      });
    },
      *fetchUserInfo({payload}, {call,put}){
          const response = yield call(queryUserInfo);
          yield put({
              type: 'saveCurrentUserInfo',
              payload: response.data||{},
              callback: payload ? payload.callback:function(){}
          });
      },
      *modifyUserInfo({ payload }, { call, put }){
        const response = yield call(updateUserInfo, payload );
        yield put({
          type: 'saveCurrentUserInfo',
          payload: response.data||{},
          callback:payload.callback
        });
        /*
        yield put({
          type: 'saveCurrentUserInfo',
          payload: response.data||{},
          callback:payload.callback
        });
        */
      }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      action.callback && action.callback( action.payload );
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveCurrentUserInfo( state, action ){
      action.callback && action.callback( action.payload );
      return {
        ...state,
        userInfo: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
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
