import {
    queryHosts,queryHostsDetail,queryHostPassword,
    addHost,deleteHost,modifyHost,
    queryUser,
    } from '../services/ResourceMangementAPI/Hardware/HardwareService'
  import {message} from 'antd'
  
  
  export default {
    namespace: 'gdevice',
  
    state: {
      //主机信息
      host: {
        data: [],
        pagination: {}
      },
      //主机详细信息
      hostdetail: {
        data: {},
        pagination: {}
      },
      //主机管理员
      user: {
        data:[]
      },
      //主机密码
      password:{},
      loading: false
    },
  
  
    effects: {
      //查询用户列表
      *queryUser({ payload }, { call, put }) {
        const response = yield call(queryUser, payload) 
        if (response.code == 200) {
          yield put({
            type: 'userSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
      //查询用户密码queryHostPassword
      *queryHostPassword({ payload }, { call, put }) {
        const response = yield call(queryHostPassword, payload) 
        if (response.code == 200) {
          yield put({
            type: 'passwordSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
      //查询主机基础信息
      *queryHost({ payload }, { call, put }) {
        const response = yield call(queryHosts, payload) 
        if (response.code == 200) {
          yield put({
            type: 'hostinfo',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
  
      //添加主机基础信息
      *addHost({ payload }, { call,put }) {
        yield call(addHost, payload.description);
        yield put({ type: 'reloadHost'})
      },
  
      //修改主机基础信息
      *modifyHost({ payload }, { call,put }) {
         yield call(modifyHost, payload);
         yield put({ type: 'reloadHost'})
        },
  
        //删除主机基础信息
      *deleteHost({ payload }, { call,put }) {
           yield call(deleteHost, payload);
           yield put({ type: 'reloadHost'})
  
        },
  
      //重新加载主机基础信息
      *reloadHost(action, { put, select }) {
        const pagination = yield select(state => state.gdevice.host.pagination );
        const paginationStr = `?currentPage=${pagination.current}&pageSize=${pagination.pageSize}`
        yield put({ type: 'queryHost', payload: paginationStr} );
      },
  
  
      //查询主机详细信息
      *queryHostDetail({ payload }, { call, put }) {
        const response = yield call(queryHostsDetail, payload) 
        if (response.code == 200) {
          yield put({
            type: 'hardwareComponentsSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
    },
    reducers: {
      
      hostinfo(state, action) {
        return {
          ...state,
          host: action.payload,
        };
      },
      hardwareComponentsSave(state, action){
        return {
          ...state,
          hostdetail: action.payload,
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
      }
    },
  };
  