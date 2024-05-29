const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.markRead = async (req, res) => {
    try {
        await Notification.update({ is_read: true }, { where: { user_id: req.user.id, id: req.body.notification_id } });
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
