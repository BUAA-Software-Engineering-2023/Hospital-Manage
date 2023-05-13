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
                    <el-button type="primary" @click="">发布</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-input placeholder="请输入标题" v-model="title" style="margin-top: 10px;margin-bottom: 10px"/>
        <div style="border: 1px solid #ccc ">
            <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
            />
            <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
            />
        </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Notification} from "@element-plus/icons-vue";


export default {
    components: {Notification, Editor, Toolbar},
    computed: {
        initContent() {
            return '<h1>' + this.title + '</h1>'
        }
    },
    watch: {
        title(newValue, oldValue) {
            if (oldValue === '') {
                this.valueHtml = this.initContent
            } else {
                this.valueHtml = this.valueHtml.replace(oldValue, newValue)
            }
        }
    },
    setup() {
        const title = ref('')
        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()

        // 内容 HTML
        const valueHtml = ref('')

        // 模拟 ajax 异步获取内容
        // onMounted(() => {
        // 	setTimeout(() => {
        // 		valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        // 	}, 1500)
        // })

        const toolbarConfig = {}
        const editorConfig = {placeholder: '请输入内容...',}

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })

        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }

        return {
            title,
            editorRef,
            valueHtml,
            mode: 'default', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated
        };
    }
}
</script>
