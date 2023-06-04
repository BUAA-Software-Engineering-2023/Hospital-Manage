<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <template #header>
                        <div class="clearfix">
                            <span>基础信息</span>
                        </div>
                    </template>
                    <div>
                        <div class="avatar" @click="showDialog">
                            <el-avatar :size="100" :src="avatarImg"/>
                            <span class="avatar-edit">
								<el-icon><Camera/></el-icon>
							</span>
                        </div>
                        <div class="info">
                            <div class="info-name">{{ name }}</div>
                            <div class="info-desc">{{ form.desc }}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <template #header>
                        <div class="clearfix">
                            <span>账户编辑</span>
                        </div>
                    </template>
                    <el-form label-width="90px">
                        <el-form-item label="用户名："> {{ name }}</el-form-item>
                        <el-form-item label="旧密码：">
                            <el-input type="password" v-model="form.old"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：">
                            <el-input type="password" v-model="form.new"></el-input>
                        </el-form-item>
                        <el-form-item label="个人简介：">
                            <el-input v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="裁剪图片" v-model="dialogVisible" width="600px" align-center>
            <vue-cropper
                    ref="cropper"
                    :ready="cropImage"
                    :zoom="cropImage"
                    :cropmove="cropImage"
                    :crop="cropImage"
                    :viewMode="1"
                    :aspectRatio="1"
                    dragMode="move"
                    v-if="selected"
                    style="width: 100%; height: 400px; text-align: center"
            ></vue-cropper>
            <el-upload
                    drag
                    :on-change="setImage"
                    :auto-upload="false"
                    accept="image/*"
                    :show-file-list="false"
                    v-else
            >
                <el-icon class="el-icon--upload">
                    <upload-filled/>
                </el-icon>
                <div>
                    请选择一张图片
                </div>
            </el-upload>
            <template #footer>
                <el-button type="primary" @click="saveAvatar">上传并保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import {useAccountStore} from "@/stores/account.js";
import {Camera, UploadFilled} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const name = localStorage.getItem('ms_username');
const form = ref({
    old: '',
    new: '',
    desc: '',
});
const onSubmit = async () => {
    if (form.value.old !== '' || form.value.new !== '') {
        try {
            const res = await useAccountStore().changeAdminPassword(form.value.old, form.value.new);
            if (res !== '更新成功') {
                ElMessage.error(res);
                return;
            }
        } catch (e) {
            ElMessage.error(e);
            console.log(e)
            return;
        }
    }
    try {
        const res = await useAccountStore().updateAdminInfo(form.value.desc, avatarImg.value);
        if (res === '更新成功') {
            ElMessage.success(res);
        } else {
            ElMessage.error(res);
        }
    } catch (e) {
        ElMessage.error('更新失败');
    }
    location.reload();
};

const avatarImg = ref('');
const dialogVisible = ref(false);
const cropper = ref();
const selected = ref();
let imageFile;

const showDialog = () => {
    dialogVisible.value = true;
    selected.value = false;
};

const setImage = uploadFile => {
    const reader = new FileReader();
    reader.onload = (event) => {
        cropper.value && cropper.value.replace(event.target.result);
    };
    reader.readAsDataURL(uploadFile.raw);
    selected.value = true;
};

const cropImage = () => {
    cropper.value.getCroppedCanvas({
        width: 512,
        height: 512,
        imageSmoothingQuality: "high"
    }).toBlob(blob => imageFile = new File([blob], "avatar.png"));
};

const saveAvatar = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
        const result = await axios.post("http://azure.pesenteur.eu.org:5555/api/uploadImage", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('TOKEN')
            }
        });
        console.log(result);
        avatarImg.value = result.data.data.url;
    } catch (e) {
        ElMessage.error('图片上传失败');
    }
    dialogVisible.value = false;
};

onMounted(async () => {
    try {
        await useAccountStore().getAdminInfo();
        form.value.desc = useAccountStore().adminInfo.introduction;
        avatarImg.value = useAccountStore().adminInfo.image;
    } catch (e) {
        console.log(e);
    }
});
</script>

<style scoped>
.info {
    text-align: center;
    padding: 35px 0;
}

.info-name {
    margin: 15px 0 10px;
    font-size: 24px;
    font-weight: 500;
    color: #262626;
}

.avatar {
    text-align: center;
    margin: auto;
    position: relative;
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 50%;
    overflow: hidden;
}

.avatar-edit {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.avatar-edit i {
    color: #eee;
    font-size: 25px;
}

.avatar:hover .avatar-edit {
    opacity: 1;
}
</style>
