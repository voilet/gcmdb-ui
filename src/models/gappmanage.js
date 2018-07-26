// import { queryRule, removeRule, addRule, querHostList, querySearch, querIdc,
//   addIdc, queryUserList, querCaseList, querTree, queryProjectList, queryProjectGetId, createUser,addProject } from '../services/api';

import {
    queryTree,
    updateprojectTree,
    queryHostbyPid,
    queryAllTree
  } from '../services/ProjectMangementAPI/Appmanage/Appmanage'
  
  import { message } from 'antd'
  
  export default {
    namespace: 'gappmanage',
  
    state: {
      //树节点数据
      treedata: {
        data: []
      },
    
      hostdata:{
        data:[]
      }
     
    },
  
  
    effects: {  
      //通过pro id 获取项目组列表
      *getHostdatabyId({ payload }, { call, put }) {
          

        const response = yield call(queryHostbyPid, payload)
        yield put({
          type: 'probyidSave',
          payload: response,
        });
      },
  

      //获取树节点
      *getTree({ payload }, { call, put }) {
        const response = yield call(queryTree, payload);
        if (response.status == 200) {
          yield put({
            type: 'saveTree',
            payload: response,
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
          });
        }
      },

      //更新树
      *updateTree({ payload }, { call, put }) {
        yield call(updateprojectTree, payload);
        yield put({ type: 'getTree' })
      },
  
    },
  
    reducers: {  
        probyidSave(state, action) {
        return {
            ...state,
            hostdata: action.payload
        };
        },
      saveTree(state, action) {
        return {
          ...state,
          treedata: action.payload,
        };
      },
  
    },
  };
  