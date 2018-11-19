// import { queryRule, removeRule, addRule, querHostList, querySearch, querIdc,
//   addIdc, queryUserList, querCaseList, querTree, queryProjectList, queryProjectGetId, createUser,addProject } from '../services/api';

import {
    queryTree,
    updateprojectTree,
    queryHostbyPid,
    queryAutoReleaseHostbyPid,
    queryAllTree
  } from '@/services/ProjectMangementAPI/Appmanage/Appmanage'

import {

} from "@/services/ProjectMangementAPI/Project/Project"

  import { message } from 'antd'
  
  export default {
    namespace: 'gappmanage',
  
    state: {
      //树节点数据
      treedata: {
        data: []
      },
      test:"abc",
        //所有主机列表
      hostdata:{
        data:[]
      },
        //能够支持自动化发布的服务器列表
      autohostdata:{
        data:[]
      },
        //项目参数
      versions:{
        data:[]
      }
    },
  
  
    effects: {  
      //通过pro id 获取项目组列表
      *getHostdatabyId({ payload }, { call, put }) {
          
        console.log("getHostDatabyId", payload)
        const response = yield call(queryHostbyPid, payload)
        yield put({
          type: 'probyidSave',
          payload: response,
          cb: payload.cb,
        });
      },

        //通过pro id 获取项目组列表
        *aaa({ payload }, { call, put }) {
            console.log("@@@@@@@@@@@@@@@@aaaa is called")
        },

        //通过pro id 获取项目组列表
        *getAutoHostdatabyId({ payload }, { call, put }) {
          const response = yield call(queryAutoReleaseHostbyPid, payload)
          yield put({
              type: 'projectReleaseHostUpdate',
              payload: response,
              cb: payload.cb,
          });
        },

      //获取树节点
      *getTree({ payload }, { call, put }) {
        console.log("**** getTree")
        const response = yield call(queryTree, payload);
        if (response.status == 200) {
          yield put({
            type: 'saveTree',
            payload: response,
            callback: payload.callback,
          });
        }
      },
  
       //获取所有树节点
       *getAllTree({ payload }, { call, put }) {
        const response = yield call(queryAllTree, payload);
        if (response.status == 200) {
          yield put({
            type: 'probyidSave',
            payload: response,
            cb: payload.cb,
          });
        }
      },

      //更新树
      *updateTree({ payload }, { call, put }) {
        yield call(updateprojectTree, payload);
        yield put({ type: 'getTree' })
      },

        *getVersion({ payload }, {call, put }) {
          yield call( queryProjectVersions, payload );
          yield put({ type:'getProjectVersion'})
        }
    },

    
  
    reducers: {  
    probyidSave(state, action) {
           console.log("probyidSave", state,action)
      if (action.payload.data === null ) {
        action.payload.data = []
      }

      action.cb && action.cb(action.payload.data)
      


      return {
          ...state,
          hostdata: action.payload
      };
      },
      
      saveTree(state, action) {
         
      if (action.payload.data === null ) {
        action.payload.data = []
      }
      
      action.callback && action.callback(action.payload.data)

      return {
        ...state,
        treedata: action.payload,
      }
      },

      projectReleaseHostUpdate( state, action ){
      console.log("~~~~~~~~~~~~~", arguments)
        if( !action.payload.data ){
          action.payload.data = [];
        }
        return {
            ...state,
            hostdata:{}
        }

      }

    },
  };
  