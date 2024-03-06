import { RouteRecordRaw } from 'vue-router'
import login from '@/views/login/index.vue'
import home from '@/layout/index.vue'
import error from '@/views/error/index.vue'

export const constantRoute: RouteRecordRaw[] = [
    {
        path: '/',
        component: login,
    },
    {
        path: '/login',
        component: login,
        name: 'login'
    },
    {
        path: '/home',
        component: home,
        name: 'home'
    },
    {
        path: '/error',
        component: error,
        name: 'error'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/error',
        name: 'Any'
    }
]
