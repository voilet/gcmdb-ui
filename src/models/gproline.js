// import { queryRule, removeRule, addRule, querHostList, querySearch, querIdc,
//   addIdc, queryUserList, querCaseList, querTree, queryProjectList, queryProjectGetId, createUser,addProject } from '../services/api';

import {querProjectLine,queryProject,querProjectGroup,queryRule,addProject,addProjectLine,addProjectGroup,querProjectGroupbyId} from '../services/ProjectMangementAPI/Project/Project'

import {message} from 'antd'

export default {
  namespace: 'gproline',

  state: {
    //数据
    // data: {
    //   list: [],
    //   pagination: {},
    // },
    //树节点数据
    treedata: {
      data: []
    },
    //查询产品线
    prolinedata: [],
    
    //查询项目组
    progroupdata: [],
    
    //查询特定项目组
    progroupdatabyid: [],

    //查询项目
    projectdata: {
      data: [],
      pagination: {},
    },
  },


  effects: {

    // 获取项目列表
    *getProjectList({ payload }, { call, put }) {
      const response = yield call(queryProject, payload) 
  //    console.log('response------------------------------',response)
      yield put({
        type: 'projectSave',
        payload: response || [],
      });
    
    },

    //添加项目列表
    *addProject({ payload }, { call }) {
    
      yield call(addProject, payload.description);
      message.success('提交成功');
    },

  //通过id 获取项目组列表
  *getProjectGroupbyId({ payload }, { call,put }) {
    const response = yield call(querProjectGroupbyId,payload.description)
    yield put({
      type: 'progroupbyIdSave',
      payload: response.data || [],
    });
  },

    //获取项目组列表
    *getProjectGroup({ payload }, { call, put }) {  
      const response = yield call(querProjectGroup, payload);
    
      yield put({
        type: 'progroupSave',
        payload: response.data || [],
      });
  
    },

     
   //添加项目组列表
   *addProjectgroup({ payload }, { call }) {
    yield call(addProjectGroup, payload.description);
    message.success('提交成功');
   },


   
    //添加产品线列表
    *addProjectLine({ payload }, { call }) {
    const response = yield call(addProjectLine, payload.description);
      message.success('提交成功');
    },


    //获取产品线列表
    *getProjectLine({ payload }, { call, put }) {  
      const response = yield call(querProjectLine);
      console.log('getProjectLine',response)
      yield put({
        type: 'projectlineSave',
        payload: response.data || [],
      });
    
    },
    
    //获取树节点
    *getTree({ payload }, { call, put }) {
      const response = yield call(querTree, payload);
      yield put({
        type: 'saveTree',
        payload: response,
      });
    },
  },

  reducers: {
    projectSave(state, action) {
      return {
        ...state,
        projectdata: action.payload,
      };
    },

    progroupbyIdSave(state, action) {
      return {
        ...state,
        progroupdatabyid: action.payload 
      };
    },

    progroupSave(state, action) {
      return {
        ...state,
        progroupdata: action.payload 
      };
    },
    
    projectlineSave(state, action) {
      return {
        ...state,
        prolinedata: action.payload 
      };
    },

    saveTree(state, action) {
      return {
        ...state,
        project: action.payload,
      };
    },
  },
};
