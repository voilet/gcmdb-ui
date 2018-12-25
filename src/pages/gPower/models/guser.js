import {
  queryUsers,

  addUserlist,
  modifyUserlist,
  searchUserlist,
  querySSHRoleList
} from '@/services/AuthManagementAPI/userAPI'


export default {
  namespace: 'guser',

  state: {
    data: {
      data: {
        user_infos:[],
        role_list:[],
      },
      pagination:{}
    },
    //ssh 角色类型
    ssh_role:[]
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'saveInfos',
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
    /** 查询主机操作权限*/
    *fetchSSHRoleList( {payload} , { call, put }){
      const response = yield call( querySSHRoleList );
      yield put({
        type: 'saveSSHRoleList',
        payload: response,
        callback: payload.callback || function(){}
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
    saveInfos(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    saveSSHRoleList( state, action ){
      action.callback && action.callback( action.payload );
      return {
        ...state,
        ssh_role: action.payload.data || []
      }
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
