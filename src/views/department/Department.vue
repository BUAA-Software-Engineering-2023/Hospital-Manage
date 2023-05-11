<template>
    <div class="container">
        <el-button type="primary" @click="showDialog" class="button">
            <el-icon class="icon"><Plus /></el-icon>添加
        </el-button>
        <el-button type="danger" @click="" class="button">
            <el-icon class="icon"><DeleteFilled /></el-icon>删除
        </el-button>
        <el-table
            :data="tableData"
            style="width: 100%"
            row-key="id"
            :default-expand-all="false"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="名称" width="180"/>
            <el-table-column prop="description" label="介绍" show-overflow-tooltip/>
            <el-table-column align="right" width="100">
                <el-button type="primary" @click="showDialog">
                    编辑信息
                </el-button>
            </el-table-column>
        </el-table>
        <department-detail :display="dialogVisible" @close="closeDialog"/>
    </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {DeleteFilled, Plus} from "@element-plus/icons-vue";
import DepartmentDetail from "./DepartmentDetail.vue";

const dialogVisible = ref(false)

function showDialog() {
    dialogVisible.value = true;
}

function closeDialog() {
    dialogVisible.value = false;
}
interface User {
    id: number
    name: string
    description: string
    hasChildren?: boolean
    children?: User[]
}

const tableData: User[] = [
    {
        id:1,
        name:'内科',
        description:'Internal medicine or general internal medicine (in Commonwealth nations) is the medical specialty dealing with the prevention, diagnosis, and treatment of internal diseases. ',
        children:[
            {
                id:11,
                name:'消化内科',
                description:'消化内科是研究食管、胃、小肠、大肠、肝、胆及胰腺等疾病为主要内容的临床三级学科。'
            },
            {
                id:12,
                name:'呼吸内科',
                description:'主要是治疗呼吸系统疾病的科室，呼吸系统包括呼吸道 (鼻腔、咽、喉、气管、支气管)和肺。'
            }
        ]
    },
    {
        id:2,
        name:'外科',
        description:'外科是研究外科疾病的发生、发展规律及其临床表现，诊断、预防和治疗的科学，是以手术切除、修补为主要治病手段的专业科室。',
        children:[
            {
                id:21,
                name:'骨科',
                description:'主要研究骨骼肌肉系统的解剖、生理与病理，运用药物、手术及物理方法保持和发展这一系统的正常形态与功能。'
            },
            {
                id:22,
                name:'神经外科',
                description:'是主治由于外伤导致的脑部、脊髓等神经系统的疾病，例如脑出血出血量危及生命,车祸致脑部外伤，或脑部有肿瘤压迫需手术治疗等。'
            }
        ]
    }
];
</script>

<style scoped>
.button{
    margin-bottom: 10px;
}
.icon{
    margin-right: 6px;
}
</style>
