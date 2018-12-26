import {
  querProjectList
} from '@/services/ProjectMangementAPI/Project/Project'

import {
  filterAuthHost
} from '@/services/AuthManagementAPI/resourceAPI'
import { message } from 'antd'

  export default {
    namespace: 'gforthost',
  
    state: {
      //项目数据
      projectlist:{
        data:[]
      },
      hosts:{
        data:[]
      }
    },
  
    effects: {
      //获取资源列表
      *getProjects({payload},{call,put}) {        
        const response = yield call(querProjectList);
        yield put({
          type: 'saveProject',
          payload: response,
        });
      },
      *searchHost({ payload } , { call, put }){
        const response = yield call( filterAuthHost, payload.params );
        if( response && response.status  ){
          yield put({
            type: 'saveHost',
            payload:response,
            callback: payload ? payload.callback :function(){}
          })
        }else{
          message.error( response? response.msg : "未知错误" );
        }
      }
    },
  
    reducers: {
      saveProject(state, action) {
        return {
          ...state,
          projectlist: action.payload,
        };
      },
      /** 更新权限数据*/
      updateSSHPermissionData(state, action){
        let payload = action.payload;
        //-1为删除权限
        let permissionid = payload.permissionid || -1;

        console.log("updateSSHPermisionData", state, action)
        let hosts = payload.hosts.split(",");
        let newhost = {
          ...state.hosts
        }
        newhost.data = newhost.data || [];
        newhost.data = newhost.data.concat();
        for(var i=0;i<newhost.data.length;i++){
          for(var j=0;j<hosts.length;j++){
            if( newhost.data[i].id == hosts[j] ){
              newhost.data[i].permissionid = parseInt( permissionid ) || -1;
            }
          }
        }
        console.log("new host", newhost)
        return {
          ...state, hosts:newhost
        }
      },
      saveHost( state, action ){
        action.callback && action.callback( action.payload );
        return {
          ...state,
          hosts:action.payload
        }
      }
    },
  };
  