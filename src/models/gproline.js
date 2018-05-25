// import { queryRule, removeRule, addRule, querHostList, querySearch, querIdc,
//   addIdc, queryUserList, querCaseList, querTree, queryProjectList, queryProjectGetId, createUser,addProject } from '../services/api';

import {  querProjectLine,
          queryProject,
          querProjectGroup, 
          queryRule,
          addProject,
          addProjectLine,
          addProjectGroup,
          querProjectGroupbyId,
          querGroupbyLId,
          querProjectbyGId,
          queryTree,
          modifyProject,
          deleteProject
        } from '../services/ProjectMangementAPI/Project/Project'

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
    
    //通过line id查询特定项目组
    progroupbylid: [],

    //通过groud id查询特定项目
    probygid: [],

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
     // console.log('response------------------------------',payload)
      yield put({
        type: 'projectSave',
        payload: response,
      });
    
    },

    //通过line id 获取项目组列表
    *getProjectGroupbyId({ payload }, { call,put }) {
      const response = yield call(querGroupbyLId,payload)
      yield put({
        type: 'progroupbyLidSave',
        payload: response.data || [],
      });
    },

  //通过group id 获取项目列表
  *getProjectbyId({ payload }, { call,put }) {
    const response = yield call(querProjectbyGId,payload)
    yield put({
      type: 'progroupbyGidSave',
      payload: response.data || [],
    });
  },


    //添加项目列表
    *addProject({ payload }, { call, put}) {
      yield call(addProject, payload.description);
      yield put({ type: 'reloadProject'})
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
      yield put({
        type: 'projectlineSave',
        payload: response.data,
      });
    
    },
    //删除产品列表
    *deleteProject({ payload }, { call, put }) {
      yield call(deleteProject, payload);
      yield put({ type: 'reloadProject'})
    },
    //重新加载列表
    *reloadProject(action, { put, select }) {
     // const idc = yield select(state => state.gidc.idc );
      yield put({ type: 'getProjectList', payload: { } });
    },
    //编辑产品列表
    *modifyProject({ payload }, { call, put }) {
      yield call(modifyProject, payload);
      yield put({ type: 'reloadProject'})
    },
    //获取树节点
    *getTree({ payload }, { call, put }) {
      const response = yield call(queryTree, payload);
      if (response.status  == 200) {
        yield put({
          type: 'saveTree',
          payload: response,
        });
      }
    },
    
  },

  reducers: {
    projectSave(state, action) {
      return {
        ...state,
        projectdata: action.payload,
      };
    },

    progroupbyLidSave(state, action) {
      return {
        ...state,
        progroupbylid: action.payload 
      };
    },

    progroupbyGidSave(state, action) {
      return {
        ...state,
        probygid: action.payload 
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
        treedata: action.payload,
      };
    },
    
  },
};
