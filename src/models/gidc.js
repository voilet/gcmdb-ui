import {
  queryIDC,addIDC,deleteIDC,modifyIDC,
  addProvider,queryProvider,modifyProvider,deleteProvider,
  queryCabinet,addCabinet,deleteCabinet,modifyCabinet,
  deleteBay,queryBay,addBay,modifyBay,
  queryIpResource,addIpResource,modifyIpResource,deleteIpResource,checkIpResource
  } from '../services/ResourceMangementAPI/Idc/IdcService'
import {message} from 'antd'


export default {
  namespace: 'gidc',

  state: {
    //机房数据
    idc: {
      data: [],
      pagination: {}
    },
    //运营商
    provider: {
      data: [],
      pagination: {}
    },
    //机柜
    cabinet: {
      data: [],
      pagination: {}
    },
    //机架
    bays: {
      data: [],
      pagination: {}
    },
    ipresource:{
      data:[],
      pagination: {}
    }
  },


  effects: {
    // 获取机房列表
    *queryIDC({ payload }, { call, put }) {
      const response = yield call(queryIDC, payload) 
      if (response.code == 200) {
        yield put({
          type: 'idcSave',
          payload: response,
        });
        } else {
          message.error(response.data)
      }
    },

    //添加机房
    *addIDC({ payload }, { call,put }) {
      yield call(addIDC, payload.description);
      yield put({ type: 'reloadIDC'})
    },

    //修改机房
    *modifyIDC({ payload }, { call,put }) {
       yield call(modifyIDC, payload);
       yield put({ type: 'reloadIDC'})
      },

      //删除机房
    *deleteIDC({ payload }, { call,put }) {
         yield call(deleteIDC, payload);
         yield put({ type: 'reloadIDC'})

      },

    //重新加载IDC数据
    *reloadIDC(action, { put, select }) {
      const idc = yield select(state => state.gidc.idc );
      yield put({ type: 'queryIDC', payload: { idc } });
    },

      //查询机柜信息
    *queryCabinet({ payload }, { call }) {
        const response =   yield call(queryCabinet, payload);
        if (response.code == 200) {
          yield put({
            type: 'cabinetSave',
            payload: response || [],
          });
        } else {
          message.error(response.data);
        }
      },

      //添加机柜信息
      *addCabinet({ payload }, { call }) {
        yield call(addCabinet, payload.field);
        yield put({ type: 'reloadCabinet'})
      },
  
      //删除机柜信息
      *deleteCabinet({ payload }, { call }) {
        yield call(deleteCabinet, payload);
        yield put({ type: 'reloadCabinet'})
      },

      //修改机柜信息
      *modifyCabinet({ payload }, { call }) {
        yield call(modifyCabinet, payload);
        yield put({ type: 'reloadCabinet'})
      },

      //重新加载机柜数据
      *reloadCabinet(action, { put, select }) {
        const cabinet = yield select(state => state.gidc.cabinet );
        yield put({ type: 'queryCabinet', payload: { cabinet } });
      },



      //查询bays信息
      *queryBays({ payload }, { call }) {      
        const response =   yield call(queryBay, payload);
        if (response.code == 200) {
          yield put({
            type: 'querySave',
            payload: response || [],
          });
        } else {
          message.error(response.data);
        }
      },

      //添加bays信息
      *addBays({ payload }, { call }) {
        yield call(addBay, payload.field);
        yield put({ type: 'reloadBays'})
      },
  
      //删除bays信息
      *deleteBays({ payload }, { call }) {
        yield call(deleteBay, payload);
        yield put({ type: 'reloadBays'})
      },

      //修改bays信息
      *modifyBays({ payload }, { call }) {
        yield call(modifyBay, payload);
        yield put({ type: 'reloadBays'})
      },

      //从新加载bays信息
      *reloadBays(action, { put, select }) {
        const bays = yield select(state => state.gidc.bays );
        yield put({ type: 'queryBays', payload: { bays } });
      },

      //查询运营商信息
      *queryProvider({ payload }, { call,put }) {
        const response = yield call(queryProvider, payload) 
        if (response.code == 200) {
          yield put({
            type: 'providerSave',
            payload: response || [],
          });
        } else {
          message.error(response.data);
        }
      },

      //添加运营商信息
      *addProvider({ payload }, { call,put }) {
        yield call(addProvider, payload.description);
        yield put({ type: 'reloadProvider'})
      },
  
      //修改运营商信息
      *modifyProvider({ payload }, { call,put }) {
         yield call(modifyProvider, payload);
         yield put({ type: 'reloadProvider'})
      },

      //删除运营商信息
      *deleteProvider({ payload }, { call, put }) {
         yield call(deleteProvider, payload);
         yield put({ type: 'reloadProvider'})
      },

       //重新加载provider数据
    *reloadProvider(action, { put, select }) {
      const provider = yield select(state => state.gidc.provider );
      yield put({ type: 'queryProvider', payload: { provider } });
    },



     //查询IP资源池
     *queryIpResource({ payload }, { call,put }) {
      const response = yield call(queryIpResource, payload) 
      if (response.code == 200) {
        yield put({
          type: 'IpResourceSave',
          payload: response || [],
        });
      } else {
        message.error(response.data);
      }
    },

     //检查IP资源池
     *checkIpResource({ payload }, { call,put }) {
      const response = yield call(checkIpResource, payload) 
      if (response.code == 200) {
        yield put({
          type: 'IpResourceSave',
          payload: response,
        });
      } else {
        message.error(response.data);
      }
    },

    //添加ip资源池
    *addIpResource({ payload }, { call,put }) {
      yield call(addIpResource, payload.description);
      yield put({ type: 'reloadIpResource'})
    },

    //修改ip资源池
    *modifyIpResource({ payload }, { call,put }) {
       yield call(modifyIpResource, payload);
       yield put({ type: 'reloadIpResource'})
    },

    //删除ip资源池
    *deleteIpResource({ payload }, { call, put }) {
       yield call(deleteIpResource, payload);
       yield put({ type: 'reloadIpResource'})
    },


     //重新加载ip资源池
    *reloadIpResource(action, { put, select }) {
      const ipresource = yield select(state => state.gidc.ipresource );
      yield put({ type: 'queryProvider', payload: { ipresource } });
    },

  },

  reducers: {
    idcSave(state, action) {
      return {
        ...state,
        idc: action.payload,
      };
    },

    providerSave(state,action) {
      return {
        ...state,
        provider: action.payload
      }
    },

    cabinetSave(state,action) {
      return {
        ...state,
        provider: action.payload
      }
    },
    IpResourceSave(state,action) {
      return {
        ...state,
        ipresource: action.payload
      }
    },

  },
};
