import { stringify } from 'qs';
import request from '../../../utils/request';


//查询用户
export async function queryUser() {
  return request(`/v1/assets/idc/queryuser`);
}  


//获取套餐组件列表
export async function queryHardwareComponents(params) {
  return request(`/v1/assets/plan/component/query?componentname=${params}`);
}

//添加套餐组件
/*
cores:3 cores
title:C300
mainfrequency:2.9Hz
category:Intel
description:test
num:4
componentname:cpu
*/
export async function addHardwareComponents(params) {
  return request('/v1/assets/plan/component/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


/*
ID:1
cores:3 cores
title:C300
mainfrequency:2.9Hz
category:Intel
description:test
num:4
componentname:cpu
*/
//修改套餐组件
export async function modifyHardwareComponents(params) {
  return request(`/v1/assets/plan/component/modify/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


/*
tag:false //false是逻辑删除  true是物理删除
infolist:{"componentname": "cpu", "ids": [1, 2]}
*/
//删除套餐组件
export async function deleteHardwareComponents(params) {
  return request(`/v1/assets/plan/component/delete`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


//获取套餐列表
export async function queryHardwarePlan(params) {
  return request('/v1/assets/plan/compose/query');
}

//添加套餐
/*
cpu_id:1
mem_id:1
disk_id:1
power_id:1
adaptor_id:1
title: A12
comment:test
*/
export async function addHardwarePlan(params) {
  return request('/v1/assets/plan/compose/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


/*
ID:1
cpu_id:1
mem_id:1
disk_id:1
power_id:1
adaptor_id:1
title: A12
comment:test
*/
//修改套餐组件
export async function modifyHardwarePlan(params) {
  return request(`/v1/assets/plan/compose/modify/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


/*
tag:false //false是逻辑删除  true是物理删除
infolist:{"componentname": "cpu", "ids": [1, 2]}
*/
//删除套餐组件
export async function deleteHardwarePlan(params) {
  return request(`/v1/assets/plan/compose/delete`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


/*
currentPage=1
pageSize=50
*/
//查询主机基础表
export async function queryHosts(params) {
  return request(`/v1/assets/hardware/host/query/${params}`);
}

///v1/assets/hardware/host/detail/query/1
//查询主机详细表
export async function queryHostsDetail(params) {
  return request(`/v1/assets/hardware/host/detail/query/${params}`);
}

///v1/assets/hardware/host/password/query/1
//查询密码
export async function queryHostPassword(params) {
  return request(`/v1/assets/hardware/host/password/query/${params}`,{
    method: 'POST',
    body: {
      method: 'post',
    },
  });
}

//添加主机
export async function addHost(params) {
  return request('/v1/assets/hardware/host/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//删除主机
export async function deleteHost(params) {
  return request(`/v1/assets/hardware/host/delete`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}



//修改主机
export async function modifyHost(params) {
  return request(`/v1/assets/hardware/host/modify/${params.ID}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
