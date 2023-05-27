import department from "@/api/department.js";
import doctor from "@/api/doctor.js";
import schedule from "@/api/schedule.js";
import announcement from "@/api/announcement.js";
import vacancy from "@/api/vacancy.js";
import leave from "@/api/leave.js";

const api = {
    install(app) {
        app.provide('$api', {
            department, doctor, schedule, announcement, vacancy, leave
        });
    }
}

export default api;