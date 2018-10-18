import { stringify } from 'qs';
import request from '../../utils/request';

//获取所有资源列表
export async function queryResourcelist() {
  return request(`/manage/auth/resource/allinfo`);
}



//修改资源列表
export async function modifyResourcelist(params) {
  return request('/manage/auth/resource/modify', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


//删除资源列表项
export async function deleteResourcelist(params) {
  return request('/manage/auth/resource/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//获取url for link
export async function queryURLforLink(params) {
  return request('/manage/auth/resource/queryurl', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//获取父节点资源树
export async function getResourceTreeForparent(params) {
  return request('/manage/auth/resource/parentinfo', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

