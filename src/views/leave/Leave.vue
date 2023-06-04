<template>
    <div class="container">
        <el-table
                :data="tableData"
                style="width: 100%"
        >
            <el-table-column property="doctor_name" label="医生姓名" width="120"/>
            <el-table-column property="start_time" label="请假开始日期" width="150"/>
            <el-table-column property="end_time" label="请假结束日期" width="150"/>
            <el-table-column property="type" label="请假类别" width="120"/>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button type="primary" @click="showLeaveDetail(scope.row)">
                        处理请求
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <leave-detail v-model="display" :leave="leave"/>
    </div>
</template>

<script setup>
import {inject, nextTick, onMounted, ref, watch} from "vue";
import LeaveDetail from "./LeaveDetail.vue";
import useCustomLoading from "../../utils/loading.js";

const $api = inject('$api');
const display = ref(false);
const leave = ref({
    leave_id: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    type: '',
    reason: ''
});

const tableData = ref([]);

function showLeaveDetail(row) {
    leave.value = row;
    display.value = true;
}

async function getLeaveList() {
    const res = await $api.leave.getLeaveList();
    if (res.result !== '1') {
        console.log('获取请假列表失败');
        return;
    }
    tableData.value = res.data;
    await nextTick();
    useCustomLoading().end();
}

onMounted(async () => {
    await getLeaveList();
});

watch(display,  async (newVal) => {
    if (!newVal) {
        useCustomLoading().start({
            fullscreen: true,
            text: '加载中，请稍后'
        });
        await getLeaveList();
        location.reload();
    }
});
</script>

<style scoped>

</style>
