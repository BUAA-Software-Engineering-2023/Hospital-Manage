import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
            },
            {
                path: '/department',
                name: 'department',
                meta: {
                    title: '科室管理',
                },
                component: () => import(/* webpackChunkName: "department" */ '../views/department/Department.vue'),
            },
            {
                path: '/doctor',
                name: 'doctor',
                meta: {
                    title: '医生管理',
                },
                component: () => import(/* webpackChunkName: "department" */ '../views/Doctor.vue'),
            },
            {
                path: '/schedule',
                name: 'schedule',
                meta: {
                    title: '出诊排班',
                },
                component: () => import(/* webpackChunkName: "department" */ '../views/Schedule.vue'),
            },
            {
                path: '/vacancy',
                name: 'vacancy',
                meta: {
                    title: '放号管理',
                },
                component: () => import(/* webpackChunkName: "department" */ '../views/Vacancy.vue'),
            },
            {
                path: '/leave',
                name: 'leave',
                meta: {
                    title: '医生请假',
                },
                component: () => import(/* webpackChunkName: "department" */ '../views/leave/Leave.vue'),
            },
            {
                path: '/announcement',
                name: 'announcement',
                meta: {
                    title: '通知系统',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/Announcement.vue'),
            },
            {
                path: '/information',
                name: 'information',
                meta: {
                    title: '消息系统',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/Information.vue'),
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | hospital-manage`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

export default router;
