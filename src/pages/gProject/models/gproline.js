// import { queryRule, removeRule, addRule, querHostList, querySearch, querIdc,
//   addIdc, queryUserList, querCaseList, querTree, queryProjectList, queryProjectGetId, createUser,addProject } from '../services/api';

import {
  querProjectLine,
  queryProject,
  querProjectGroup,
  modifyProjectGroup,
  deleteProjectGroup,
  addProject,
  addProjectItem, //添加项目的发布项
  addProjectLine,
  modifyProjectLine,
  deleteProjectLine,
  addProjectGroup,
  addProjectConfigVersion,
  
  editProjectTask,
  querProjectGroupbyId,
  querGroupbyLId,
  querProjectbyGId,
  querProjectConfigById,
  querProjectVersions,
  querProjectTasks,
  querProjectHosts,
  querProjectAllHosts,
  editProjectHosts,
  deleteProjectConfigVersion,

  addProjectTask,
  deleteProjectTask,
  modifyProjectTask,

  queryTree,
  modifyProject,
  deleteProject,
  searchProject,
  hostproModify,
  hostproDelete,
  updateprojectTree
} from '@/services/ProjectMangementAPI/Project/Project'

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
    //通过project id查询的配置
    proconfigbypid:[],
    //项目
    projectdata: {
      data: [],
      pagination: {},
    },
    //不同发布项的不同版本
    block_versions:{},
    //不同发布项的任务数据
    block_tasks:{},
    //不同发布项的主机数据（属于发布项的主机）
    block_hosts:{},
    //项目的所有主机
    block_all_hosts:{}

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
      console.log("payload",payload)
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
    //通过projectId项目id查询所有的配置列表
    *getConfigListById({ payload }, { call, put }){
      const response = yield call( querProjectConfigById, payload.ID );
      yield put({
        type:'progroupbyPidSave',
        payload:response.data || [],
        callback:payload.callback || function(){}
      })
    },
    *clearConfigList({}, {put}){
      yield put({
        type:'progroupbyPidClear'
      })
    },

    *getVersionsById( { payload }, {call, put }){
      const response = yield call( querProjectVersions, payload.ID );
      yield put({
        type:'proConfigVersion',
        payload:response.data || [],
        id:payload.ID,
        callback:payload.callback||function(){}
      })
    },
    *addProjectTask( { payload }, { call, put }){
      const response = yield call( addProjectTask, payload );
      if( response.status != 200 ){
        openNotificationWithIcon('error',response.msg)
      }else{
        yield put({ type: 'addBlockTasks', payload:response.data, ProId: payload.ProId } )
        payload.callback && payload.callback( response );
      }
    },
    *modifyProjectTask( { payload }, { call, put }){
      console.log("modifyProjectTask", payload)
      const response = yield call( modifyProjectTask, payload );

      if( response.status != 200 ){
        openNotificationWithIcon('error',response.msg)
      }else{
        yield put({ type: 'modifyBlockTasks', payload:response.data, ID:payload.ID, ProId: payload.ProId } )
        payload.callback && payload.callback( response );
      }
    },
    *deleteProjectTask( { payload }, { call, put }){
      const response = yield call( deleteProjectTask, payload );
      if( response.status != 200 ){
        openNotificationWithIcon('error',response.msg)
      }else{
        yield put({ type: 'deleteBlockTasks', payload:payload, ID:payload.ID,  ProId: payload.ProId } )
        payload.callback && payload.callback( response );
      }
    },
    *deleteVersionById( { payload }, { call, put }){
      const response = yield call( deleteProjectConfigVersion, payload );
      yield put({
        type:'getVersionsById',
        payload:{ ID: payload.ProId }
      })
    },
    //通过项目id查任务
    *getTasksById( { payload }, { call, put } ){
      const response = yield call( querProjectTasks, payload );
      if( !response || response.status != 200 ){
        openNotificationWithIcon('error',response ? response.msg : "查询任务接口异常")
      }else{
        yield put({
          type:'saveBlockTasks',
          payload:response.data || [],
          id:payload.ID,
          callback:payload.callback
        })
      }
      
    },
    //通过项目id查任务
    *getHostsById( { payload }, { call, put } ){
      const response = yield call( querProjectHosts, payload );
      if( !response || response.status != 200 ){
        openNotificationWithIcon('error',response ? response.msg : "查询主机接口异常")
      }else{
        yield put({
          type:'saveBlockHosts',
          payload:response.data || [],
          id:payload.ID,
          callback:payload.callback
        })
      }
      
    },
    *getAllHostsByProId( { payload }, { call, put }){
      const response = yield call( querProjectAllHosts, payload );
      if( !response || response.status != 200 ){
        openNotificationWithIcon('error',response ? response.msg : "查询主机接口异常")
      }else{
        yield put({
          type:'saveBlockAllHosts',
          payload:response.data || {},
          id:payload.ProId,
          callback:payload.callback
        })
      }
    },
    /* 更新主机(发布项主机和项目组主机)*/
    *updateAllHostsByProId( { payload }, { call, put }){
      const response = yield call( editProjectHosts, payload );
      yield put({
        type:'saveBlockAllHosts',
        payload:payload.data||{},
        id:payload.ProId,
        callback:payload.callback
      })
    },
    //添加项目
    *addProject({ payload }, { call, put }) {
      yield call(addProject, payload.description);
      yield put({ type: 'reloadProject' })
    },
    //添加项目列表(给项目添加发布项)
    *addProjectItem({ payload }, { call, put }) {
      const response = yield call( addProjectItem, payload );
      if( response.status != 200 ){
        openNotificationWithIcon('error',response.msg)
      }else{
        yield put({ type: 'getConfigListById', payload:payload } )
      }
      
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
    //添加配置的版本
    *addConfigVersion( { payload }, {call, put }){
      const response = yield call( addProjectConfigVersion, payload );
      if( response && response.status == "200"){
        yield put({
          type:'saveProConfigVersion',
          payload:response.data||[],
          callback:payload.callback || function(){}
        })
      }else{
        message.error( response.msg );
      }
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

      // 查询项目发布状态
      *queryProjectState({ payload }, { call, put }){

      }
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
    progroupbyPidClear( state, action ){
      return {
        ...state,
        proconfigbypid: []
      };
    },
    progroupbyPidSave(state, action) {
      action.callback && action.callback( action.payload );
      return {
        ...state,
        proconfigbypid: action.payload
      };
    },
    proConfigVersion( state, action ){
      action.callback && action.callback(action.payload);
      var blocks = { ...state.block_versions};
      blocks[ action.id ] = action.payload || [];
      return {
        ...state,
        block_versions:blocks
      }
    },
    saveProConfigVersion( state, action ){
      action.callback && action.callback(action.payload);
      var blocks = { ...state.block_versions};
      blocks[ action.id ] = action.payload || [];
      return {
        ...state,
        block_versions:blocks
      }
    },
    //保存碎片的任务列表
    saveBlockTasks( state, action ){
      action.callback && action.callback( action.payload );
      var blocks = { ...state.block_tasks };
      console.log("saveBlockTasks", action);
      blocks[ action.id ] = action.payload || [];
      return {
        ...state, 
        block_tasks:blocks
      }
    },
    modifyBlockTasks( state, action ){
      let { payload, ProId, ID } = action;
      let blocks = state.block_tasks || {};
      if( ! ProId ){ return state }
      let arr = blocks[ ProId ] || [];
      for(var i=0;i<arr.length;i++){
        if( arr[i].ID == ID ){
          arr[i] = payload;
        }
      }
      return {
        ...state, block_tasks:blocks
      }
    },
    addBlockTasks( state, action ){
      let { payload, ProId } = action;
      let blocks = state.block_tasks || {};
      if( ! ProId ){ return state }
      let arr = blocks[ ProId ] || [];
      arr.push( payload )
      return {
        ...state, block_tasks:blocks
      }
    },
    deleteBlockTasks( state, action ){
      let { payload, ProId, ID } = action;
      let blocks = state.block_tasks || {};
      if( ! ProId ){ return state }
      let arr = blocks[ ProId ] || [];
      arr = arr.filter( (value=>{
        return value.ID != ID
      }))
      return {
        ...state, block_tasks:blocks
      }
    },
    //保存碎片的主机列表
    saveBlockHosts( state, action ){
      action.callback && action.callback( action.payload );
      var blocks = { ...state.block_hosts };
      blocks[ action.id ] = action.payload || [];
      return {
        ...state, 
        block_hosts:blocks
      }
    },

    saveBlockAllHosts( state, action ){
      action.callback && action.callback( action.payload );
      var blocks = { ...state.block_all_hosts };
      //action.id 为项目id，不同项目存储不同的主机数据
      blocks[ action.id ] = action.payload || [];
      return {
        ...state, 
        block_all_hosts:blocks
      }
    },    
    saveTree(state, action) {
      return {
        ...state,
        treedata: action.payload,
      };
    },

  },
};
