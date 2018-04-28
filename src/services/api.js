import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/v1/project/notice');
}

export async function queryActivities() {
  return request('/v1/activities');
}

export async function queryRule(params) {
  return request(`/v1/rule?${stringify(params)}`);
}

export async function querHostList(params) {
  return request(`/v1/assets/host/list?${stringify(params)}`);
}

// 搜索
export async function querySearch(params) {
  return request(`/v1/search?${stringify(params)}`);
}


// 查询idc
export async function querIdc(params) {
  return request(`/v1/assets/idc/query?${stringify(params)}`);
}

// 查询用户组
export async function querUserGroup() {
  return request('/v1/users/group/list');
}

// 查询用户组
export async function querCaseList(params) {
  return request(`/v1/case/list?${stringify(params)}`);
}

// 查询运维用户组
export async function querOpsUser() {
  return request('/v1/user/ops');
}

// 查询运维用户组
export async function querProjectGroup() {
  return request('/v1/assets/project/group');
}


// 查询运维用户组
export async function querDevUser() {
  return request('/v1/user/dev');
}

// 查询用树
export async function querTree() {
  return request('/v1/assets/tree');
}

export async function queryProject() {
  return request('/v1/assets/project/query');
}

export async function queryEnv() {
  return request('/v1/assets/env/query');
}

export async function queryOs() {
  return request('/v1/assets/systemos/query');
}

export async function queryEquipment() {
  return request('/v1/assets/equipment/query');
}

export async function queryHardware() {
  return request('/v1/assets/hardware/query');
}



export async function removeRule(params) {
  return request('/v1/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function createUser(params) {
  return request('/v1/user/create', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

// export async function addRule(params) {
//   return request('/v1/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'post',
//     },
//   });

// 添加项目

export async function createCase(params) {
  params.expect_time = params.expect_time.format('YYYY-MM-DD HH:mm:ss');
  return request('/v1/case/create', {
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
  return request('/v1/assets/host/add', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/v1/fake_chart_data');
}

export async function queryTags() {
  return request('/v1/tags');
}

export async function queryHostDetails(params) {
  return request(`/v1/assets/host/page/${params}`);
}

export async function queryUserInfo(params) {
  return request(`/v1/user/info`);
}


export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

// 查询用户列表
export async function queryUserList() {
  return request('/v1/user/list');
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
