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
//修改套餐列表
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
套餐id
/assets/plan/component/modify/1
cpu:
/assets/plan/component/modify/1?componentname=cpu&
num=1&title="名称"&mainfrequency="频率"&cores=核数&
category=类别&description=描述

mem:
/assets/plan/component/modify/1?componentname=mem&
num=1&title="名称"&mainfrequency="频率"&volume=容量&
description=描述

disk:
/assets/plan/component/modify/1?componentname=disk&
num=1&title="名称"&volume="大小"&rpm=转数&
category=类别&description=描述&


power:
/assets/plan/component/modify/1?componentname=power&
num=1&title="名称"&volume=大小&description=描述

adaptor
/assets/plan/component/modify/1?componentname=adaptor&
num=1&title="名称"&category=类别&description=描述


*/
//修改套餐组件包括 cpu mem disk等
export async function modifyComponents(params) {
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
  return request(`/v1/assets/hardware/host/query`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
/** 
 * QueryObject virtual Type 
 * @typedef {Object} QueryObject 
 * @property {String} [ip=""] 
 * @property {Number} [currentPage=1] - 当前页 
 * @property {Number} [pageSize=20] - 页大小
 */
/** 
 * a function that a manager can make a order 
 * @param {QueryObject} params - 查询参数 
 */  
export async function filterHosts( params ){
  return request(`v1/assets/ip/search`,{
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  })
}


export async function queryHostsByPid(params) {
  return request(`/v1/assets/hardware/host/querybypro`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}




//查询已下线主机列表
export async function queryOfflineHosts(params) {
  return request(`/v1/assets/hardware/host/offline/query/${params}`);
}


//按照条件查询主机列表
export async function queryHostsByCondition(params) {
  return request(`/v1/assets/hardware/searchhosts/${params}`);
}


///v1/assets/hardware/host/detail/query/1
//查询主机详细表
export async function queryHostsDetail(params) {
  return request(`/v1/assets/hardware/host/detail/query/${params}`);
}

///v1/assets/hardware/host/password/query/1
//查询密码
export async function queryHostPassword(params) {
  return request(`/v1/assets/hardware/host/password/query/${params}`, {
    method: 'POST',
    body: {
      method: 'post',
    },
  });
}


///v1/assets/hardware/host/password/modify/1
//修改密码
export async function modifyHostPassword(params) {
  return request(`/v1/assets/hardware/host/password/modify/${params.id}`, {
    method: 'POST',
    body: {
      method: 'post',
      ...params,
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
export async function modifyHost(params,id) {
  return request(`/v1/assets/hardware/host/modify/${id}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}



//搜索线上主机
export async function searchOnlineHost(params) {
  return request(`/v1/assets/hardware/host/searchbycondition/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


//搜索已下线主机
export async function searchOfflineHost(params) {
  return request(`/v1/assets/hardware/host/searchbycondition/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}