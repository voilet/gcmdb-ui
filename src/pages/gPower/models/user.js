import {
  queryUserlist,
} from '@/services/AuthManagementAPI/userAPI'


export default {
  namespace: 'gPower',

  state: {
    list: [],
    data: {
      user_infos:[],
      role_list:[]
    },
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
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    //获取用户列表
    *getUserlist({payload},{call,put}) {
      const response = yield call(queryUserlist);
      console.log("response",response)
      yield put({
        type: 'saveUser',
        payload: response,
        cb: payload.cb,
      });
    }

    
    

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveUser(state, action) {

      action.cb && action.cb(action.payload.data)

      return {
        ...state,
        data: action.payload,
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
