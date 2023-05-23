<template>
    <div class="container">
        <el-button type="primary" @click="showDepartmentDetail(undefined)" class="button">
            <el-icon class="icon">
                <Plus/>
            </el-icon>
            添加
        </el-button>
        <el-button type="danger" @click="deleteDepartment" class="button">
            <el-icon class="icon">
                <DeleteFilled/>
            </el-icon>
            删除
        </el-button>
        <el-table
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%"
                row-key="id"
                :default-expand-all="false"
                @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"/>
            <el-table-column prop="name" label="名称" width="180"/>
            <el-table-column prop="description" label="介绍" show-overflow-tooltip/>
            <el-table-column align="right" width="100">
                <template #default="scope">
                    <el-button type="primary" @click="showDepartmentDetail(scope.row)">
                        编辑信息
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <department-detail v-model="display" :department-data="department" :editable="editable"/>
    </div>
</template>

<script setup lang="ts">

import {inject, onMounted, ref, watch} from "vue";
import {DeleteFilled, Plus} from "@element-plus/icons-vue";
import DepartmentDetail from "./DepartmentDetail.vue";
import {ElMessage, ElTable} from "element-plus";

const $api = inject('$api');

const display = ref(false);
const editable = ref(false);
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const departmentTypeNum = ref(0)
const department = ref({
    id: 0,
    name: '',
    description: '',
    region: '',
})

async function deleteDepartment() {
    let departmentNames = [];
    (multipleTableRef.value?.getSelectionRows() ?? []).forEach(item => {
        if (item.id > departmentTypeNum.value) {
            departmentNames.push(item.name);
        }
    })
    try {
        const res = await $api.department.deleteDepartment(departmentNames);
        if (res.result != '1') {
            ElMessage.error(res.message);
            return;
        }
        ElMessage.success('删除成功');
        await getDepartmentList();
    } catch (e) {
        ElMessage.error(e);
    }
}

function showDepartmentDetail(row: User) {
    display.value = true;
    department.value= row;
    if (row) {
        editable.value = row.id <= departmentTypeNum.value;
    }else {
        editable.value = false;
    }
    // console.log(row);
}

const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
    // console.log(multipleSelection.value)
}

interface User {
    id: number
    name: string
    description: string
    region: string
    hasChildren?: boolean
    children?: User[]
}

const tableData = ref<User[]>([])

async function getDepartmentList() {
    const res = await $api.department.getDepartmentList();
    if (res.result != '1') {
        ElMessage.error('获取科室列表失败');
        return;
    }
    departmentTypeNum.value = res.data.length;
    console.log(res)
    let result: User[] = [];
    let i: number = 0;
    let j: number = departmentTypeNum.value;
    res.data.forEach((item: any) => {
        let children: User[] = [];
        i++;
        item.children.forEach((child: any) => {
            j++;
            let department: User = {
                id: 0,
                name: '',
                description: '',
                region: item.name,
            };
            department.id = j;
            department.name = child.name;
            department.description = child.introduction;
            children.push(department);
        })
        result.push({
            id: i,
            name: item.name,
            description: '',
            region: '',
            children: children,
        })
    })
    console.log(result)
    tableData.value = result;
}

watch(display, async (newVal) => {
    if (!newVal) {
         await getDepartmentList();
    }
})

onMounted(async () => {
    await getDepartmentList();
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
