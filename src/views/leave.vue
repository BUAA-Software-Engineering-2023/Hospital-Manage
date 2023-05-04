<template>
    <div class="container">
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column property="name" label="医生姓名" width="120"/>
            <el-table-column property="startDate" label="请假开始日期" width="120"/>
            <el-table-column property="endDate" label="请假结束日期" width="120"/>
            <el-table-column property="type" label="请假类别" width="120"/>
            <el-table-column align="right">
                <el-button type="primary" @click="dialogVisible = true">
                    处理请求
                </el-button>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" width="75%">
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
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                      批准请求
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Calendar, Tickets, User} from "@element-plus/icons-vue";

const tableData = ref([
    {
        name:'淳平大夫',
        startDate:'2023-5-4',
        endDate:'2023-5-5',
        type:'病假'
    },
    {
        name:'田所大夫',
        startDate:'2023-5-5',
        endDate:'2023-5-6',
        type:'事假'
    }
]);

const dialogVisible = ref(false)
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
