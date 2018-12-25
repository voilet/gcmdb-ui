import {
  querProjectList
} from '@/services/ProjectMangementAPI/Project/Project'

import {
  filterHosts
} from '@/services/ResourceMangementAPI/Hardware/HardwareService'
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
        const response = yield call( filterHosts, payload );
        if( response && response.status == 200 ){
          yield put({
            type: 'saveHost',
            payload:response
          })
        }else{
          message.error( response? message.msg : "未知错误" );
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

      saveHost( state, action ){
        return {
          ...state,
          hosts:action.payload
        }
      }
    },
  };
  