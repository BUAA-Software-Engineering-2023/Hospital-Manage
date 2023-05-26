<template>
    <el-dialog width="75%" v-model="display">
        <el-card>
            <el-row>
                <el-col :span="4">
                    <div class="info-image" @click="showDialog">
                        <el-avatar :size="100" :src="doctor.doctorAvatar"/>
                        <span class="info-edit">
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
                <el-button type="primary" @click="onSubmit">{{func}}</el-button>
                <el-button @click="display=false">取消</el-button>
            </el-form-item>
        </el-card>
    </el-dialog>
    <el-dialog title="裁剪图片" v-model="dialogVisible" width="600px">
        <vue-cropper
                ref="cropper"
                :src="imgSrc"
                :ready="cropImage"
                :zoom="cropImage"
                :cropmove="cropImage"
                :viewMode="1"
                :aspectRatio="1"
                v-if="imgSrc"
                style="width: 100%; height: 400px"
        ></vue-cropper>

        <template #footer>
				<span class="dialog-footer">
					<el-button class="crop-demo-btn" type="primary"
          >选择图片
						<input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
					</el-button>
					<el-button type="primary" @click="saveAvatar">上传并保存</el-button>
				</span>
        </template>
    </el-dialog>
</template>


<script setup>

import {ElMessage} from "element-plus";

const props = defineProps(['modelValue', 'doctor']);
const emit = defineEmits(['update:modelValue', 'update:doctor']);
const $api = inject('$api');

import {computed, inject, onMounted, ref} from 'vue'
import {Camera} from "@element-plus/icons-vue";
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
        console.log(doctor.value);
        const res = await $api.doctor.addDoctor(doctor.value.doctorName, doctor.value.doctorDesc, doctor.value.doctorDepartment, doctor.value.doctorPhone, doctor.value.doctorGender);
        if (res.result !== '1') {
            ElMessage.error(res.message);
            return;
        }
        const formData = new FormData();
        formData.append('doctor_image', dataURLtoFile(doctor.value.doctorAvatar, 'avatar.png'));
        // formData.append('doctor_image', imgSrc.value);
        await axios.post(`/api/doctorImage/${res.doctor_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token')
            }
        }).catch(err => {
            console.log(err);
        })
        ElMessage.success('添加成功');
    } else {
        const res = await $api.doctor.updateDoctor(doctor.value.doctorId, doctor.value.doctorName, doctor.value.doctorDesc, doctor.value.doctorDepartment, doctor.value.doctorPhone, doctor.value.doctorGender);
        if (res.result !== '1') {
            ElMessage.error(res.message);
            return;
        }
        const formData = new FormData();
        formData.append('doctor_image', dataURLtoFile(doctor.value.doctorAvatar, 'avatar.png'));
        // formData.append('doctor_image', imgSrc.value);
        await axios.post(`/api/doctorImage/${doctor.value.doctorId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token')
            }
        }).catch(err => {
            console.log(err);
        })
        ElMessage.success('修改成功');
    }

    display.value = false;
    imgSrc.value = '';
    cropImg.value = '';
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

const imgSrc = ref('');
const cropImg = ref('');
const dialogVisible = ref(false);
const cropper = ref();

const showDialog = () => {
    dialogVisible.value = true;
    // imgSrc.value = doctor.value.doctorAvatar;
    imgSrc.value = '';
};

const setImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes('image/')) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        dialogVisible.value = true;
        imgSrc.value = event.target.result;
        cropper.value && cropper.value.replace(event.target.result);
    };
    reader.readAsDataURL(file);
};

const cropImage = () => {
    cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
};

const saveAvatar = () => {
    doctor.value.doctorAvatar = cropImg.value;
    dialogVisible.value = false;
};

function dataURLtoFile(dataUrl, fileName){
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type:mime});
}

</script>

<style scoped>
.info-image {
    position: relative;
    margin: auto;
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 50px;
    overflow: hidden;
}

.info-edit {
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

.info-edit {
    color: #eee;
    font-size: 25px;
}

.info-image:hover .info-edit {
    opacity: 1;
}

.crop-demo-btn {
    position: relative;
}

.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>