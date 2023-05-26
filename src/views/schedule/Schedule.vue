<template>
    <div class="container">
        <el-row :gutter="20" class="inputStyle">
            <el-col :span="8">
                <el-input placeholder="请输入内容"
                          v-model="queryInfo" clearable @clear="filterDoctorList(queryInfo)">
                    <template #append>
                        <el-button @click="filterDoctorList">
                            <el-icon>
                                <search/>
                            </el-icon>
                        </el-button>
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="filterDoctorList(queryInfo)" style="width: 100%">
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
                    <el-button type="primary" size="default" @click="showScheduleManagement(scope.row)">管理排班
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <schedule-management v-model="display" :doctor="doctor"/>
    </div>
</template>

<script setup>
import {inject, onMounted, reactive, ref, watch} from 'vue'
import {Search} from "@element-plus/icons-vue";
import ScheduleManagement from "@/views/schedule/ScheduleManagement.vue";

const $api = inject('$api');
const display = ref(false)
const doctor = ref({
    doctorName: '',
    doctorId: '',
    doctorDepartment: '',
    doctorAvatar: '',
    doctorSchedule: []
})

function showScheduleManagement(row) {
    //get doctor info by id and store the object in doctor
    doctor.value.doctorName = row.doctorName;
    doctor.value.doctorId = row.doctorId;
    doctor.value.doctorDepartment = row.doctorDepartment;
    doctor.value.doctorSchedule = row.doctorSchedule;
    doctor.value.doctorAvatar = row.doctorAvatar;
    display.value = true;
}

const queryInfo = ref('')
//generate some user data in userList
const doctorList = ref([]);
const filterDoctorList = (queryInfo) => {//find doctor by name
    // console.log(queryInfo)
    if (queryInfo === '') {
        return doctorList.value
    } else {
        return doctorList.value.filter(doctor => doctor.doctorName.includes(queryInfo))
    }
}

const weekday = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const time = ['上午', '下午'];

async function getDoctorList() {
    doctorList.value = [];
    const res = await $api.schedule.getScheduleList();
    console.log(res)
    if (res.result !== '1') {
        console.log(res.message)
        return;
    }
    for (let i = 0; i < res.data.length; i++) {
        let doctor_s = {
            doctorName: res.data[i].name,
            doctorId: res.data[i].doctor_id,
            doctorDepartment: res.data[i].department,
            doctorAvatar: res.data[i].image,
            doctorSchedule: []
        }
        for (let j = 0; j < res.data[i].day.length; j++) {
            let schedule = weekday[res.data[i].day[j].date - 1] + time[res.data[i].day[j].is_morning];
            doctor_s.doctorSchedule.push(schedule);
            console.log(schedule)
        }
        console.log(doctor_s)
        doctorList.value.push(doctor_s);
    }
}

onMounted(async () => {
    await getDoctorList();
})

watch(display, async (newVal) => {
    if (newVal === false) {
        await getDoctorList();
    }
})

</script>

<style scoped>
.tagStyle {
    margin: 5px 5px;
}

.inputStyle {
    margin: 20px 0;
}
</style>
