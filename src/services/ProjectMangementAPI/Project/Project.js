// 查询项目列表
export async function queryProjectList(params) {
    return request(`/assets/project/list?${stringify(params)}`);
  }
  
  // 查询重组项目列表
  export async function queryProject(params) {
    return request(`/assets/project/query?${stringify(params)}`);
  }
  
  
  // 添加项目
  export async function addProject(params) {
    return request('/assets/project/add', {
      method: 'POST',
      body: {
        ...params,
        method: 'post',
      },
    });
  }
  
  
  // 查询项目组列表
  export async function querProjectGroup() {
    return request('/assets/pro/groups/query');
  }
  
  //通过id 查询项目组列表
  export async function querProjectGroupbyId(id) {
    return request(`/assets/pro/groups/query/${id}`);
  }
  
  //添加项目组列表
  export async function addProjectGroup(params) {
    return request('/assets/pro/groups/add', {
      method: 'POST',
      body: {
        ...params,
        method: 'post',
      },
    });
  }
  
  //查询产品线列表
  export async function querProjectLine() {
    return request('/assets/projectline/query');
  }
  
  
  
  //添加产品线列表
  export async function addProjectLine(params) {
    return request('/assets/projectline/add', {
      method: 'POST',
      body: {
        ...params,
        method: 'post',
      },
    });
  }
  