const notificationService = require("../services/notificationService");
const ApiResponse = require("../utils/apiResponse");

class NotificationController {

    async getNotifications(req, res, next) {
        try {
            const notifications =
                await notificationService.getNotifications(req.user.id);

            return ApiResponse.success(
                res,
                notifications,
                "Notifications fetched successfully"
            );
        } catch (error) {
            next(error);
        }
    }

    async getUnreadCount(req, res, next) {
        try {
            const count =
                await notificationService.getUnreadCount(req.user.id);

            return ApiResponse.success(
                res,
                { count },
                "Unread notification count fetched successfully"
            );
        } catch (error) {
            next(error);
        }
    }

    async markAsRead(req, res, next) {
        try {
            const notification =
                await notificationService.markAsRead(
                    req.user.id,
                    req.params.notificationId
                );

            return ApiResponse.success(
                res,
                notification,
                "Notification marked as read"
            );
        } catch (error) {
            next(error);
        }
    }

    async markAllAsRead(req, res, next) {
        try {
            const result =
                await notificationService.markAllAsRead(
                    req.user.id
                );

            return ApiResponse.success(
                res,
                result,
                "All notifications marked as read"
            );
        } catch (error) {
            next(error);
        }
    }

    async deleteNotification(req, res, next) {
        try {
            const notification =
                await notificationService.deleteNotification(
                    req.user.id,
                    req.params.notificationId
                );

            return ApiResponse.success(
                res,
                notification,
                "Notification deleted successfully"
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NotificationController();