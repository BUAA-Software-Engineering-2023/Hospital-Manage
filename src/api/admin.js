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
    }
}