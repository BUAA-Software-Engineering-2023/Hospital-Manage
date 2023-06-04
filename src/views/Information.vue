<template>
    <div class="container">
        <el-tabs v-model="message">
            <el-tab-pane :label="`未处理请求(${state.unread.length})`" name="first">
                <el-table :data="state.unread" :show-header="false" style="width: 100%">
                    <el-table-column>
                        <template #default="scope">
                            <span class="message-title">{{ scope.row.doctor_name }}的{{ scope.row.type }}请求</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="start_time" width="180"></el-table-column>
                </el-table>
                <div class="handle-row">
                    <el-button type="primary" @click="toHandle">跳转至请求处理</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="`已处理请求(${state.read.length})`" name="second">
                <template v-if="message === 'second'">
                    <el-table :data="state.read" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template #default="scope">
                                <span class="message-title">{{ scope.row.doctor_name }}的{{ scope.row.type }}请求</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="start_time" width="180"></el-table-column>
                        <el-table-column prop="status"/>
                    </el-table>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import {inject, onMounted, ref} from 'vue';
import router from "@/router/index.js";

const $api = inject('$api');
const message = ref('first');
const state = ref({
    unread: [],
    read: []
});

onMounted(async () => {
    let res = await $api.leave.getLeaveList();
    state.value.unread = res.data;
    res = await $api.leave.getProcessedLeaveList();
    state.value.read = res.data;
});

function toHandle() {
    router.push('/leave');
}
</script>

<style>
.message-title {
    cursor: pointer;
}

.handle-row {
    margin-top: 30px;
}
</style>
