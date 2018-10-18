import {
  queryRolelist,
  modifyRolelist,
  grantRolelist,
  getResourceById
} from '@/services/AuthManagementAPI/roleAPI'


export default {
  namespace: 'grole',

  state: {
    list: [],
    data: [],
    pagination:{},
    assignInfo:{
      data:[]
    },
  },

  effects: {
    //获取角色列表
    *getRolelist({payload},{call,put}) {
      const response = yield call(queryRolelist);

      yield put({
        type: 'saveRole',
        payload: response,
      });
    },

    //修改角色信息列表
    *modifyRole({payload},{call,put}){
      const response = yield call(modifyUserlist,payload);
      yield put({
        type: 'saveResponse',
        payload: response,
        cb: payload.cb,
      });
      yield put({ type: 'reloadUser'})
    },
    
    //添加用户信息列表
    *addRole({payload},{call,put}){
      const response = yield call(addUserlist,payload.description);
      yield put({
        type: 'saveResponse',
        payload: response,
        cb: payload.cb,
      });
      yield put({ type: 'reloadUser'})
    },

    //根据角色id获取资源列表
    *getRoleResource({payload},{call,put}){
      const response = yield call(getResourceById,payload)
      yield put({
        type: 'saveResource',
        payload: response,
        cb: payload.cb,
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
    saveRole(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveResource(state, action) {
      action.cb && action.cb(action.payload)
      return {
        ...state,
        assignInfo: action.payload,
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
