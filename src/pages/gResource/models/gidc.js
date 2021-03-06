import {
  queryIDC,addIDC,deleteIDC,modifyIDC,queryIdcRelation,queryIdcUser,
  addProvider,queryProvider,modifyProvider,deleteProvider,
  queryCabinet,addCabinet,deleteCabinet,modifyCabinet,
  deleteBay,queryBay,addBay,modifyBay,
  queryIpResource,addIpResource,modifyIpResource,deleteIpResource,checkIpResource,queryIpClassify,searchIpResourceAPI,
  queryCabinetDetail,queryAllIDC
  } from '@/services/ResourceMangementAPI/Idc/IdcService'
import {notification} from 'antd'



const openNotificationWithIcon = (type,data) => {
  notification[type]({
    message: 'Notification Title',
    description: data,
  });
};

export default {
  namespace: 'gidc',

  state: {
    //关系数据
    relation: {
      data:[],
    },
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
    //机柜详情
    cabinetdetail: {
      data: [],
      pagination: {}
    },
    //机架
    bays: {
      data: [],
      pagination: {}
    },
    ipresource:{
      data:{
        ipresourcelist: [],
        iptype:[],
        ippurpose:[]
      },
      pagination: {}
    },
    ipcheck: {
      data:[]
    },

    ipclassify:{
      data:{
        iptype:[],
        ippurpose: []
      }
    },
    response: {
    },
    loading: false

  },


  effects: {
      //获取user
      *queryUser(_, { call, put }) {
        const response = yield call(queryIdcUser);
        yield put({
          type: 'saveUser',
          payload: response,
        });
      },
    

    //分页获取机房列表
    *queryIDC({ payload }, { call, put }) {
      const response = yield call(queryIDC, payload) 
      if (response.status  == 200) {
        yield put({
          type: 'idcSave',
          payload: response,
        });
        } else {
          openNotificationWithIcon('error',response.msg)
      }
    },

     //获取所有机房列表
     *queryAllIDC({ payload }, { call, put }) {
      const response = yield call(queryAllIDC, payload) 
      if (response.status  == 200) {
        yield put({
          type: 'idcSave',
          payload: response,
          cb: payload.cb   
        });
        } else {
          openNotificationWithIcon('error',response.msg)
      }
    },


    


    //查询机柜 && 机架 && 机房
    *queryIdcRelation({ payload }, { call, put }) {
      const response = yield call(queryIdcRelation, payload)
      const payloadObj=payload.substring(payload.indexOf('?') + 1).split('&').map((item) => item.split('=')).reduce((params, pairs) => (params[pairs[0]] = pairs[1] || '', params), {})
      let stateName = ""
      switch(payloadObj.tag)
      {
        case "idc":
        stateName = 'idcSave';
        break;
        case 'cabinet':
        stateName = 'cabinetSave';
        break;
        case 'bays':
        stateName = 'querySave';
        break;
      }
      if (response.status  == 200) {
        yield put({
          type: stateName,
          payload: response,
        });
        } else {
          openNotificationWithIcon('error',response.msg)
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
    *queryCabinet({ payload }, { call , put}) {
        const response =   yield call(queryCabinet, payload);
 
        if (response.status  == 200) {
          yield put({
            type: 'cabinetSave',
            payload: response || [],
          });
        } else {
          openNotificationWithIcon('error',response.msg)
        }
      },

      *queryCabinetDetail({ payload }, { call , put}) {
        const response =   yield call(queryCabinetDetail, payload);
 
        if (response.status  == 200) {
          yield put({
            type: 'cabinetdetailSave',
            payload: response || [],
          });
        } else {
          openNotificationWithIcon('error',response.msg)
        }
      },

      

      //添加机柜信息
      *addCabinet({ payload }, { call, put }) {
        const response = yield call(addCabinet, payload);
        yield put({
          type: 'saveResponse',
          payload: response,
          cb: payload.cb,
        });
        yield put({ type: 'reloadCabinet'})
      },
  
      //删除机柜信息
      *deleteCabinet({ payload }, { call, put }) {
        const  response = yield call(deleteCabinet, payload);
        if (response.status  == 200) {
          openNotificationWithIcon('success',"删除成功.")
        } else {
          openNotificationWithIcon('error',response.msg)
        }
        yield put({ type: 'reloadCabinet'})
      },

      //修改机柜信息
      *modifyCabinet({ payload }, { call, put }) {
        yield call(modifyCabinet, payload.ID,payload.description);
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
        if (response.status  == 200) {
          yield put({
            type: 'querySave',
            payload: response || [],
          });
        } else {
          openNotificationWithIcon('error',response.msg)
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
        if (response.status  == 200) {
          yield put({
            type: 'providerSave',
            payload: response || [],
          });
        } else {
          openNotificationWithIcon('error',response.msg)
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
      if (response.status  == 200) {
        yield put({
          type: 'IpResourceSave',
          payload: response || [],
        });
      } else {
        openNotificationWithIcon('error',response.msg)
      }
    },


    //搜索IP资源池
    *searchIpResource({ payload }, { call,put }) {
      
      const response = yield call(searchIpResourceAPI, payload) 
      if (response.status  == 200) {
        yield put({
          type: 'IpResourceSave',
          payload: response || [],
        });
      } else {
        openNotificationWithIcon('error',response.msg)
      }
    },

     //查询IP资源池
     *queryIpClassify({ payload }, { call,put }) {
      const response = yield call(queryIpClassify, payload) 
   
      if (response.status  == 200) {
        yield put({
          type: 'ipClassify',
          payload: response || [],
        });
      } else {
        openNotificationWithIcon('error',response.msg)
      }
    },

     //检查IP资源池
     *checkIpResource({ payload }, { call,put }) {
      const response = yield call(checkIpResource, payload) 
      if (response.status  == 200) {
        yield put({
          type: 'ipCheck',
          payload: response,

        });
      } else {
        openNotificationWithIcon('error',response.msg)
      }
    },

    //添加ip资源池
    *addIpResource({ payload }, { call,put }) {
      yield call(addIpResource, payload);
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
      yield put({ type: 'queryIpResource', payload: { ipresource } });
    },

  },

  reducers: {
    saveUser(state, action) {
      return {
        ...state,
         user: action.payload,
      };
    },
    relationSave(state, action) {
      return {
        ...state,
         relation: action.payload,
      };
    },

    idcSave(state, action){ 



      if (action.payload.data === null ) {
        action.payload.data = []
      } else {
        action.payload.data = action.payload.data.map((obj) =>{
            if (obj.cabinets && obj.cabinets === null ) {
                obj.cabinets = []
            }
            return obj 
        })
      }


      action.cb && action.cb(action.payload)
      
      return {
        ...state,
        idc: action.payload,
      }

    },

    providerSave(state,action) {
      return {
        ...state,
        provider: action.payload
      }
    },

    cabinetSave(state,action) {
      if (action.payload.data === null ) {
        action.payload.data = []
      }
      return {
        ...state,
        cabinet: action.payload
      }
    },

    cabinetdetailSave(state,action) {
    
      
      if (action.payload.data === null ) {
        action.payload.data = []
      }
      if (action.payload.data !== null && action.payload.data.bay_details === null) {
        action.payload.data.bay_details = []
      }

      return {
        ...state,
        cabinetdetail: {
          ...action.payload.data,
          time4Update: new Date()
        }
      }
    },

    querySave(state,action) {
      if (action.payload.data === null ) {
        action.payload.data = []
      }
      return {
        ...state,
        bays: action.payload
      }
    },
    IpResourceSave(state,action) {
      return {
        ...state,
        ipresource: action.payload
      }
    },
    ipClassify(state,action) {
      return {
        ...state,
        ipclassify: action.payload
      }
    },
    ipCheck(state,action) {
      return {
        ...state,
        ipcheck: action.payload
      }
    },

    saveResponse(state, action){
      action.cb && action.cb(action.payload)
      return {
        ...state,
        response: action.payload,
      };
    },

    empty(state, action){
      return  {
        ...state,
        cabinet: {
        //  ...state.cabinet,
          data: [],
        },
        bays: {
        //  ...state.bays,
          data: [],
        },
        cabinetdetail: {
          data:[]
        },
        idc: {
          data: [],
          pagination: {}
        },
      }
    }
  },
};
