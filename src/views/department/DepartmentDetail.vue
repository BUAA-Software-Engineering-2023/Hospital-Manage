<template>
    <el-dialog width="75%" v-model="display">
        <el-form :model="form" label-width="120px">
            <el-form-item label="科室名称">
                <el-input v-model="form.name" :disabled="props.editable"/>
            </el-form-item>
            <el-form-item label="科室类别">
                <el-select v-model="form.region" placeholder="选择一级科室类别" :disabled="props.editable">
                    <el-option value="内科"/>
                    <el-option value="外科"/>
                    <el-option value="妇科"/>
                    <el-option value="儿科"/>
                    <el-option value="传染病"/>
                    <el-option value="五官科"/>
                    <el-option value="中医科"/>
                    <el-option value="检验科"/>
                    <el-option value="放射科"/>
                    <el-option value="超声科"/>
                    <el-option value="胃镜室"/>
                    <el-option value="药剂科"/>
                    <el-option value="行政科室"/>
                </el-select>
            </el-form-item>
            <el-form-item label="科室介绍">
                <el-input v-model="form.description" type="textarea" :disabled="props.editable"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-if="!props.editable">{{ func }}</el-button>
                <el-button @click="display=false" v-if="!props.editable">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>


<script setup>

import {ElMessage} from "element-plus";

const props = defineProps(['modelValue', 'departmentData', 'editable']);
const emit = defineEmits(['update:modelValue', 'update:departmentData']);

import {computed, inject, reactive} from 'vue';

const $api = inject('$api');

const func = computed(() => {
    if (props.departmentData) {
        return '修改';
    } else {
        return '创建';
    }
})

const display = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

const data = reactive({
    name: '',
    region: '',
    description: ''
})

const form = computed({
    get() {
        if (!props.departmentData) {
            return data;
        }
        return props.departmentData;
    },
    set(value) {
        emit('update:departmentData', value);
    }
})

const onSubmit = async () => {
    if (props.departmentData) {
        if (form.value.name === '') {
            ElMessage.error('科室名称不能为空');
            return;
        }
        if (form.value.region === '') {
            ElMessage.error('科室类别不能为空');
            return;
        }
        if (form.value.description === '') {
            ElMessage.error('科室介绍不能为空');
            return;
        }
        await $api.department.updateDepartment(form.value.name, form.value.region, form.value.description).then(res => {
            if (res.result === '1') {
                ElMessage.success('修改成功');
                display.value = false;
            } else {
                ElMessage.error(res.message);
                console.log(res);
            }
        })
    } else {
        if (form.value.name === '') {
            ElMessage.error('科室名称不能为空');
            return;
        }
        if (form.value.region === '') {
            ElMessage.error('科室类别不能为空');
            return;
        }
        if (form.value.description === '') {
            ElMessage.error('科室介绍不能为空');
            return;
        }
        await $api.department.addDepartment(form.value.name, form.value.region, form.value.description).then(res => {
            if (res.result === '1') {
                ElMessage.success('创建成功');
                display.value = false;
            } else {
                ElMessage.error(res.message);
                console.log(res);
            }
        })
    }
    if (!props.departmentData) {
        data.name = '';
        data.region = '';
        data.description = '';
    }
    display.value = false;
}

</script>

<style scoped>

</style>