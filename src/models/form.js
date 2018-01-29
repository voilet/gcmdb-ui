import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm, querIdc, queryProject, queryEnv, queryOs, queryEquipment, queryHardware, addIdc } from '../services/api';

export default {
  namespace: 'form',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    idc: {
      data: [],
    },
    project: {
      data: [],
    },
    env: {
      data: [],
    },
    os: {
      data: [],
    },
    equipment: {
      data: [],
    },
    hardware: {
      data: [],
    },

  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitAddIdc({ payload }, { call }) {
      yield call(addIdc, payload);
      message.success('提交成功');
    },

    *getIdcQuery({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querIdc, payload);
      // const response = yield call(queryRule, payload);
      yield put({
        type: 'idcSave',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getProject({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProject, payload);
      // const response = yield call(queryRule, payload);
      yield put({
        type: 'projectSave',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getEnv({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryEnv, payload);
      // const response = yield call(queryRule, payload);
      yield put({
        type: 'envSave',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getOs({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryOs, payload);
      // const response = yield call(queryRule, payload);
      yield put({
        type: 'osSave',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getEquipment({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryEquipment, payload);
      // const response = yield call(queryRule, payload);
      yield put({
        type: 'equipmentSave',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getHardware({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryHardware, payload);
      // const response = yield call(queryRule, payload);
      yield put({
        type: 'hardwareSave',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *submitStepForm({ payload }, { call, put }) {
      yield put({
        type: 'changeStepFormSubmitting',
        payload: true,
      });
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'changeStepFormSubmitting',
        payload: false,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call, put }) {
      yield put({
        type: 'changeAdvancedFormSubmitting',
        payload: true,
      });
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'changeAdvancedFormSubmitting',
        payload: false,
      });
      message.success('提交成功');
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    idcSave(state, action) {
      return {
        ...state,
        idc: action.payload,
      };
    },

    projectSave(state, action) {
      return {
        ...state,
        project: action.payload,
      };
    },

    envSave(state, action) {
      return {
        ...state,
        env: action.payload,
      };
    },
    osSave(state, action) {
      return {
        ...state,
        os: action.payload,
      };
    },

    equipmentSave(state, action) {
      return {
        ...state,
        equipment: action.payload,
      };
    },

    hardwareSave(state, action) {
      return {
        ...state,
        hardware: action.payload,
      };
    },

    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeRegularFormSubmitting(state, { payload }) {
      return {
        ...state,
        regularFormSubmitting: payload,
      };
    },
    changeStepFormSubmitting(state, { payload }) {
      return {
        ...state,
        stepFormSubmitting: payload,
      };
    },
    changeAdvancedFormSubmitting(state, { payload }) {
      return {
        ...state,
        advancedFormSubmitting: payload,
      };
    },
  },
};
