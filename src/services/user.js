import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/user/currentUser');
  // return request('/api/currentUser');
}
export async function logoutActive() {
  return request('/logout');
}
