<template>
    <div class="container">
        <el-row :gutter="20" class="inputStyle">
            <el-col :span="8">
                <el-input placeholder="请输入内容"
                          v-model="queryInfo" clearable @clear="getDoctorList(queryInfo)">
                    <template #append>
                        <el-button @click="getDoctorList">
                            <el-icon>
                                <search/>
                            </el-icon>
                        </el-button>
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="getDoctorList(queryInfo)" style="width: 100%">
            <el-table-column prop="doctorName" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="doctorDepartment" label="科室" width="180">
            </el-table-column>
            <el-table-column prop="doctorSchedule" label="排班" #default="scope">
                <el-tag v-for="schedule in scope.row.doctorSchedule" :key="schedule" class="tagStyle">
                    {{ schedule }}
                </el-tag>
            </el-table-column>
            <el-table-column width="180" align="right">
                <template #default="scope">
                    <el-button type="primary" size="default" @click="showDialog(scope.row.doctorId)">管理排班</el-button>
                </template>
            </el-table-column>
        </el-table>
        <schedule-management :display="dialogVisible" :doctor="doctor" @close="closeDialog"/>
    </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {Search} from "@element-plus/icons-vue";
import ScheduleManagement from "@/views/schedule/ScheduleManagement.vue";

const dialogVisible = ref(false)
const doctor = ref({
    doctorName: '',
    doctorId: '',
    doctorDepartment: '',
    doctorSchedule: []
})

function showDialog(id) {
    //get doctor info by id and store the object in doctor
    doctor.value = doctorList.filter(doctor => doctor.doctorId === id)[0];
    dialogVisible.value = true;
}

function closeDialog() {
    dialogVisible.value = false;
}

const queryInfo = ref('')
//generate some user data in userList
const doctorList = reactive([
    {
        doctorName: '张三',
        doctorId: 1,
        doctorDepartment: '内科',
        doctorSchedule: [
            '2023-05-11 14:00:00',
            '2023-05-12 09:00:00',
            '2023-05-12 14:00:00'
        ],
    },
    {
        doctorName: '李四',
        doctorId: 2,
        doctorDepartment: '外科',
        doctorSchedule: [
        ],
    },
    {
        doctorName: '王五',
        doctorId: 3,
        doctorDepartment: '儿科',
        doctorSchedule: [
        ],
    },
    {
        doctorName: '赵六',
        doctorId: 4,
        doctorDepartment: '妇科',
        doctorSchedule: [
        ],
    },
    {
        doctorName: '孙七',
        doctorId: 5,
        doctorDepartment: '内科',
        doctorSchedule: [
        ],
    },
    {
        doctorName: '周八',
        doctorId: 6,
        doctorDepartment: '外科',
        doctorSchedule: [
        ],
    },
    {
        doctorName: '吴九',
        doctorId: 7,
        doctorDepartment: '儿科',
        doctorSchedule: [
        ]
    },
    {
        doctorName: '郑十',
        doctorId: 8,
        doctorDepartment: '妇科',
        doctorSchedule: [
        ]
    }]);
const getDoctorList = (queryInfo) => {//find doctor by name
    console.log(queryInfo)
    if (queryInfo === '') {
        return doctorList
    } else {
        return doctorList.filter(doctor => doctor.doctorName.includes(queryInfo))
    }
}


</script>

<style scoped>
.tagStyle{
    margin:  5px 5px;
}
.inputStyle{
    margin: 20px 0;
}
</style>
