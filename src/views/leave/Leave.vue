<template>
    <div class="container">
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column property="name" label="医生姓名" width="120"/>
            <el-table-column property="startDate" label="请假开始日期" width="120"/>
            <el-table-column property="endDate" label="请假结束日期" width="120"/>
            <el-table-column property="type" label="请假类别" width="120"/>
            <el-table-column align="right">
                <el-button type="primary" @click="showDialog">
                    处理请求
                </el-button>
            </el-table-column>
        </el-table>
        <leave-detail :display="dialogVisible" @close="closeDialog"/>
    </div>
</template>

<script setup>
import {ref} from "vue";
import LeaveDetail from "./LeaveDetail.vue";

const tableData = ref([
    {
        name:'淳平大夫',
        startDate:'2023-5-4',
        endDate:'2023-5-5',
        type:'病假'
    },
    {
        name:'田所大夫',
        startDate:'2023-5-5',
        endDate:'2023-5-6',
        type:'事假'
    }
]);

const dialogVisible = ref(false)

function showDialog() {
    dialogVisible.value = true;
}

function closeDialog() {
    dialogVisible.value = false;
}
</script>

<style scoped>

</style>
