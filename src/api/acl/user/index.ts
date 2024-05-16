import request from '@/utils/request'

enum API {
  // 根据分页获取用户信息列表
  GETUSERLIST_URL = '/admin/acl/user/',
  // 获取用户信息
  GETROLE_URL = '/admin/acl/user/get/',
  // 新增用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户信息
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 根据id删除单个用户
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 获取用户角色
  GETROLELIST_URL = '/admin/acl/user/toAssign/',
  // 修改用户角色
  UPDATEUSERROLE_URL = '/admin/acl/user/doAssignRole',
  // 批量删除用户
  DELETEUSERLIST_URL = '/admin/acl/user/batchRemove',
}

// 获取用户信息列表
export const reqGetUserList = (
  page: number,
  limit: number,
  username?: string,
) =>
  request<any, any>({
    url: API.GETUSERLIST_URL + `${page}/${limit}/?username=${username}`,
    method: 'GET',
  })
// 获取用户信息
export const reqGetRole = (id: number) =>
  request<any, any>({ url: API.GETROLE_URL + `${id}`, method: 'GET' })
// 新增用户
export const reqAddUser = (data) =>
  request<any, any>({ url: API.ADDUSER_URL, method: 'POST', data })
// 修改用户信息
export const reqUpdateUser = (data) =>
  request<any, any>({ url: API.UPDATEUSER_URL, method: 'PUT', data })
// 根据id删除单个用户
export const reqDeleteUser = (id) =>
  request<any, any>({ url: API.DELETEUSER_URL + `${id}`, method: 'DELETE' })
// 获取用户角色
export const reqGetRoleList = (id) =>
  request<any, any>({ url: API.GETROLELIST_URL + `${id}`, method: 'GET' })
// 修改用户角色
export const reqUpdateUserRole = (data) =>
  request<any, any>({ url: API.UPDATEUSERROLE_URL, method: 'POST', data })
// 批量删除用户
export const reqDeleteUserList = (data) =>
  request<any, any>({ url: API.DELETEUSERLIST_URL, method: 'DELETE', data })
