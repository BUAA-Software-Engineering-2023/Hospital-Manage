import requests from "@/utils/request";

export default {
    getLeaveList() {
        return requests({
            url: '/leaveListManage',
            method: 'GET'
        });
    },
    denyLeave(leave_id) {
        return requests({
            url: '/processLeave/denied',
            method: 'POST',
            data: {
                leave_id
            }
        });
    },
    approveLeave(leave_id) {
        return requests({
            url: '/processLeave/approved',
            method: 'POST',
            data: {
                leave_id
            }
        });
    },
    getProcessedLeaveList() {
        return requests({
            url: '/processedLeave',
            method: 'GET'
        });
    }
}