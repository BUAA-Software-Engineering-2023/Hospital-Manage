import {defineStore} from "pinia";
import adminApi from "@/api/admin.js";
import {getToken, setToken} from "@/utils/token";

const state = ()=>{
    return {
        token: getToken(),
        adminInfo: {}
    }
}

const actions = {
    async adminLogin(username, password) {
        const result = await adminApi.adminLogin(username, password);
        if (result.result === '1') {
            this.token = result.data.token;
            // console.log(this.token);
            setToken(result.data.token);
            return "登录成功";
        }
        return Promise.reject(result.message);
    }
}

const getters = {

}

export const useAccountStore= defineStore("account", {
    state,
    actions,
    getters
})