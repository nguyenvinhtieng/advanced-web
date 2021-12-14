const Account = require('../models/Account');
const Notification = require('../models/Notification');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

class DepartmentController {

    async renderHome(req, res, next) {
        const account = req.account;
        const first_10_posts = await Post.find({})
            .sort({ date: -1 })
            .limit(10)
            .lean();
        res.render('./department/home', { account, first_10_posts });
    }

    async renderNotifyPage(req, res, next) {
        const account = req.account;
        let count = await Notification.count({ userId: account._id })
        let page = req.query.page || 1
        let skip = (page - 1) * 10
        const my_notifications = await Notification.find({ userId: account._id })
            .sort({ date: -1 })
            .skip(skip)
            .limit(10)
            .lean();
        res.render('./department/notifications', { account, my_notifications, count, page });
    }

    async renderDetailNotify(req, res, next) {
        const account = req.account;
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id }).lean();
        res.render('./department/detailNotification', { account, notification });
    }
}

module.exports = new DepartmentController();
