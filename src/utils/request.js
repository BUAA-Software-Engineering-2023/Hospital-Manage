import axios from 'axios'
import router from "@/router/index.js";
import {ElMessage} from "element-plus";
import {clearToken} from "../utils/token.js";

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});

requests.interceptors.request.use(config=>{
    config.headers['Authorization'] = localStorage.getItem('TOKEN');
    return config;
});

requests.interceptors.response.use(response=>response.data, error => {
    if (error.response.status === 401) {
        localStorage.removeItem('ms_username');
        clearToken();
        router.push('/login').then();
        ElMessage({
            message: 'token失效，请重新登录',
            type: 'error'
        });
    } else {
        ElMessage({
            message: '请检查网络连接',
            type: 'error'
        });
    }
    return error.response.data;
});

export default requests;