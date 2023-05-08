<template>
    <el-dialog width="75%" v-model="props.display" :before-close="handleClose">
        <el-descriptions title="请假详情" :column="1" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon class="iconStyle">
                            <user />
                        </el-icon>
                        医生姓名
                    </div>
                </template>
                淳平大夫
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
                2023-5-4
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
                2023-5-5
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
                <el-tag>病假</el-tag>
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
                ASMRのｈsoなシチュエーションボイスが販売されました！！
                バイノーラル録音のボイスです！こちらは中国では初販売になります！
                https://shop.geekjack.net/collections/hanazono-serena/products/hanazono-serena-first-challenge-of-binaural-record-huh-situation-voice-voice-complete-set
            </el-descriptions-item>
        </el-descriptions>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="this.$emit('close',false)">取消</el-button>
                    <el-button type="primary" @click="this.$emit('close',false)">
                      批准请求
                    </el-button>
                </span>
        </template>
    </el-dialog>
</template>


<script setup>
import {Calendar, Tickets, User} from "@element-plus/icons-vue";

const emit = defineEmits(['close']);
const props = defineProps(['display']);

const handleClose = (done) => {
    emit('close',false)
    done();
}

</script>

<style scoped>
.cell-item {
    display: flex;
    align-items: center;
    width: 120px;
}

.iconStyle {
    margin-right: 6px;
}
</style>