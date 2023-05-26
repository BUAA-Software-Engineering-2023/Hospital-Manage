import requests from "@/utils/request";

export default {
    pulishAnnoucement(notification_image, notification_content, notification_title, notification_type) {
        return requests({
            url: '/notificationManage',
            method: 'POST',
            data: {
                notification_image, notification_content, notification_title, notification_type
            }
        });
    }
}