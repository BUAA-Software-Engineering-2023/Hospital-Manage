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
    },
    getNotificationList(){
        return requests({
            url: '/notificationList',
            method: 'POST',
            data: {
                offset: -1,
                count: -1,
            }
        });
    },
    getNewsList(){
        return requests({
            url: '/newsList',
            method: 'POST',
            data: {
                offset: -1,
                count: -1,
            }
        });
    },
    deleteNotification(notification_id){
        return requests({
            url: '/notificationManage',
            method: 'DELETE',
            data: {
                notification_id
            }
        });
    },
    deleteNews(news_id){
        return requests({
            url: '/newsManage',
            method: 'DELETE',
            data: {
                news_id
            }
        });
    }
}