import requests from "@/utils/request";

export default {
    getVacancyList() {
        return requests({
            url: '/vacancySettingManage',
            method: 'GET'
        });
    },
    updateVancancy(vacancy_day, vacancy_counts) {
        return requests({
            url: '/vacancySettingManage',
            method: 'PUT',
            data: {
                vacancy_day, vacancy_counts
            }
        });
    }
}