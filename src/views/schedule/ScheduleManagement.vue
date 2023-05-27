<template>
    <el-dialog v-model="display">
        <!--      use el-card to show doctor info-->
        <el-card>
            <el-row style="border-bottom: black">
                <el-col :span="4">
                    <el-avatar :size="100" :src="doctor.doctorAvatar"></el-avatar>
                </el-col>
                <el-col :span="20" style="margin-top: 40px">
                    <el-row>
                        <el-col :span="8" :offset="4">
                            <el-form-item label="姓名">
                                <el-input v-model="doctor.doctorName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="4">
                            <el-form-item label="科室">
                                <el-input v-model="doctor.doctorDepartment" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-divider/>
            <!--            //show doctor schedule with el-tag-->
            <el-row>
                <el-form-item label="排班">
                    <el-tag v-for="schedule in doctor.doctorSchedule" :key="schedule" class="tagStyle">
                        {{ schedule }}
                    </el-tag>
                </el-form-item>
            </el-row>
            <el-divider/>
            <el-form-item label="选择排班">
                <el-select v-model="doctor.doctorSchedule" multiple placeholder="请选择排班" size="large"
                           style="width: 500px" collapse-tags collapse-tags-tooltip :max-collapse-tags="3">
                    <el-option v-for="item in scheduleList" :key="item.scheduleId" :label="item.scheduleTime"
                               :value="item.scheduleTime"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="display=false">取消</el-button>
            </el-form-item>
        </el-card>
    </el-dialog>
</template>

<script setup>
import {computed, inject, onMounted, reactive} from "vue";
import {ElMessage} from "element-plus";

const props = defineProps(['modelValue', 'doctor']);
const emit = defineEmits(['update:modelValue', 'update:doctor']);

const scheduleList = reactive([]);
const $api = inject('$api');

const display = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

const doctor = computed({
    get() {
        return props.doctor;
    },
    set(value) {
        emit('update:doctor', value);
    }
});

const onSubmit = async () => {
    let is_mornings = [];
    let dates = [];
    for (let i = 0; i < doctor.value.doctorSchedule.length; i++) {
        let j = schedules.indexOf(doctor.value.doctorSchedule[i]);
        if (j % 2 === 0) {
            is_mornings.push(1);
        } else {
            is_mornings.push(0);
        }
        dates.push(j / 2 + 1);
    }
    const res = await $api.schedule.updateSchedule(doctor.value.doctorId, is_mornings, dates);
    console.log(res.result);
    if (res.result !== '1') {
        ElMessage.error(res.message);
        display.value = false;
        return;
    }
    ElMessage.success(res.message);
    display.value = false;
}

const schedules = ['周一上午', '周一下午', '周二上午', '周二下午', '周三上午', '周三下午', '周四上午', '周四下午', '周五上午', '周五下午', '周六上午', '周六下午', '周日上午', '周日下午']

onMounted(() => {
    for (let i = 0; i < 14; i++) {
        scheduleList.push({
            scheduleId: i,
            scheduleTime: schedules[i]
        })
    }
})

</script>

<style scoped>
.tagStyle {
    margin: 5px;
}
</style>