import { queryBasicProfile, queryAdvancedProfile, queryHostDetails } from '../services/api';

export default {
  namespace: 'profile',

  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    data:{
      os:{title:""},
      env:{title:""},
      hardware_type:{title:""},
      idc:{idc_name:""},
      hardware_vendor:{title:""},
    },
  },


  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryBasicProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },

    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },

    *fetchDetails({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryHostDetails, payload);
      yield put({
        type: 'show',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    changeLoading(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
