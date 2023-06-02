import requests from "@/utils/request";

export default {
    adminLogin(username, password){
        return requests({
            url: '/adminLogin',
            method: 'POST',
            data: {
                username, password
            }
        });
    },
    getAdminInfo(){
        return requests({
            url: '/adminIntroduction',
            method: 'GET',
            params: {
                user_name: localStorage.getItem('ms_username')
            }
        });
    },
}