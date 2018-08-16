import { stringify } from 'qs';
import request from '../../../utils/request';

//获取机器管理员
export async function queryIdcUser() {
  return request(`/v1/assets/idc/queryuser`);
}

//获取机房机柜列表
export async function queryIdcRelation(params) {
  return request(`/v1/assets/idc/queryrelation/${params}`);
}

//获取运营商列表
export async function queryProvider(params) {
  console.log('queryProvider', params);
  //return request('');
  return request('/v1/assets/idc/queryprovider', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//添加运营商
export async function addProvider(params) {
 
  return request('/v1/assets/idc/addprovider', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//修改运营商
export async function modifyProvider(params) {
  return request(`/v1/assets/idc/modifyprovider/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//删除运营商

export async function deleteProvider(params) {
  return request(`/v1/assets/idc/deleteprovider/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//获取机房列表
export async function queryIDC(params) {
  console.log(params)
  return request('/v1/assets/idc/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//添加机房
export async function addIDC(params) {
  return request('/v1/assets/idc/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//修改机房
export async function modifyIDC(params) {
  return request(`/v1/assets/idc/modify/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//删除机房
export async function deleteIDC(params) {
  return request(`/v1/assets/idc/delete/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//查询机柜
export async function queryCabinet() {
  return request('/v1/assets/idc/querycabinet');
}


//查询机柜详情
export async function queryCabinetDetail(params) {
  return request(`/v1/assets/idc/querycabinetdetail/${params}`);
}


//添加机柜
export async function addCabinet(params) {
  return request('/v1/assets/idc/addcabinet', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//修改机柜
export async function modifyCabinet(ID,params) {
  return request(`/v1/assets/idc/modifycabinet/${ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//删除机柜
export async function deleteCabinet(params) {
  return request(`/v1/assets/idc/deletecabinet/${params}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//查询bays
export async function queryBay() {
  return request('/v1/assets/idc/querybay');
}

//添加bays
export async function addBay(params) {
  return request('/v1/assets/idc/addbay', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//修改bays
export async function modifyBay(params) {
  return request(`/v1/assets/idc/modifybay`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//删除bays
export async function deleteBay(params) {
  return request(`/v1/assets/idc/deletebay/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//查询ip
export async function queryIpResource(params) {
  return request('/v1/assets/idc/queryipresource', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


//搜索ip
export async function searchIpResourceAPI(params) {
  return request(`/v1/assets/idc/searchipresource`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}



//添加ip
export async function addIpResource(params) {
  return request('/v1/assets/idc/addipresource', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//修改ip
export async function modifyIpResource(params) {
  return request(`/v1/assets/idc/modifyipresource/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//删除ip
export async function deleteIpResource(params) {
  return request(`/v1/assets/idc/deleteipresource`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//检查ip
export async function checkIpResource(params) {
  return request(`/v1/assets/idc/checkip?${stringify(params)}`);
}

//查询ip
export async function queryIpClassify() {
  return request('/v1/assets/idc/queryclassify');
}
