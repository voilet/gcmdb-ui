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


//查询某个项目中支持自动发布的服务器列表
/*
  @param projectid {String} - 项目id
  @example
  http://gcmdb.fun.tv/v1//assets/carving/query/project/1
 */

export async function queryAutoReleaseHostbyPid( params ){
  console.log("!!!!", arguments)
    return request(`/v1/assets/carving/project/${params.ID}`, {
        method: 'GET',
        body: {
            method: 'get'
        },
    });
}
//查询某个项目的发布版本列表
/*
  @param projectid {String} - 项目id
  @example
  http://gcmdb.fun.tv/v1//assets/carving/query/version/1
 */

export async function queryProjectVersions( params ){
    return request(`/v1/assets/carving/query/version/${params.ID}`, {
        method: 'GET',
        body: {
            method: 'get',
            ...params,
        },
    });
}
//查询某个项目的发布状态（通过socket侦听，无response数据）
/*
  @param projectid {String} - 项目id
  @example
  http://gcmdb.fun.tv/v1//assets/carving/query/version/1
 */
export async function queryReleaseHosts( params ){
    return request(`/v1/assets/carving/active/release/${params.ID}?active=${params.active}&version=${params.VERSION}&appid=${params.APPID}`, {
        method: 'GET',
        body: {
            method: 'get',
            ...params,
        },
    });
}