import {
    queryHardwareComponents,addHardwareComponents,modifyHardwareComponents,deleteHardwareComponents,
    queryHardwarePlan,addHardwarePlan,modifyHardwarePlan,deleteHardwarePlan
    } from '../services/ResourceMangementAPI/Hardware/HardwareService'
  import {message} from 'antd'
  
  
  export default {
    namespace: 'ghardware',
  
    state: {
      //套餐
      allinfo: {
        data: {
            list:[],
            category:[]
        },
        pagination: {}
      },
      //组合套餐
      composedata:{
        // {
        //   all_plan_data: [],
        //   cpu_data:[],
        //   mem_data:[],
        //   disk_data:[],
        //   power_data:[],
        //   adaptor_data:[],
        //   equipmenttypes:[],
        // }
        data:{},
        pagination: {}
      },
      loading: false
    },
  
  
    effects: {
      // 查询硬件组件数据
      *queryHardwareComponents({ payload }, { call, put }) {
        const response = yield call(queryHardwareComponents, payload) 
        if (response.code == 200) {
          yield put({
            type: 'hardwareComponentsSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
  
      //添加硬件组件数据
      *addHardwareComponents({ payload }, { call,put }) {
        // console.log("*****",payload.description)
        yield call(addHardwareComponents, payload.description);
        yield put({ type: 'reloadHardwareComponents',payload:payload.description.componentname})
      },
  
      //修改硬件组件数据
      *modifyHardwareComponents({ payload }, { call,put }) {
         yield call(modifyHardwareComponents, payload);
         yield put({ type: 'reloadHardwareComponents',payload:payload.description.componentname})
        },
  
        //删除硬件组件数据
      *deleteHardwareComponents({ payload }, { call,put }) {
        const componentname = JSON.parse(payload.infolist).componentname
        yield call(deleteHardwareComponents, payload);
        yield put({ type: 'reloadHardwareComponents',payload:componentname })

        },
      //重新硬件组件数据
      *reloadHardwareComponents({payload},{ put }) {
       // console.log("********",select)
        
        yield put({ type: 'queryHardwareComponents', payload });
      },


      //查询套餐列表数据
      *queryHardwarePlan({ payload }, { call, put }) {
        const response = yield call(queryHardwarePlan, payload) 
        if (response.code == 200) {
          yield put({
            type: 'HardwarePlanSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
  
      //添加套餐数据
      *addHardwarePlan({ payload }, { call, put }) {
        yield call(addHardwarePlan, payload);
        yield put({ type: 'reloadhardwarePlan'})
      },
  
      //修改套餐数据
      *modifyHardwarePlan({ payload }, { call, put }) {
        yield call(modifyHardwarePlan, payload);
        yield put({ type: 'reloadhardwarePlan'})
      },

  
      //删除套餐数据
      *deleteHardwarePlan({ payload }, { call, put }) {
        yield call(deleteHardwarePlan, payload);
        yield put({ type: 'reloadhardwarePlan'})
      },

      //重新加载套餐数据
      *reloadhardwarePlan({payload},{ put }) {
        // console.log("********",select)
         
         yield put({ type: 'queryHardwarePlan', payload });
       },
    },
    reducers: {
      hardwareComponentsSave(state, action) {
        return {
          ...state,
          allinfo: action.payload,
        };
      },
      HardwarePlanSave(state, action) {
        return {
          ...state,
          composedata: action.payload,
        };
      },
    },
  };
  