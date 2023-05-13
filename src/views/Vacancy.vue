<template>
    <div class="container">
        <el-select v-model="value" placeholder="请选择..." style="margin-bottom: 5px">
            <el-option
                    v-for="item in weekday"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            />
        </el-select>
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
import {ref} from 'vue'

const value = ref()
const weekday = [
    {value: 1, label: '星期一'},
    {value: 2, label: '星期二'},
    {value: 3, label: '星期三'},
    {value: 4, label: '星期四'},
    {value: 5, label: '星期五'},
    {value: 6, label: '星期六'},
    {value: 7, label: '星期日'},
]
const tableData1 = [
    {
        date: '08:00-08:30',
        amount: 10,
    },
    {
        date: '08:30-09:00',
        amount: 10,
    },
    {
        date: '09:00-09:30',
        amount: 10,
    },
    {
        date: '09:30-10:00',
        amount: 10,
    },
    {
        date: '10:00-10:30',
        amount: 10,
    },
    {
        date: '10:30-11:00',
        amount: 10,
    },
]
const tableData2 = [
    {
        date: '14:00-14:30',
        amount: 10,
    },
    {
        date: '14:30-15:00',
        amount: 10,
    },
    {
        date: '15:00-15:30',
        amount: 10,
    },
    {
        date: '15:30-16:00',
        amount: 10,
    },
    {
        date: '16:00-16:30',
        amount: 10,
    },
    {
        date: '16:30-17:00',
        amount: 10,
    },
]
</script>

<style></style>
