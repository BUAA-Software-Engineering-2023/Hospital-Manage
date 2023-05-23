import department from "@/api/department.js";

const api = {
    install(app) {
        app.provide('$api', {
            department
        });
    }
}

export default api;