<template>
    <el-dialog width="75%" v-model="display">
        <el-card>
            <el-row>
                <el-col :span="4">
                    <div class="avatar" @click="showDialog">
                        <el-avatar :size="100" :src="doctor.doctorAvatar"/>
                        <span class="avatar-edit">
								        <el-icon><Camera/></el-icon>
							      </span>
                    </div>
                </el-col>
                <el-col :span="20" style="margin-top: 40px">
                    <el-row>
                        <el-col :span="8" :offset="4">
                            <el-form-item label="姓名">
                                <el-input v-model="doctor.doctorName"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="4">
                            <el-form-item label="性别">
                                <el-select v-model="doctor.doctorGender">
                                    <el-option value="男"></el-option>
                                    <el-option value="女"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-divider/>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属科室">
                        <el-cascader
                                v-model="doctor.doctorDepartment"
                                :options="options"
                                :props="properties"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话">
                        <el-input v-model="doctor.doctorPhone"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider/>
            <el-form-item label="医生介绍">
                <el-input v-model="doctor.doctorDesc" type="textarea"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{ func }}</el-button>
                <el-button @click="display=false">取消</el-button>
            </el-form-item>
        </el-card>
    </el-dialog>
    <el-dialog title="裁剪图片" v-model="dialogVisible" width="600px">
        <vue-cropper
                ref="cropper"
                :ready="cropImage"
                :zoom="cropImage"
                :cropmove="cropImage"
                :viewMode="1"
                :aspectRatio="1"
                :crop="cropImage"
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
</template>


<script setup>

import {ElMessage} from "element-plus";

const props = defineProps(['modelValue', 'doctor']);
const emit = defineEmits(['update:modelValue', 'update:doctor']);
const $api = inject('$api');
const selected = ref();
let imageFile;

import {computed, inject, onMounted, ref} from 'vue'
import {Camera, UploadFilled} from "@element-plus/icons-vue";
import VueCropper from "vue-cropperjs";
import 'cropperjs/dist/cropper.css';
import axios from "axios";

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

const func = computed(() => {
    if (props.doctor.doctorId !== '') {
        return '修改';
    } else {
        return '创建';
    }
})

const properties = {
    expandTrigger: 'hover',
    label: 'name',
    value: 'id',
    emitPath: false,
}

const onSubmit = async () => {
    if (doctor.value.doctorId === '') {
        if (doctor.value.doctorName === '') {
            ElMessage.error('姓名不能为空');
            return;
        }
        if (doctor.value.doctorDepartment === '') {
            ElMessage.error('科室不能为空');
            return;
        }
        if (doctor.value.doctorPhone === '') {
            ElMessage.error('电话不能为空');
            return;
        }
        if (doctor.value.doctorGender === '') {
            ElMessage.error('性别不能为空');
            return;
        }
        if (doctor.value.doctorAvatar === '') {
            ElMessage.error('头像不能为空');
            return;
        }
        if (doctor.value.doctorDesc === '') {
            ElMessage.error('医生介绍不能为空');
            return;
        }
        //如果电话号码不仅包含数字或者长度不是11位
        if (!/^\d+$/.test(doctor.value.doctorPhone) || doctor.value.doctorPhone.length !== 11) {
            ElMessage.error('电话号码格式不正确');
            return;
        }
        console.log(doctor.value);
        const res = await $api.doctor.addDoctor(doctor.value.doctorName, doctor.value.doctorDesc, doctor.value.doctorDepartment, doctor.value.doctorPhone, doctor.value.doctorGender, doctor.value.doctorAvatar);
        if (res.result !== '1') {
            ElMessage.error(res.message);
            return;
        }
        ElMessage.success('添加成功');
    } else {
        if (doctor.value.doctorName === '') {
            ElMessage.error('姓名不能为空');
            return;
        }
        if (doctor.value.doctorDepartment === '') {
            ElMessage.error('科室不能为空');
            return;
        }
        if (doctor.value.doctorPhone === '') {
            ElMessage.error('电话不能为空');
            return;
        }
        if (doctor.value.doctorGender === '') {
            ElMessage.error('性别不能为空');
            return;
        }
        if (doctor.value.doctorAvatar === '') {
            ElMessage.error('头像不能为空');
            return;
        }
        if (doctor.value.doctorDesc === '') {
            ElMessage.error('医生介绍不能为空');
            return;
        }
        //如果电话号码不仅包含数字或者长度不是11位
        if (!/^\d+$/.test(doctor.value.doctorPhone) || doctor.value.doctorPhone.length !== 11) {
            ElMessage.error('电话号码格式不正确');
            return;
        }
        const res = await $api.doctor.updateDoctor(doctor.value.doctorId, doctor.value.doctorName, doctor.value.doctorDesc, doctor.value.doctorDepartment, doctor.value.doctorPhone, doctor.value.doctorGender, doctor.value.doctorAvatar);
        if (res.result !== '1') {
            ElMessage.error(res.message);
            return;
        }
        ElMessage.success('修改成功');
    }
    display.value = false;
}

const options = ref([]);

const getOptions = async () => {
    const res = await $api.department.getDepartmentList();
    if (res.result !== '1') {
        console.log(res.message);
        return;
    }
    options.value = res.data;
    console.log(options.value);
};

onMounted(() => {
    getOptions();
})

const dialogVisible = ref(false);
const cropper = ref();

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
        doctor.value.doctorAvatar = result.data.data.url;
    } catch (e) {
        ElMessage.error('图片上传失败');
    }
    dialogVisible.value = false;
};

</script>

<style scoped>
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