import { stringify } from 'qs';
import request from '../../utils/request';

//获取用户列表以用户权限列表
export async function queryUsers() {
  return request(`/manage/auth/user/info`);
}

//获取SSH权限分组列表
export async function querySSHRoleList(){
  return request(`/v1/ssh/group/list`);
}
//修改用户SSH权限
export async function modifySSHPermission( params ){
  return request(`/v1/ssh/user/updates/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
//删除用户SSH权限
export async function deleteSSHPermission( params ){
  return request(`/v1/ssh/user/delete/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
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


//添加用户列表
export async function addUserlist(params) {
  return request('/manage/auth/user/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//搜索用户列表
export async function searchUserlist(params) {
  return request('/manage/auth/user/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}