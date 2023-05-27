import requests from "@/utils/request";

export default {
    publishNotification(notification_image, notification_content, notification_title, notification_type, short_info) {
        return requests({
            url: '/notificationManage',
            method: 'POST',
            data: {
                notification_image, notification_content, notification_title, notification_type, short_info
            }
        });
    },
    publishNews(news_image, news_content, news_title, news_type, short_info) {
        return requests({
            url: '/newsManage',
            method: 'POST',
            data: {
                news_image, news_content, news_title, news_type, short_info
            }
        });
    }
}