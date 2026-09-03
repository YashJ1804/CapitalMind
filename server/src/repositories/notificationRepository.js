const Notification = require("../models/Notification");

class NotificationRepository {

    async create(notificationData) {
        return Notification.create(notificationData);
    }

    async findByUser(userId, limit = 20) {
        return Notification.find({
            user: userId
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();
    }

    async countUnread(userId) {
        return Notification.countDocuments({
            user: userId,
            isRead: false
        });
    }

    async markAsRead(userId, notificationId) {
        return Notification.findOneAndUpdate(
            {
                _id: notificationId,
                user: userId
            },
            {
                $set: {
                    isRead: true
                }
            },
            {
                new: true
            }
        );
    }

    async markAllAsRead(userId) {
        return Notification.updateMany(
            {
                user: userId,
                isRead: false
            },
            {
                $set: {
                    isRead: true
                }
            }
        );
    }

    async delete(notificationId, userId) {
        return Notification.findOneAndDelete({
            _id: notificationId,
            user: userId
        });
    }
}

module.exports = new NotificationRepository();