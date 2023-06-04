<template>
    <div class="container">
        <el-select v-model="day" placeholder="请选择..." style="margin-bottom: 5px">
            <el-option
                    v-for="item in weekday"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            />
        </el-select>
        <el-button type="primary" class="buttonStyle" @click="updateVancancy">保存</el-button>
        <el-row>
            <el-col :span="12">
                <el-table :data="tableData1" style="width: 100%">
                    <el-table-column prop="date" label="时段" width="180"/>
                    <el-table-column label="放号数量" width="180" #default="scope">
                        <el-input-number v-model="scope.row.amount" :min="0" :max="10"/>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <el-table :data="tableData2" style="width: 100%">
                    <el-table-column prop="date" label="时段" width="180"/>
                    <el-table-column label="放号数量" width="180" #default="scope">
                        <el-input-number v-model="scope.row.amount" :min="0" :max="10"/>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import {inject, nextTick, onMounted, ref, watch} from 'vue'
import {ElMessage} from "element-plus";
import useCustomLoading from "../utils/loading.js";

const day = ref()
const $api = inject('$api');
const weekday = [
    {value: 1, label: '星期一'},
    {value: 2, label: '星期二'},
    {value: 3, label: '星期三'},
    {value: 4, label: '星期四'},
    {value: 5, label: '星期五'},
    {value: 6, label: '星期六'},
    {value: 7, label: '星期日'},
]
const tableData1 = ref([
    {
        date: '08:00-08:30',
        vacancy_time: 8.0,
        amount: 10,
    },
    {
        date: '08:30-09:00',
        vacancy_time: 8.5,
        amount: 10,
    },
    {
        date: '09:00-09:30',
        vacancy_time: 9.0,
        amount: 10,
    },
    {
        date: '09:30-10:00',
        vacancy_time: 9.5,
        amount: 10,
    },
    {
        date: '10:00-10:30',
        vacancy_time: 10.0,
        amount: 10,
    },
    {
        date: '10:30-11:00',
        vacancy_time: 10.5,
        amount: 10,
    },
]);
const tableData2 = ref([
    {
        date: '14:00-14:30',
        vacancy_time: 14,
        amount: 10,
    },
    {
        date: '14:30-15:00',
        vacancy_time: 14.5,
        amount: 10,
    },
    {
        date: '15:00-15:30',
        vacancy_time: 15,
        amount: 10,
    },
    {
        date: '15:30-16:00',
        vacancy_time: 15.5,
        amount: 10,
    },
    {
        date: '16:00-16:30',
        vacancy_time: 16,
        amount: 10,
    },
    {
        date: '16:30-17:00',
        vacancy_time: 16.5,
        amount: 10,
    },
]);

async function getVacancyList() {
    const res = await $api.vacancy.getVacancyList();
    if (res.result !== '1') {
        console.log('获取放号列表失败');
        return;
    }
    for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].vacancy_day === day.value) {
            if (Number(res.data[i].vacancy_time) < 14) {
                for (let j = 0; j < tableData1.value.length; j++) {
                    if (tableData1.value[j].vacancy_time === Number(res.data[i].vacancy_time)) {
                        tableData1.value[j].amount = res.data[i].vacancy_cnt;
                    }
                }
            } else {
                for (let j = 0; j < tableData2.value.length; j++) {
                    if (tableData2.value[j].vacancy_time === Number(res.data[i].vacancy_time)) {
                        tableData2.value[j].amount = res.data[i].vacancy_cnt;
                    }
                }
            }
        }
    }
    await nextTick();
    useCustomLoading().end();
}

async function updateVancancy() {
    const vacancy_counts = [];
    for (let i = 0; i < tableData1.value.length; i++) {
        vacancy_counts.push(tableData1.value[i].amount);
    }
    for (let i = 0; i < tableData2.value.length; i++) {
        vacancy_counts.push(tableData2.value[i].amount);
    }
    const res = await $api.vacancy.updateVancancy(day.value, vacancy_counts);
    if (res.result !== '1') {
        ElMessage.error('更新放号数量失败');
        return;
    }
    useCustomLoading().start({
        fullscreen: true,
        text: '加载中，请稍后'
    });
    await getVacancyList();
    ElMessage.success(res.message);
}

onMounted( () => {
    day.value = 1
    getVacancyList();
})

watch(day, async () => {
    useCustomLoading().start({
        fullscreen: true,
        text: '加载中，请稍后'
    });
    await getVacancyList();
})
</script>

<style scoped>
.buttonStyle{
    margin-left: 10px;
    margin-bottom: 5px;
}
</style>
