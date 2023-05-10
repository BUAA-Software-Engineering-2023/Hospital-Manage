<template>
    <el-dialog width="75%" v-model="props.display" :before-close="handleClose">
        <el-form :model="form" label-width="120px">
            <el-form-item label="医生名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="所属科室">
                <el-cascader
                    v-model="form.region"
                    :options="options"
                    :props="properties"
                    @change="handleChange"
                />
            </el-form-item>
            <el-form-item label="医生介绍">
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

const properties = {
    expandTrigger: 'hover',
    label: 'value'
}

const handleChange = (value) => {
    console.log(value)
}

const onSubmit = () => {
    emit('close',false)
    console.log('submit!')
}

const options = [{
    value: '内科',
    children: [{
        value: '消化内科'
    }, {
        value: '呼吸内科'
    }]
}, {
    value: '外科',
    children: [{
        value: '骨科'
    }, {
        value: '神经外科'
    }]
}];

</script>

<style scoped>

</style>