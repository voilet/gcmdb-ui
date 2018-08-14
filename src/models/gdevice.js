import {
    queryHosts,queryHostsDetail,queryHostPassword,
    addHost,deleteHost,modifyHost,
    queryUser,queryOfflineHosts,
    modifyHostPassword,
    queryHostsByPid,
    searchOnlineHost,
    searchOfflineHost
    } from '../services/ResourceMangementAPI/Hardware/HardwareService'
  import {notification} from 'antd'
  
  const openNotificationWithIcon = (type,data) => {
    notification[type]({
      message: 'Notification Title',
      description: data,
    });
  };

  export default {
    namespace: 'gdevice',
  
    state: {
      //主机信息
      host: {
        data: [],
        pagination: {}
      },
      offlinehost: {
        data: [],
        pagination: {}
      },
      //主机详细信息
      hostdetail: {
        data: [],
        pagination: {}
      },
      //主机管理员
      user: {
        data:[]
      },
      //主机密码
      password:{
        data:[]
      },
      loading: false,
      panes:[],
      headlist:[],
      response: {
      }
    },
  
  
    effects: {
      //查询用户列表
      *queryUser({ payload }, { call, put }) {
        const response = yield call(queryUser, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'userSave',
            payload: response,
          });
          } else {
            openNotificationWithIcon('error',response.msg)
        }
      },
      //查询用户密码queryHostPassword
      *queryHostPassword({ payload }, { call, put }) {
        const response = yield call(queryHostPassword, payload) 
 
        if (response.status  == 200) {
          yield put({
            type: 'passwordSave',
            payload: response,
          });
          } else {
            openNotificationWithIcon('error',response.msg)
        }
      },

     //修改主机密码
      *modifyHostPassword({ payload }, { call, put }) {
        yield call(modifyHostPassword, payload) 
        yield put({ type: 'reloadHost'})
      },
      

      //查询主机基础信息
      *queryHost({ payload }, { call, put }) {
        const response = yield call(queryHosts, payload) 
    
        if (response.status  == 200) {
          yield put({
            type: 'hostinfo',
            payload: response,
          });
          } else {
            openNotificationWithIcon('error',response.msg)
        }
      },

      *queryHostsByPid({ payload }, { call, put }) {
        const response = yield call(queryHostsByPid, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'hostinfo',
            payload: response,
          });
          } else {
            openNotificationWithIcon('error',response.msg)
        }
      },
    

      //添加主机基础信息
      *addHost({ payload }, { call,put }) {
        const response = yield call(addHost, payload.description);
        yield put({
          type: 'saveResponse',
          payload: response,
        });
        yield put({ type: 'reloadHost'})
      },

  
      //修改主机基础信息
      *modifyHost({ payload }, { call,put }) {
        const response = yield call(modifyHost, payload.description,payload.id);
         yield put({
          type: 'saveResponse',
          payload: response,
          cb: payload.cb,
        });
         yield put({ type: 'reloadHost'})
        },

  
        //删除主机基础信息
      *deleteHost({ payload }, { call,put }) {
        const response = yield call(deleteHost, payload);
       
        yield put({
            type: 'saveResponse',
            payload: response,
          });
       //   yield put({ type: 'reloadHost'})
  
        },
  
      //重新加载主机基础信息
      *reloadHost(action, { put, select }) {
        const pagination = yield select(state => state.gdevice.host.pagination );
        const paginationStr = `?currentPage=${pagination.current}&pageSize=${pagination.pageSize}`
        yield put({ type: 'queryHost', payload: paginationStr} );
      },
  

      //查询已下线主机基础信息
      *queryOfflineHost({ payload }, { call, put }) {
        const response = yield call(queryOfflineHosts, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'offlinehost',
            payload: response,
          });
          } else {
            openNotificationWithIcon('error',response.msg)
        }
      },
      //搜索主机
      *searchOnlineHost({ payload }, { call, put }) {
        const response = yield call(searchOnlineHost, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'hostinfo',
            payload: response,
          });
          } else {
            openNotificationWithIcon('error',response.msg)
        }
      },

    //搜索线下主机
      *searchOfflineHost({ payload }, { call, put }) {
      const response = yield call(searchOfflineHost, payload) 
      if (response.status  == 200) {
        yield put({
          type: 'offlinehost',
          payload: response,
        });
        } else {
          openNotificationWithIcon('error',response.msg)
      }
    },
  

  
      //查询主机详细信息
      *queryHostDetail({ payload }, { call, put }) {
        const response = yield call(queryHostsDetail, payload.id) 
        if (response.status  == 200) {
          yield put({
            type: 'hardwareComponentsSave',
            payload: response,
            cb: payload.cb,
          });
          } else {
            openNotificationWithIcon('error',response.msg)
        }
      },

      *holdPanes({ payload }, { put }) {
        yield put({
          type: 'holdPanes',
          payload,
        });
      },
      
      *holdHeadlist({ payload }, { put }) {
        yield put({
          type: 'holdHeadlist',
          payload,
        });
      }
    },
    reducers: {
      
      hostinfo(state, action) {
        return {
          ...state,
          host: action.payload,
          time4Update: new Date(),
        };
      },
       
      offlinehost(state, action) {
        return {
          ...state,
          host: action.payload,
        };
      },

      hardwareComponentsSave(state, action){
        if (action.payload.data === null ) {
          action.payload.data = []
        }

        if(action.payload.data.hasOwnProperty('projectlists') && action.payload.data.projectlists === null) {
          action.payload.data.projectlists = []
        }

        action.cb && action.cb(action.payload.data)

        return {
          ...state,
          hostdetail: {
            ...action.payload,
            time4Update: new Date(),
          }
        };
      },
      userSave(state, action) {
        return {
          ...state,
          user: action.payload,
        };
      },
      passwordSave(state, action){
        return {
          ...state,
          password: action.payload,
        };
      },
      holdPanes(state, action){
        return {
          ...state,
          panes: action.payload,
        };
      },
      holdHeadlist(state, action){
        return {
          ...state,
          headlist: action.payload,
        };
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
          hostdetail: {
            ...state.hostdetail,
            data: [],
          }
        }
      }
    },
  };
  