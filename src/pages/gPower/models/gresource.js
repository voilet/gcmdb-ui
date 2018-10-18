import {
    queryResourcelist,
    addResourcelist,
    modifyResourcelist,
    deleteResourcelist,
    getResourceTreeForparent
  } from '@/services/AuthManagementAPI/resourceAPI'
  
  
  export default {
    namespace: 'gresource',
  
    state: {
      data: [],
      parentdata: []
    },
  
    effects: {
      //获取资源列表
      *getResourcelist({payload},{call,put}) {
        
        const response = yield call(queryResourcelist);
    
        
        yield put({
          type: 'saveResource',
          payload: response,
          cb:  payload.cb 
        });
      },
  
      //修改资源列表
      *modifyResourcelist({payload},{call,put}){
        const response = yield call(modifyResourcelist,payload);
        yield put({
          type: 'saveResponse',
          payload: response,
          cb: payload.cb,
        });
        yield put({ type: 'reloadUser'})
      },
      
      //添加资源列表
      *addResourcelist({payload},{call,put}){
        const response = yield call(addResourcelist,payload);
        yield put({
          type: 'saveResponse',
          payload: response,
          cb: payload.cb,
        });
        yield put({ type: 'reloadUser'})
      },

      //删除资源列表
      *deleteResourcelist({payload},{call,put}){
      const response = yield call(deleteResourcelist,payload);
      yield put({
        type: 'saveResponse',
        payload: response,
        cb: payload.cb,
      });
      yield put({ type: 'reloadUser'})
    },
      
  
    //获取父资源列表
    *getResourceTreeForparent({payload},{call,put}){
      const response = yield call(getResourceTreeForparent,payload)
      yield put({
        type: 'saveParentResource',
        payload: response,
        cb: payload.cb,
      });
    },
  
      //重新加载主机基础信息
      *reloadResource(action, { put, select }) {
        yield put({ type: 'getResourcelist'} );
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
      saveParentResource(state, action) {
        action.cb && action.cb(action.payload)
        return {
          ...state,
          parentdata: action.payload,
        };
      },
      saveResource(state, action) {
        action.cb && action.cb(action.payload)
        return {
          ...state,
          ...action.payload,
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
  