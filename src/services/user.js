import request from '@/utils/request';

export async function query() {
  return request('/v1/user/info');
}

export async function queryCurrent() {
  return request('/v1/user/currentUser');
  // return request('/api/currentUser');
}
export async function queryUserInfo(){
  return request('/v1/user/info');
}
export async function logoutActive() {
  return request('/logout');
}



 

