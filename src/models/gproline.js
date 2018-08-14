// import { queryRule, removeRule, addRule, querHostList, querySearch, querIdc,
//   addIdc, queryUserList, querCaseList, querTree, queryProjectList, queryProjectGetId, createUser,addProject } from '../services/api';

import {
  querProjectLine,
  queryProject,
  querProjectGroup,
  modifyProjectGroup,
  deleteProjectGroup,
  addProject,
  addProjectLine,
  modifyProjectLine,
  deleteProjectLine,
  addProjectGroup,
  querProjectGroupbyId,
  querGroupbyLId,
  querProjectbyGId,
  queryTree,
  modifyProject,
  deleteProject,
  searchProject,
  hostproModify,
  hostproDelete,
  updateprojectTree
} from '../services/ProjectMangementAPI/Project/Project'

import {notification} from 'antd'



const openNotificationWithIcon = (type,data) => {
  notification[type]({
    message: 'Message: ',
    description: data,
  });
};

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
    prolinedata: {
      data: [],
      pagination: {},
    },

    //查询项目组
    progroupdata: {
      data: [],
      pagination: {},
    },

    //通过line id查询特定项目组
    progroupbylid: [],

    //通过groud id查询特定项目
    probygid: [],

    //项目
    projectdata: {
      data: [],
      pagination: {},
    },

  },


  effects: {
    //搜索项目列表
    *SearchProjectList({ payload }, { call, put }) {
      const response = yield call(searchProject, payload)
      yield put({
        type: 'projectSearch',
        payload: response.data,
      });

    },

    // 获取项目列表
    *getProjectList({ payload }, { call, put }) {
      const response = yield call(queryProject, payload)
      yield put({
        type: 'projectSave',
        payload: response,
      });

    },

    //通过line id 获取项目组列表
    *getProjectGroupbyId({ payload }, { call, put }) {
      const response = yield call(querGroupbyLId, payload)
    
      yield put({
        type: 'progroupbyLidSave',
        payload: response.data || [],
      });
    },

    //通过group id 获取项目列表
    *getProjectbyId({ payload }, { call, put }) {
      const response = yield call(querProjectbyGId, payload)
      yield put({
        type: 'progroupbyGidSave',
        payload: response.data || [],
      });
    },


    //添加项目列表
    *addProject({ payload }, { call, put }) {
      yield call(addProject, payload.description);
      yield put({ type: 'reloadProject' })
    },

     //删除产品列表
     *deleteProject({ payload }, { call, put }) {
       

      const response = yield call(deleteProject, payload);
      if (response.status != 200 ) {
        openNotificationWithIcon('error',response.msg)
      }
      yield put({ type: 'reloadProject' })
    },

    //重新加载列表
    *reloadProject(action, { put, select }) {
      // const idc = yield select(state => state.gidc.idc );
      yield put({ type: 'getProjectList', payload: {} });
    },

    //编辑产品列表
    *modifyProject({ payload }, { call, put }) {
      yield call(modifyProject, payload);
      yield put({ type: 'reloadProject' })
    },


     //编辑主机项目关系
     *hostproModify({ payload }, { call, put }) {
      yield call(hostproModify,  payload.description,payload.id);
      yield put({ type: 'reloadProject' })
    },

    //解除主机项目关系
    *hostproDelete({ payload }, { call, put }) {
      yield call(hostproDelete,  payload.description,payload.id);
      yield put({ type: 'reloadProject' })
    },

    //获取项目组列表
    *getProjectGroup({ payload }, { put,call }) {
      const response = yield call(querProjectGroup, payload);
      yield put({
        type: 'proGroupSave',
        payload: response || [],
      });

    },

  //添加项目组列表
  *addProjectgroup({ payload }, { put,call }) {
    
    const response = yield call(addProjectGroup, payload.description);
    
    if (response.status == "200") {
      openNotificationWithIcon('success',response.msg)
    }
    yield put({ type: 'reloadProjectGroup' })
  },

  //编辑项目组列表
  *modifyProjectgroup({ payload }, { call, put }) {
    yield call(modifyProjectGroup, payload);
    yield put({ type: 'reloadProjectGroup' })
  },

  //删除项目组列表
  *deleteProjectgroup({ payload }, { call, put }) {
    const response = yield call(deleteProjectGroup, payload);
    if (response.status != 200)
    {
      openNotificationWithIcon('error',response.msg)
    } 

    yield put({ type: 'reloadProjectGroup' })
    
  },

  //重新加载产品线
  *reloadProjectGroup(action, { put, select }) {
    yield put({ type: 'getProjectGroup', payload: {} });
  },


    //添加产品线列表
    *addProjectLine({ payload }, {put,call }) {
      //const response = yield call(addProjectLine, payload.description);
      // if (response.status == "200") {
      //   message.success('提交成功');
      // }
      yield call(addProjectLine, payload.description);
      yield put({ type: 'reloadProjectLine' })
    },


    //获取产品线列表
    *getProjectLine({ payload }, { call, put }) {
      const response = yield call(querProjectLine);
      yield put({
        type: 'proLineSave',
        payload: response,
      });

    },

     //编辑产品线列表
     *modifyProjectLine({ payload }, { call, put }) {
      yield call(modifyProjectLine, payload);
      yield put({ type: 'reloadProjectLine' })
    },

    //删除产品线列表
    *deleteProjectLine({ payload }, { call, put }) {
    const response = yield call(deleteProjectLine, payload);
    if (response &&response.status == "500")
    {
      message.error(response.msg);
    } 

    yield put({ type: 'reloadProjectLine' })
    },

    //重新加载产品线
    *reloadProjectLine(action, { put, select }) {
      yield put({ type: 'getProjectLine', payload: {} });
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

    //更新树
    *updateTree({ payload }, { call, put }) {
      yield call(updateprojectTree, payload);
      yield put({ type: 'getTree' })
    },

  },

  reducers: {
    projectSearch(state, action) {
      //查询项目

      //console.log("action.payload.ProjectLines",action.payload.ProjectLines)
      //console.log("action.payload.ProjectLines !== null",action.payload.ProjectLines != null)
      let result = { ...state }
      //debugger
     
      if (action.payload.ProjectLines) {
        result.prolinedata = {
          ...result.prolinedata,
          data: action.payload.ProjectLines,
          pagination: action.payload.ProjectLinePagination,
        }
      } else if (action.payload.ProjectGroups) {

        result.progroupdata = {
          ...result.progroupdata,
          data: action.payload.ProjectGroups,
          pagination: action.payload.ProjectGroupPagination,
        }
      } else if (action.payload.ProjectLists) {
        //result.prodata.data  = []

        result.projectdata = {
          ...result.projectdata,
          data: action.payload.ProjectLists,
          pagination: action.payload.ProjectPagination,
        }

      } else {
        result = {
          ...result,
          //查询产品线
          prolinedata: {
            data: [],
            pagination: {},
          },
      
          //查询项目组
          progroupdata: {
            data: [],
            pagination: {},
          },
          projectdata: {
            data: [],
            pagination: {},
          },
        }
      }

     
      return result
    },

    projectSave(state, action) {
      
      return {
        ...state,
        projectdata: action.payload,
      };
    },

    proLineSave(state, action) {
      if (action.payload.data === null) {
        action.payload.data = []
      }
      
      return {
        ...state,
        prolinedata: action.payload,
      };
    },

    proGroupSave(state, action) {
      return {
        ...state,
        progroupdata: action.payload,
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

    saveTree(state, action) {
      return {
        ...state,
        treedata: action.payload,
      };
    },

  },
};
