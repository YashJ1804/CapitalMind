const notificationRepository = require("../repositories/notificationRepository");
const authRepository = require("../repositories/authRepository");

class NotificationService {

    async createNotification({
        userId,
        type,
        title,
        message,
        symbol = null
    }) {
        const user = await authRepository.findById(userId);

        if (!user) {
            return null;
        }

        // Respect the user's App Notifications preference.
        const notificationsEnabled =
            user.settings?.notifications ?? true;

        if (!notificationsEnabled) {
            return null;
        }

        return notificationRepository.create({
            user: userId,
            type,
            title,
            message,
            symbol
        });
    }

    async getNotifications(userId, limit = 20) {
        return notificationRepository.findByUser(userId, limit);
    }

    async getUnreadCount(userId) {
        return notificationRepository.countUnread(userId);
    }

    async markAsRead(userId, notificationId) {
        return notificationRepository.markAsRead(
            userId,
            notificationId
        );
    }

    async markAllAsRead(userId) {
        return notificationRepository.markAllAsRead(userId);
    }

    async deleteNotification(userId, notificationId) {
        return notificationRepository.delete(
            notificationId,
            userId
        );
    }
}

module.exports = new NotificationService();