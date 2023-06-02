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
    updateAdminInfo(introduction, image){
        return requests({
            url: '/adminIntroduction',
            method: 'POST',
            data: {
                user_name: localStorage.getItem('ms_username'),
                introduction, image
            }
        });
    },
    changeAdminPassword(old_password, new_password){
        return requests({
            url: '/changeAdminPasswd',
            method: 'POST',
            data: {
                user_name: localStorage.getItem('ms_username'),
                old_password, new_password
            }
        });
    },
}