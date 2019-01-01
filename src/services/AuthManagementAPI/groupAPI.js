import { stringify } from 'qs';
import request from '../../utils/request';


//删除堡垒机权限组
export async function deleteFortHostPermissionGroup( params ) {
  return request(`/v1/ssh/group/delete/${params.ID}`,{
    method: 'POST',
    body: {
      ...params.fields,
      method: 'post',
    },
  })
}
//修改堡垒机权限组
/*
title  权限组名称
remarks 备注说明
rsa 用户私钥
*/
export async function modifyFortHostPermissionGroup( params ) {
  return request(`/v1/ssh/group/modify/${params.ID}`,{
    method: 'POST',
    body: {
      ...params.fields,
      method: 'post',
    },
  })
}
//新建堡垒机权限组
/*
title  权限组名称
remarks 备注说明
rsa 用户私钥
*/
export async function addFortHostPermissionGroup( params ) {
  return request(`/v1/ssh/group/create/${params.ID}`,{
    method: 'POST',
    body: {
      ...params.fields,
      method: 'post',
    },
  })
}