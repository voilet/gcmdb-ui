import { stringify } from 'qs';
import request from '../../../utils/request';

//根据搜索条件查询产品列表
export async function  searchProject(params){
  return request('/v1/assets/project/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//查询树
export async function queryTree() {
  return request(`/v1/assets/tree`);
}

// 查询项目列表
export async function queryProjectList(params) {
  return request(`/v1/assets/project/list?${stringify(params)}`);
}

// 查询重组项目列表
export async function queryProject(params) {
  return request(`/v1/assets/project/list?${stringify(params)}`);
}
//添加项目
export async function addProject(params) {
  return request('/v1/assets/project/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

// 添加发布项(指定一个项目id)
export async function addProjectItem(params) {
  return request(`/v1/assets/carving/create/${params.ID}`, {
    method: 'POST',
    body: {
      ...params.fields,
      method: 'post',
    },
  });
}
//添加配置的版本
export async function addProjectConfigVersion( params ){
  return request(`/v1/assets/carving/release/create/${params.ID}`,{
    method:'POST',
    body:{
      ...params.fields
    }
  });
}
//删除配置项中的版本
export async function deleteProjectConfigVersion( params ){
  return request(`/v1/assets/carving/release/delete/${params.ID}`);
}



//查询项目中的任务
export async function querProjectTasks( params ){
  return request(`/v1/assets/carving/task/query/release/${params.ID}`);
}

//添加项目中的任务
export async function addProjectTask( params ){
  return request(`v1/assets/carving/task/create/${params.ProId}`,{
    method:'POST',
    body:{
      ...params.fields
    }
  });
}
//修改项目中的任务
export async function modifyProjectTask( params ){
  return request(`v1/assets/carving/task/modify/${params.ID}`,{
    method:'POST',
    body:{
      ...params.fields
    }
  });
}
//删除项目中的任务
export async function deleteProjectTask( params ){
  return request(`/v1/assets/carving/task/delete/${params.ID}`);
}

//查询发布项目中的主机
export async function querProjectHosts( params ){
  return request(`/v1/assets/project/host/${params.ID}`);
}
//查询项目中的所有主机列表
export async function querProjectAllHosts( params ){
  return request(`/v1/assets/carving/host/query/${params.ProId}`);
}
//修改所有的主机配置
export async function editProjectHosts( params ){
  let hosts = params.data.carving_host || [];
  let ips = hosts.map( val=>{
    return val.eth1;
  })
  return request(`/v1/assets/carving/host/${params.ProId}`, {
    method: 'POST',
    body: {
      ip:ips.join(','),
      method: 'post',
    },
  });
}

//修改项目
export async function modifyProject(params) {
  return request(`/v1/assets/project/modify/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
//删除项目
export async function deleteProject(params) {
  return request(`/v1/assets/project/delete`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}



//通过pro id 查询机器列表
export async function queryHostbyPid(id) {
  return request(`/v1/assets/appmange/querytree/`,{
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    }
  });
}

//通过line id 查询项目组列表
export async function querGroupbyLId(id) {
  return request(`/v1/assets/pro/groups/${id}`);
}

//通过group id 查询项目列表
export async function querProjectbyGId(id) {
  return request(`/v1/assets/project/${id}`);
}

/** 
 * QueryObject virtual Type 
 * @typedef {Object} QueryObject 
 * @property {Number} [currentPage=1] - 当前页 
 * @property {Number} [pageSize=20] - 页大小
 */
/*查询所有的项目
 * @param {QueryObject} params - 查询参数
 * @example:http://gcmdb.fun.tv/v1/assets/project/list?currentPage=1&pageSize=100
 * @return {json|text}
 */
export async function querProjectList( params ){
  return request(`/v1/assets/project/list/${stringify(params)}`);
}
//通过project id查询配置列表(发布项列表)
export async function querProjectConfigById( id ){
  return request(`/v1/assets/carvid/${id}`);
  return request(`/v1/assets/carving/project/${id}`);
}
//查询不同发布项的版本列表
export async function querProjectVersions( id ){
  return request(`/v1/assets/carving/query/version/${id}`);
}
// 查询项目组列表
export async function querProjectGroup() {
  return request('/v1/assets/pro/groups/queryall');
}

//添加项目组列表
export async function addProjectGroup(params) {
  return request('/v1/assets/pro/groups/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//修改项目组
export async function modifyProjectGroup(params) {
  return request(`/v1/assets/pro/groups/modify/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//删除项目组
export async function deleteProjectGroup(params) {
  return request(`/v1/assets/pro/groups/delete`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}



//查询产品线列表
export async function querProjectLine() {
  return request('/v1/assets/projectline/query');
}

//添加产品线列表
export async function addProjectLine(params) {
  return request('/v1/assets/projectline/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//修改产品线
export async function modifyProjectLine(params) {
  return request(`/v1/assets/projectline/modify/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//删除产品线
export async function deleteProjectLine(params) {
  return request(`/v1/assets/projectline/delete/${params}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}




///assets/hardware/hostpro/modify/:id:int
//修改项目主机关系
export async function hostproModify(params,id) {
  return request(`/v1/assets/hardware/hostpro/modify/${id}`, {
    method: 'POST',
    body: {
      method: 'post',
      ...params,
    },
  });
}

///assets/hardware/hostpro/delete//:id:int
//解除项目主机关系
export async function hostproDelete(params,id) {
  return request(`/v1/assets/hardware/hostpro/delete/${id}`, {
    method: 'POST',
    body: {
      method: 'post',
      ...params,
    },
  });
}


//更新树
export async function updateprojectTree() {
  return request(`/v1/assets/tree?active=update`);
}


