import requests from "@/utils/request";

export default {
    getScheduleList() {
        return requests({
            url: '/scheduleManage',
            method: 'GET'
        });
    },
    updateSchedule(doctor_id, is_mornings, dates) {
        return requests({
            url: '/scheduleManage',
            method: 'POST',
            data: {
                doctor_id, is_mornings, dates
            }
        })
    }
}