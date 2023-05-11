<template>
    <div class="container">
        <el-button type="primary" @click="showDialog" class="button">
            <el-icon class="icon">
                <Plus/>
            </el-icon>
            添加
        </el-button>
        <el-button type="danger" @click="" class="button">
            <el-icon class="icon">
                <DeleteFilled/>
            </el-icon>
            删除
        </el-button>
        <!--write a table with element plus UI with the following columns: department, name, description-->
        <el-table
                :data="tableData"
                style="width: 100%"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="department"
                    label="部门"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
            >
            </el-table-column>
            <el-table-column align="right" width="100">
                <el-button type="primary" @click="showDialog">
                    编辑信息
                </el-button>
            </el-table-column>
        </el-table>
        <doctor-detail :display="dialogVisible" @close="closeDialog"/>
    </div>
</template>

<script setup>
//give the table data
import {DeleteFilled, Plus} from "@element-plus/icons-vue";
import {ref} from "vue";
import DoctorDetail from "@/views/doctor/DoctorDetail.vue";
const dialogVisible = ref(false)

function showDialog() {
    dialogVisible.value = true;
}

function closeDialog() {
    dialogVisible.value = false;
}

const tableData = [
    {
        name: '张三',
        department: '内科',
        description: '张三是内科的医生'
    },
    {
        name: '李四',
        department: '外科',
        description: '李四是外科的医生'
    },
    {
        name: '王五',
        department: '儿科',
        description: '王五是儿科的医生'
    },
    {
        name: '赵六',
        department: '妇科',
        description: '赵六是妇科的医生'
    },
    {
        name: '孙七',
        department: '内科',
        description: '孙七是内科的医生'
    },
    {
        name: '周八',
        department: '外科',
        description: '周八是外科的医生'
    },
    {
        name: '吴九',
        department: '儿科',
        description: '吴九是儿科的医生'
    },
    {
        name: '郑十',
        department: '妇科',
        description: '郑十是妇科的医生'
    },
]
</script>

<style scoped>
.button{
    margin-bottom: 10px;
}
.icon{
    margin-right: 6px;
}
</style>
