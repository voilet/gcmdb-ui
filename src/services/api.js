import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function querHostList(params) {
  return request(`/assets/host/list?${stringify(params)}`);
}

// 搜索
export async function querySearch(params) {
  return request(`/api/search?${stringify(params)}`);
}


// 查询idc
export async function querIdc(params) {
  return request(`/api/assets/idc/query?${stringify(params)}`);
}

// 查询用户组
export async function querUserGroup() {
  return request('/users/group/list');
}

// 查询用户组
export async function querCaseList() {
  return request('/case/list');
}

// 查询用树
export async function querTree() {
  return request('/api/assets/tree');
}

export async function queryProject() {
  return request('/api/assets/project/query');
}

export async function queryEnv() {
  return request('/api/assets/env/query');
}

export async function queryOs() {
  return request('/api/assets/systemos/query');
}

export async function queryEquipment() {
  return request('/api/assets/equipment/query');
}

export async function queryHardware() {
  return request('/api/assets/hardware/query');
}


export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function createCase(params) {
  return request('/case/create', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function addIdc(params) {
  return request('/assets/idc/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryHostDetails(params) {
  return request(`/assets/host/page/${params}`);
}


export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

// 查询用户列表
export async function queryUserList() {
  return request('/users/list');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}


export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/login', {
  // return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
