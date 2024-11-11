// controllers/notificationController.js
const {
    sendTopicNotification,
    sendDeviceNotification,
  } = require('../services/NotificationService');
  
  // Controller to handle topic-based notifications
  const sendNotificationToTopic = async (req, res) => {
    const { topics, title, body } = req.body;
    const response = await sendTopicNotification(topics, title, body);
    return res.status(response.status).json(response);
  };
  
  // Controller to handle device-based notifications
  const sendNotificationToDevice = async (req, res) => {
    const { user_ids, title, body } = req.body;
    const response = await sendDeviceNotification(user_ids, title, body);
    return res.status(response.status).json(response);
  };
  
  module.exports = {
    sendNotificationToTopic,
    sendNotificationToDevice,
  };
  