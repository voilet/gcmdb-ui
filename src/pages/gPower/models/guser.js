import {
  queryUserlist,
  addUserlist,
  modifyUserlist,
  searchUserlist
} from '@/services/AuthManagementAPI/userAPI'


export default {
  namespace: 'guser',

  state: {
    list: [],
    data: {
      data: {
        user_infos:[],
        role_list:[],
      },
      pagination:{}
    }
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

      yield put({
        type: 'saveUser',
        payload: response,
      });
    },

    //修改用户信息列表
    *modifyUser({payload},{call,put}){
      const response = yield call(modifyUserlist,payload);
      yield put({
        type: 'saveResponse',
        payload: response,
        cb: payload.cb,
      });
      yield put({ type: 'reloadUser'})
    },
    
    //添加用户信息列表
    *addUser({payload},{call,put}){
      const response = yield call(addUserlist,payload.description);
      yield put({
        type: 'saveResponse',
        payload: response,
        cb: payload.cb,
      });
      yield put({ type: 'reloadUser'})
    },

    //搜索用户
    *searchUser({ payload }, { call, put }) {
      const response = yield call(searchUserlist, payload.destination) 
      // 
      yield put({
        type: 'searchSaveUser',
        payload: response,
      });
    

    },



    //重新加载主机基础信息
    *reloadUser(action, { put, select }) {
      yield put({ type: 'getUserlist'} );
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },

    saveResponse(state, action){
      action.cb && action.cb(action.payload)
      return {
        ...state,
        response: action.payload,
      };
    },

    searchSaveUser(state, action){
      // action.cb && action.cb(action.payload)
      return {
        ...state,
        data: action.payload,
      };
    },
    saveUser(state, action) {
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

    empty(state, action){
      return  {
        ...state,
        data: {
          data: {
            user_infos:[],
          },
          pagination:{}
        }
      }
    }
  },
};
