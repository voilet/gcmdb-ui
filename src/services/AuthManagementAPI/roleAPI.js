import { stringify } from 'qs';
import request from '../../utils/request';

//获取角色列表
export async function queryRolelist() {
  return request(`/manage/auth/role/info`);
}



//修改角色信息
export async function modifyRolelist(params) {
  return request('/manage/auth/role/modify', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


//修改角色权限
export async function grantRolelist(params) {
  return request('/manage/auth/role/grant', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


//获取资源信息
export async function getResourceById(params) {
  return request('/manage/auth/resource/info', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//分配权限
export async function allocateResource(params) {
  return request('/manage/auth/user/allocate', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

