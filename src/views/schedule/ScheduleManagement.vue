<template>
    <el-dialog v-model="props.display" :before-close="handleClose">
        <!--      use el-card to show doctor info-->
        <el-card>
            <el-row style="border-bottom: black">
                <el-col :span="4">
                    <el-avatar :size="100" :src="props.doctor.doctorAvatar"></el-avatar>
                </el-col>
                <el-col :span="20" style="margin-top: 40px">
                    <el-row>
                        <el-col :span="8" :offset="4">
                            <el-form-item label="姓名">
                                <el-input v-model="props.doctor.doctorName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="4">
                            <el-form-item label="科室">
                                <el-input v-model="props.doctor.doctorDepartment" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-divider/>
            <!--            //show doctor schedule with el-tag-->
            <el-row>
                <el-form-item label="排班">
                    <el-tag v-for="schedule in props.doctor.doctorSchedule" :key="schedule" class="tagStyle">
                        {{ schedule }}
                    </el-tag>
                </el-form-item>
            </el-row>
            <el-divider/>
            <el-form-item label="选择排班">
                <el-select v-model="props.doctor.doctorSchedule" multiple placeholder="请选择排班" size="large"
                           style="width: 500px" collapse-tags collapse-tags-tooltip :max-collapse-tags="3">
                    <el-option v-for="item in scheduleList" :key="item.scheduleId" :label="item.scheduleTime"
                               :value="item.scheduleTime"></el-option>
                </el-select>
            </el-form-item>
            <el-row>
                <el-col :span="2" :offset="22">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-col>
            </el-row>
        </el-card>
    </el-dialog>
</template>

<script setup>
import {onMounted, reactive} from "vue";

const props = defineProps(['display', 'doctor']);
const emit = defineEmits(['close']);

const scheduleList = reactive([
])

const handleClose = (done) => {
    emit('close', false)
    done();
}

const onSubmit = () => {
    emit('close',false)
    console.log(props.doctor.doctorSchedule)
}

function formatDate(today, yyyymmdd) {
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let date = today.getDate();
    if (date < 10) {
        date = '0' + date;
    }
    return yyyymmdd.replace('YYYY', year).replace('MM', month).replace('DD', date);
}

onMounted(() => {
    const timeElapsed = Date.now();
    let scheduleTime = '';
    for (let i = 0; i < 14; i++) {
        //use loop to get 14 days
        const today = new Date(timeElapsed + i / 2 * 24 * 60 * 60 * 1000);
        if (i % 2) {
            //if i is odd, then it is morning
            scheduleTime = formatDate(today, 'YYYY-MM-DD') + ' 09:00:00';
        } else {
            //if i is even, then it is afternoon
            scheduleTime = formatDate(today, 'YYYY-MM-DD') + ' 14:00:00';
        }
        scheduleList.push({
            scheduleId: i,
            scheduleTime: scheduleTime
        })
    }
})

</script>

<style scoped>
.tagStyle {
    margin: 5px;
}
</style>