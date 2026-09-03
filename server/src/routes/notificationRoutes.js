const express = require("express");

const router = express.Router();

const notificationController =
    require("../controllers/notificationController");

const authMiddleware =
    require("../middlewares/authMiddleware");

/*
|--------------------------------------------------------------------------
| Get Notifications
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    authMiddleware,
    notificationController.getNotifications
);

/*
|--------------------------------------------------------------------------
| Get Unread Count
|--------------------------------------------------------------------------
*/

router.get(
    "/unread-count",
    authMiddleware,
    notificationController.getUnreadCount
);

/*
|--------------------------------------------------------------------------
| Mark All Notifications As Read
|--------------------------------------------------------------------------
*/

router.put(
    "/read-all",
    authMiddleware,
    notificationController.markAllAsRead
);

/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
*/

router.put(
    "/:notificationId/read",
    authMiddleware,
    notificationController.markAsRead
);

/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
*/

router.delete(
    "/:notificationId",
    authMiddleware,
    notificationController.deleteNotification
);

module.exports = router;