const Notification = require("../models/NotificationMsg");
const User = require("../models/user");
const { admin } = require("../utils/firebase");

const createResponse = (message, status, data = null) => {
  return {
    message,
    status,
    data,
  };
};

// Send a notification to a specific topic
const sendTopicNotification = async (topics, title, body) => {
  try {
    Promise.all(
      topics.map(async (topic) => {
        const formattedTopic = topic.trim().replace(/\s+/g, '_');
        const message = {
          notification: {
            title,
            body,
          },
          topic:formattedTopic,
        };
        const response = await admin.messaging().send(message);
        const notification = new Notification({
          recipient: topic,
          type: "topic",
          title,
          body,
          status: "sent",
          response: JSON.stringify(response),
        });
        await notification.save();
      })
    );
    return createResponse("Notification sent successfully", 200);
  } catch (error) {
    return createResponse("Error sending notification", 500, error.message);
  }
};

// Send a notification to a specific device
const sendDeviceNotification = async (user_ids, title, body) => {
  try {
    Promise.all(
      user_ids.map(async (userid) => {
        const user = await User.findById(userid);
        if (user.fcmToken) {
          const message = {
            notification: {
              title,
              body,
            },
            token: user.fcmToken,
          };

          const response = await admin.messaging().send(message);
          const notification = new Notification({
            recipient: user.fcmToken,
            type: "device",
            title,
            body,
            status: "sent",
            response: JSON.stringify(response),
          });
          await notification.save();
        }
      })
    );
    return createResponse("Notification sent successfully", 200);
  } catch (error) {
    return createResponse("Error sending notification", 500, error.message);
  }
};

module.exports = {
  sendTopicNotification,
  sendDeviceNotification,
};
