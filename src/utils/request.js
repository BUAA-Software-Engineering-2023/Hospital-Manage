import axios from 'axios'
import router from "@/router/index.js";
import {ElMessage} from "element-plus";
import {clearToken} from "../utils/token.js";

const requests = axios.create({
    baseURL: 'http://azure.pesenteur.eu.org:5555/api',
    timeout: 5000
});

requests.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem('TOKEN');
    return config;
});

requests.interceptors.response.use(response => response.data, error => {
    console.log(error)
    if (error.code === 'ECONNABORTED') {
        ElMessage({
            message: '请求超时',
            type: 'error'
        });
    } else if (error.code === 'ERR_NETWORK') {
        ElMessage({
            message: '网络错误',
            type: 'error'
        });
    } else if (error.response && error.response.status === 401) {
        localStorage.removeItem('ms_username');
        clearToken();
        router.push('/login').then();
        ElMessage({
            message: 'token失效，请重新登录',
            type: 'error'
        });
    }
    return error.response.data;
});

export default requests;