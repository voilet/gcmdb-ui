import { stringify } from 'qs';
import request from '../../utils/request';

//获取用户列表
export async function queryUserlist() {
  return request(`/manage/auth/user/info`);
}



//修改用户列表
export async function modifyUserlist(params) {
  return request('/manage/auth/user/modify', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


//修改用户列表
export async function addUserlist(params) {
  return request('/manage/auth/user/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}