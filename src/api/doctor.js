import requests from "@/utils/request";

export default {
    requestDoctorList(keyWord) {
        return requests({
            url: '/doctorList',
            method: 'GET',
            params: {
                keyWord: keyWord || undefined
            }
        });
    },
    addDoctor(doctor_name, doctor_introduction, doctor_dp_id, doctor_phone, doctor_gender) {
        return requests({
            url: '/doctorManage',
            method: 'POST',
            data: {
                doctor_name, doctor_introduction, doctor_dp_id, doctor_phone, doctor_gender
            }
        });
    },
    deleteDoctor(doctor_ids) {
        return requests({
            url: '/doctorManage',
            method: 'DELETE',
            data: {
                doctor_ids
            }
        });
    },
    updateDoctor(doctor_id, doctor_name, doctor_introduction, doctor_dp_id, doctor_phone, doctor_gender) {
        return requests({
            url: '/doctorManage',
            method: 'PUT',
            data: {
                doctor_id, doctor_name, doctor_introduction, doctor_dp_id, doctor_phone, doctor_gender
            }
        });
    },
}