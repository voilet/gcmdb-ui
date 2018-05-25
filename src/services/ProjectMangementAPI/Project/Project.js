import { stringify } from 'qs';
import request from '../../../utils/request';

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
  
  
  // 添加项目
  export async function addProject(params) {
    return request('/v1/assets/project/add', {
      method: 'POST',
      body: {
        ...params,
        method: 'post',
      },
    });
  }
  
  
  // 查询项目组列表
  export async function querProjectGroup() {
    return request('/v1/assets/pro/groups/query');
  }
  
  //通过line id 查询项目组列表
  export async function querGroupbyLId(id) {
    return request(`/v1/assets/pro/groups/${id}`);
  }


//通过group id 查询项目列表
export async function querProjectbyGId(id) {
  return request(`/v1/assets/project/${id}`);
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