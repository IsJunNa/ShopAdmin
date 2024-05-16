import request from '@/utils/request'
enum API {
  // 获取菜单列表
  GETPERMISSIONLIST_URL = '/admin/acl/permission',
  // 新增菜单
  ADDPERMISSION_URL = '/admin/acl/permission/save',
  // 修改菜单
  UPDATEPERMISSION_URL = '/admin/acl/permission/update',
  // 删除菜单
  DELETEPERMISSION_URL = '/admin/acl/permission/remove/',
}
// 获取菜单列表
export const reqGetPermissionList = () =>
  request<any, any>({ url: API.GETPERMISSIONLIST_URL, method: 'GET' })
// 新增菜单
export const reqAddPermission = (data: any) =>
  request<any, any>({ url: API.ADDPERMISSION_URL, method: 'POST', data })
// 修改菜单
export const reqUpdatePermission = (data: any) =>
  request<any, any>({ url: API.UPDATEPERMISSION_URL, method: 'PUT', data })
// 删除菜单
export const reqDeletePermission = (id: number) =>
  request<any, any>({
    url: API.DELETEPERMISSION_URL + `${id}`,
    method: 'DELETE',
  })
