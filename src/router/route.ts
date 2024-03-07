import { RouteRecordRaw } from 'vue-router'
import login from '@/views/login/index.vue'
import home from '@/layout/index.vue'
import error from '@/views/error/index.vue'
import screen from '@/views/screen/index.vue'
import acl from '@/views/acl/index.vue'
import user from '@/views/acl/user/index.vue'
import role from '@/views/acl/role/index.vue'
import permission from '@/views/acl/permission/index.vue'
import shop from '@/views/shop/index.vue'
import sku from '@/views/shop/sku/index.vue'
import spu from '@/views/shop/spu/index.vue'
import attr from '@/views/shop/attr/index.vue'
import strdmark from '@/views/shop/strdmark/index.vue'
import layount from '@/layout/index.vue'

export const constantRoute: RouteRecordRaw[] = [
  {
    path: '/',
    component: login,
    meta: {
      title: '登录',// 路由名称
      hidden: true,// 是否隐藏
      icon: 'User'// 图标
    }
  },
  {
    path: '/login',
    component: login,
    name: 'login',
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/error',
    component: error,
    name: 'error',
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error',
    name: 'Any',
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/home',
    component: home,
    name: 'home',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'HomeFilled'
    }
  },
  {
    path: '/screen',
    component: screen,
    name: 'screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform'
    }
  },
  {
    path: '/acl',
    component: layount,
    name: 'acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock'
    },
    children: [
      {
        path: '/acl/user',
        component: user,
        name: 'user',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: role,
        name: 'role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        component: permission,
        name: 'permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Monitor'
        }
      }
    ]
  },
  {
    path: '/shop',
    component: layount,
    name: 'shop',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods'
    },
    children: [
      {
        path: '/shop/strdmark',
        component: strdmark,
        name: 'strdmark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull'
        }
      },
      {
        path: '/shop/spu',
        component: spu,
        name: 'spu',
        meta: {
          title: 'spu管理',
          hidden: false,
          icon: 'Calendar'
        }
      },
      {
        path: '/shop/sku',
        component: sku,
        name: 'sku',
        meta: {
          title: 'sku管理',
          hidden: false,
          icon: 'Orange'
        }
      },
      {
        path: '/shop/attr',
        component: attr,
        name: 'attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled'
        }
      }
    ]
  }
]
