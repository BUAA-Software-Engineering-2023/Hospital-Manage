import department from "@/api/department.js";
import doctor from "@/api/doctor.js";

const api = {
    install(app) {
        app.provide('$api', {
            department, doctor
        });
    }
}

export default api;