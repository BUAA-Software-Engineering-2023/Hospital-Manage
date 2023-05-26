<template>
    <div class="container">
        <el-header>
            <el-row>
                <el-col :span="4">
                    <el-icon size="30">
                        <Notification/>
                    </el-icon>
                    <span style="margin-left: 5px"><strong>编辑公告</strong></span>
                </el-col>
                <el-col :span="4" :offset="10">
                    <el-button type="primary" @click="publish">发布</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-input placeholder="请输入标题" v-model="title" style="margin-top: 10px;margin-bottom: 10px"/>
        <el-upload
                v-model:file-list="fileList"
                action="/api/uploadImage"
                class="upload-demo"
                name="image"
                list-type="picture"
                accept="image/*"
                :on-success="storeImage"
                :limit="1"
                ref="imageUploader"
        >
            <el-button type="primary">Click to upload</el-button>
        </el-upload>
        <div style="border: 1px solid #ccc ">
            <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    mode="default"
            />
            <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    mode="default"
                    @onCreated="handleCreated"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import {onBeforeUnmount, ref, shallowRef, watch, computed, inject} from 'vue';
import {Editor, Toolbar} from '@wangeditor/editor-for-vue';
import {Notification} from "@element-plus/icons-vue";
import type {UploadProps, UploadUserFile} from 'element-plus'
import {ElMessage} from "element-plus";

const $api = inject('$api');
const title = ref('');
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');
const toolbarConfig = {};
const editorConfig = {placeholder: '请输入内容...', MENU_CONF: {}};
const imageUrl = ref('');

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};

const fileList = ref<UploadUserFile[]>([])

const storeImage: UploadProps['onSuccess'] = (res, file, fileList) => {
    if (res.result !== '1') {
        ElMessage.error('上传失败');
        return;
    }
    ElMessage.success('上传成功');
    imageUrl.value = res.data.url;
}

editorConfig.MENU_CONF['uploadImage'] = {
    server: '/api/uploadImage',
    fieldName: 'image'
}

const imageUploader= ref<HTMLElement>()

async function publish() {
    const editor = editorRef.value;
    if (editor == null) return;
    const html = editor.getHtml();
    console.log(html);
    const res = await $api.announcement.pulishAnnoucement(imageUrl.value, html, title.value, '0');
    if (res.result !== '1') {
        ElMessage.error('发布失败');
        return;
    }
    ElMessage.success('发布成功');
    title.value = '';
    editor.setHtml('');
    imageUploader.value.clearFiles();
}
</script>
