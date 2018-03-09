import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  // return request('/api/case/notices');
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
export async function querCaseList(params) {
  return request(`/case/list?${stringify(params)}`);
}

// 查询运维用户组
export async function querOpsUser() {
  return request('/api/user/ops');
}

// 查询运维用户组
export async function querProjectGroup() {
  return request('/api/assets/project/group');
}


// 查询运维用户组
export async function querDevUser() {
  return request('/api/user/dev');
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

// 查询项目列表
export async function queryProjectList(params) {
  return request(`/assets/project/list?${stringify(params)}`);
}

// 查询项目列表
export async function queryProjectGetId(params) {
  return request(`/api/assets/project/${params.id}/host?${stringify(params)}`);
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
export async function createUser(params) {
  return request('/users/user/create', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
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
// 添加项目
export async function addProject(params) {
  return request('/assets/project/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function createCase(params) {
  params.expect_time = params.expect_time.format('YYYY-MM-DD HH:mm:ss');
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
  params.start_guaratee = params.start_guaratee.format('YYYY-MM-DD HH:mm:ss');
  params.stop_guaratee = params.stop_guaratee.format('YYYY-MM-DD HH:mm:ss');
  return request('/assets/host/add', {
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

export async function queryUserInfo(params) {
  return request(`/users/user/info`);
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
  return request('/api/case/notices');
  // return request('/api/notices');
}
