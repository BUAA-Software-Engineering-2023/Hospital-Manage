<template>
    <el-dialog width="75%" v-model="display">
        <el-descriptions title="请假详情" :column="3" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon class="iconStyle">
                            <user />
                        </el-icon>
                        医生姓名
                    </div>
                </template>
                {{leave.doctor_name}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon class="iconStyle">
                            <calendar />
                        </el-icon>
                        请假开始日期
                    </div>
                </template>
                {{leave.start_time}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon class="iconStyle">
                            <calendar />
                        </el-icon>
                        请假结束日期
                    </div>
                </template>
                {{leave.end_time}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon class="iconStyle">
                            <tickets />
                        </el-icon>
                        请假类别
                    </div>
                </template>
                <el-tag>{{leave.type}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon class="iconStyle">
                            <tickets />
                        </el-icon>
                        请假原因
                    </div>
                </template>
                {{leave.reason}}
            </el-descriptions-item>
        </el-descriptions>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="display=false">取消</el-button>
                    <el-button type="primary" @click="approveLeave">
                      批准请求
                    </el-button>
                    <el-button type="danger" @click="denyLeave">
                      拒绝请求
                    </el-button>
                </span>
        </template>
    </el-dialog>
</template>


<script setup>
import {Calendar, Tickets, User} from "@element-plus/icons-vue";
import {computed, inject} from "vue";
import {ElMessage} from "element-plus";

let $api = inject('$api');
const props = defineProps(['modelValue', 'leave']);
const emit = defineEmits(['update:modelValue', 'update:leave']);

const display = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

const leave = computed({
    get() {
        return props.leave;
    },
    set(value) {
        emit('update:leave', value);
    }
});

async function approveLeave() {
    const res = await $api.leave.approveLeave(leave.value.leave_id);
    if (res.result !== '1') {
        ElMessage.error('批准请假失败');
        return;
    }
    ElMessage.success(res.message);
    display.value = false;
}

async function denyLeave() {
    const res = await $api.leave.denyLeave(leave.value.leave_id);
    if (res.result !== '1') {
        ElMessage.error('拒绝请假失败');
        return;
    }
    ElMessage.success(res.message);
    display.value = false;
}
</script>

<style scoped>
.cell-item {
    align-items: center;
    width: 120px;
}

.iconStyle {
    margin-right: 6px;
}
</style>