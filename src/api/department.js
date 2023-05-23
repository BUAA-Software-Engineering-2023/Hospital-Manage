import requests from "@/utils/request";

export default {
    getDepartmentList() {
        return requests({
            url: '/departmentList',
            method: 'GET'
        });
    },
    addDepartment(department_name, department_type, department_introduction) {
        return requests({
            url: '/departmentManage',
            method: 'POST',
            data: {
                department_name, department_type, department_introduction
            }
        });
    },
    updateDepartment(department_name, department_type, department_introduction) {
        return requests({
            url: '/departmentManage',
            method: 'PUT',
            data: {
                department_name, department_type, department_introduction
            }
        })
    },
    deleteDepartment(department_names) {
        return requests({
            url: '/departmentManage',
            method: 'DELETE',
            data: {
                department_names
            }
        })
    }
}