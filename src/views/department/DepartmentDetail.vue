<template>
    <el-dialog width="75%" v-model="props.display" :before-close="handleClose">
        <el-form :model="form" label-width="120px">
            <el-form-item label="科室名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="科室类别">
                <el-select v-model="form.region" placeholder="选择一级科室类别">
                    <el-option label="内科" value="1" />
                    <el-option label="外科" value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="科室介绍">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button @click="this.$emit('close',false)">Cancel</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>


<script setup>

const emit = defineEmits(['close']);
const props = defineProps(['display']);

const handleClose = (done) => {
    emit('close',false)
    done();
}

import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    name: '',
    region: '',
    desc: '',
})

const onSubmit = () => {
    emit('close',false)
    console.log('submit!')
}

</script>

<style scoped>

</style>