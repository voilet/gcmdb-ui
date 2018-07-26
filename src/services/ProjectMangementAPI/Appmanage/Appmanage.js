import { stringify } from 'qs';
import request from '../../../utils/request';


//查询树
export async function queryTree() {
  return request(`/v1/assets/tree`);
}


//通过pro id 查询机器列表
export async function queryHostbyPid(params) {
  return request(`/v1/assets/appmange/querytree/`,{
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    }
  });
}

//更新树
export async function updateprojectTree() {
  return request(`/v1/assets/tree?active=update`);
}



//查询树
export async function queryAllTree() {
  return request(`/v1/assets/appmange/queryalltree`);
}


