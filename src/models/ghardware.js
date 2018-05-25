import {
    queryHardwareComponents,addHardwareComponents,modifyHardwareComponents,deleteHardwareComponents,
    queryHardwarePlan,addHardwarePlan,modifyHardwarePlan,deleteHardwarePlan,modifyComponents
    } from '../services/ResourceMangementAPI/Hardware/HardwareService'
  import {message, Breadcrumb} from 'antd'
  
  
  export default {
    namespace: 'ghardware',
  
    state: {
      //cpu
      cpuInfo:{
        data: {
            list:[],
            category:[]
        },
        pagination: {}
      },
      //mem
      memInfo:{
        data: {
            list:[],
            category:[]
        },
        pagination: {}
      },
      //disk
      diskInfo:{
        data: {
            list:[],
            category:[]
        },
        pagination: {}
      },
      //power
      powerInfo:{
        data: {
            list:[],
            category:[]
        },
        pagination: {}
      },
      //adaptor
      adaptorInfo:{
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
      // 查询硬件CPU组件数据
      *queryHardwareComponentCpu({ payload }, { call, put }) {
        const response = yield call(queryHardwareComponents, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'HardwareComponentCpuSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
      //查询硬件内存组件数据
      *queryHardwareComponentMem({ payload }, { call, put }) {
        const response = yield call(queryHardwareComponents, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'HardwareComponentMemSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
      //查询硬件硬盘组件数据
      *queryHardwareComponentDisk({ payload }, { call, put }) {
        const response = yield call(queryHardwareComponents, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'HardwareComponentDiskSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
      //查询硬件电源组件数据
      *queryHardwareComponentPower({ payload }, { call, put }) {
        const response = yield call(queryHardwareComponents, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'HardwareComponentPowerSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
      //查询硬件网卡组件数据
      *queryHardwareComponentAdaptor({ payload }, { call, put }) {
        const response = yield call(queryHardwareComponents, payload) 
        if (response.status  == 200) {
          yield put({
            type: 'HardwareComponentAdaptorSave',
            payload: response,
          });
          } else {
            message.error(response.data)
        }
      },
  
      //添加硬件组件数据
      *addHardwareComponents({ payload }, { call,put }) {
        yield call(addHardwareComponents, payload.description);
        yield put({ type: 'reloadHardwareComponents',payload:payload.description.componentname})
      },
  
      //修改硬件组件数据
      *modifyHardwareComponents({ payload }, { call,put }) {
         yield call(modifyHardwareComponents, payload);
         yield put({ type: 'queryHardwarePlan',payload:payload.description.componentname})
        },
        
        //删除硬件组件数据
      *deleteHardwareComponents({ payload }, { call,put }) {
        const componentname = JSON.parse(payload.infolist).componentname
        yield call(deleteHardwareComponents, payload);
        yield put({ type: 'reloadHardwareComponents',payload:componentname })

        },
        //修改套餐组件数据
      *modifyComponents({ payload }, { call,put }) {
        yield call(modifyComponents, payload);
        yield put({ type: 'reloadHardwareComponents',payload:payload.componentname})
       },
       //重新查询组件数据
       *reloadHardwareComponents({payload},{ put }){
         switch(payload){
          case 'cpu':
            yield put({ type: 'queryHardwareComponentCpu', payload });
          break;
          case 'mem':
            yield put({ type: 'queryHardwareComponentMem', payload });
          break;
          case 'disk':
            yield put({ type: 'queryHardwareComponentDisk', payload });
          break;
          case 'power':
            yield put({ type: 'queryHardwareComponentPower', payload });
          break;
          case 'adaptor':
            yield put({ type: 'queryHardwareComponentAdaptor', payload });
          break;
         }
        
       },



      //查询套餐列表数据
      *queryHardwarePlan({ payload }, { call, put }) {
        const response = yield call(queryHardwarePlan, payload) 
        if (response.status  == 200) {
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
         
         yield put({ type: 'queryHardwarePlan', payload });
       },
    },
    reducers: {
      HardwareComponentCpuSave(state, action) {
        return {
          ...state,
          cpuInfo: action.payload,
        };
      },
      HardwareComponentMemSave(state, action) {
        return {
          ...state,
          memInfo: action.payload,
        };
      },
      HardwareComponentDiskSave(state, action) {
        return {
          ...state,
          diskInfo: action.payload,
        };
      },
      HardwareComponentPowerSave(state, action) {
        return {
          ...state,
          powerInfo: action.payload,
        };
      },
      HardwareComponentAdaptorSave(state, action) {
        return {
          ...state,
          adaptorInfo: action.payload,
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
  