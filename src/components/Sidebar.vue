<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="Sidebar.collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items" :key="item.index">
                    <el-menu-item :index="item.index">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../stores/sidebar.js';
import { useRoute } from 'vue-router';

const items = [
    {
        icon: 'Odometer',
        index: '/dashboard',
        title: '系统首页',
    },
    {
        icon: 'List',
        index: '/department',
        title: '科室管理',
    },
    {
        icon: 'Tickets',
        index: '/doctor',
        title: '医生管理',
    },
    {
        icon: 'CopyDocument',
        index: '/schedule',
        title: '出诊排班',
    },
    {
        icon: 'Ticket',
        index: '/vacancy',
        title: '放号管理',
    },
    {
        icon: 'DocumentRemove',
        index: '/leave',
        title: '医生请假',
    },
    {
        icon: 'Message',
        index: '/announcement',
        title: '通知系统',
    },
    {
        icon: 'ChatDotRound',
        index: '/information',
        title: '消息系统',
    },

];

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
