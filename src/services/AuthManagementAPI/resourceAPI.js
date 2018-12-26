import { stringify } from 'qs';
import request from '../../utils/request';

//获取所有资源列表
export async function queryResourcelist() {
  return request(`/manage/auth/resource/allinfo`);
}

/** 
 * QueryObject virtual Type 
 * @typedef {Object} QueryObject 
 * @property {String} [ip=""] 
 * @property {Number} [user_id=] - 用户ID
 * @property {Number} [project_id] - 项目ID
 * @property {Number} [currentPage=1] - 当前页 
 * @property {Number} [pageSize=20] - 页大小
 */
/** 
 * a function that a manager can make a order 
 * @param {QueryObject} params - 查询参数 
 */  
export async function filterAuthHost( params ){
  return request(`/v1/ssh/fortress/search`,{
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  })
}

//添加资源列表
export async function addResourcelist(params) {
  return request('/manage/auth/resource/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
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


//修改资源列表顺序
export async function modifyResourceSeq(params) {
  return request('/manage/auth/resource/modifyseq', {
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
  return request(`/manage/auth/resource/parentinfo`);
}

