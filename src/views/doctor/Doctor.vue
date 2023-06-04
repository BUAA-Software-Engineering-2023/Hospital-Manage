<template>
    <div class="container">
        <el-button type="primary" @click="showDoctorDetail(undefined)" class="button">
            <el-icon class="icon">
                <Plus/>
            </el-icon>
            添加
        </el-button>
        <el-button type="danger" @click="deleteDoctor" class="button">
            <el-icon class="icon">
                <DeleteFilled/>
            </el-icon>
            删除
        </el-button>
        <!--write a table with element plus UI with the following columns: department, name, description-->
        <el-table
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%"
        >
            <el-table-column type="selection" width="55"/>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="gender"
                    label="性别"
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
                    prop="phone_number"
                    label="手机号"
            >
            </el-table-column>
            <el-table-column
                    prop="introduction"
                    label="描述"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="image"
                v-if="false"
            >
            </el-table-column>
            <el-table-column
                prop="id"
                v-if="false"
            >
            </el-table-column>
            <el-table-column align="right" width="100">
                <template #default="scope">
                    <el-button type="primary" @click="showDoctorDetail(scope.row)">
                        编辑信息
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <doctor-detail v-model="display" :doctor="doctor"/>
    </div>
</template>

<script setup>
//give the table data
import {DeleteFilled, Plus} from "@element-plus/icons-vue";
import {inject, nextTick, onMounted, reactive, ref, watch} from "vue";
import DoctorDetail from "@/views/doctor/DoctorDetail.vue";
import {ElMessage} from "element-plus";
import useCustomLoading from "../../utils/loading.js";

const $api = inject('$api');
const display = ref(false);
const tableData = ref([]);
const departmentList = ref([]);
const multipleTableRef = ref()
const doctor = reactive({
    doctorName: '',
    doctorDepartment: 0,
    doctorAvatar: '',
    doctorDesc: '',
    doctorPhone: '',
    doctorGender: '',
    doctorId: '',
})

function showDoctorDetail(row) {
    display.value = true;
    if (row) {
        doctor.doctorName = row.name;
        doctor.doctorDepartment = getDepartmentId(row.department);
        doctor.doctorDesc = row.introduction;
        doctor.doctorPhone = row.phone_number;
        doctor.doctorGender = row.gender;
        doctor.doctorAvatar = row.image;
        doctor.doctorId = row.id;
        // console.log(getDepartmentId(row.department));
    } else {
        doctor.doctorName = '';
        doctor.doctorDepartment = 0;
        doctor.doctorDesc = '';
        doctor.doctorPhone = '';
        doctor.doctorGender = '';
        doctor.doctorAvatar= '';
        doctor.doctorId = '';
    }
}

watch(display,  async (newVal) => {
    if (!newVal) {
        useCustomLoading().start({
            fullscreen: true,
            text: '加载中，请稍后'
        });
        await getDoctorList();
    }
});

async function getDoctorList() {
    const res = await $api.doctor.requestDoctorList();
    if (res.result !== '1') {
        ElMessage.error('获取医生列表失败');
        return;
    }
    tableData.value = res.data;
    await nextTick();
    useCustomLoading().end();
}

async function getDepartments() {
    const res = await $api.department.getDepartmentList();
    if (res.result !== '1') {
        console.log(res.message);
        return;
    }
    departmentList.value = res.data;
}

async function deleteDoctor() {
    let doctorNames = [];
    (multipleTableRef.value?.getSelectionRows() ?? []).forEach(item => {
        doctorNames.push(item.id);
    })
    try {
        const res = await $api.doctor.deleteDoctor(doctorNames);
        if (res.result !== '1') {
            ElMessage.error(res.message);
            return;
        }
        ElMessage.success('删除成功');
        useCustomLoading().start({
            fullscreen: true,
            text: '加载中，请稍后'
        });
        await getDoctorList();
    } catch (e) {
        ElMessage.error(e);
    }
}

function getDepartmentId(departmentName) {
    for (let i = 0; i < departmentList.value.length; i++) {
        for (let j = 0; j < departmentList.value[i].children.length; j++) {
            if (departmentList.value[i].children[j].name === departmentName) {
                return departmentList.value[i].children[j].id;
            }
        }
    }
}

onMounted(async () => {
    await getDoctorList();
    await getDepartments();
})

</script>

<style scoped>
.button {
    margin-bottom: 10px;
}

.icon {
    margin-right: 6px;
}
</style>
