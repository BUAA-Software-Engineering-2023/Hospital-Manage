import department from "@/api/department.js";
import doctor from "@/api/doctor.js";
import schedule from "@/api/schedule.js";
import announcement from "@/api/announcement.js";

const api = {
    install(app) {
        app.provide('$api', {
            department, doctor, schedule, announcement
        });
    }
}

export default api;