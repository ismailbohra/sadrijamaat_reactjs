// routes/notificationRoutes.js
const express = require('express');
const {
  sendNotificationToTopic,
  sendNotificationToDevice,
} = require('../controllers/NotificationController');

const router = express.Router();

/**
 * @swagger
 * /notifications/topic:
 *   post:
 *     tags: [Notification]
 *     summary: Send notification to a topic
 *     description: Send FCM notification to a specific topic.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       500:
 *         description: Error sending notification
 */
router.post('/topic', sendNotificationToTopic);

/**
 * @swagger
 * /notifications/device:
 *   post:
 *     tags: [Notification]
 *     summary: Send notification to a device
 *     description: Send FCM notification to a specific device using its FCM token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fcmToken:
 *                 type: string
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       500:
 *         description: Error sending notification
 */
router.post('/device', sendNotificationToDevice);

module.exports = router;
