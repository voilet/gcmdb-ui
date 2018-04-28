// import { queryRule, removeRule, addRule, querHostList, querySearch, querIdc,
//   addIdc, queryUserList, querCaseList, querTree, queryProjectList, queryProjectGetId, createUser,addProject } from '../services/api';

import {queryProjectList,querProjectGroup,queryRule} from '../services/api'

export default {
  namespace: 'rule',

  state: {
    //数据
    data: {
      list: [],
      pagination: {},
    },
    //树节点数据
    treedata: {
      data: []
    },
    //查询产品线
    prolinedata: [],
    
    //查询项目组
    progroupdata: []
  },


  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    



    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    projectSave(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    progroupSave(state, action) {
      return {
        ...state,
        data: action.payload,
        progroupdata: action.payload
      };
    },
    
    projectlineSave(state, action) {
      return {
        ...state,
        data: action.payload,
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
