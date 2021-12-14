const Notification = require('../models/Notification');
const setFlashMessage = require('../lib/setFlashMessage')

class NotificationController {
    async renderDetailNotify(req, res, next) {
        try {
            const account = req.account;
            const id = req.params.id;
            const notification = await Notification.findOne({ _id: id }).lean();
            if (!notification)
                res.redirect('/404')
            res.render("./user/detailNotification", { account, notification });
        } catch (e) {
            res.redirect('/404')
        }

    }

    async renderNotifyPage(req, res, next) {
        let count = await Notification.count()
        let page = req.query.page || 1
        let skip = (page - 1) * 10
        const account = req.account;
        const first_10_notifications = await Notification.find({
            user_id: account._id,
        })
            .sort({ date: -1 })
            .skip(skip)
            .limit(10)
            .lean();
        res.render("./user/notifications", { account, first_10_notifications, count, page });
    }

    async renderNotifyDepartmentPage(req, res, next) {
        const account = req.account;
        const notifications_of_department = await Notification.find({
            user_id: req.params.departments_id,
        }).lean();
        res.render("./user/notificationsClassification", {
            account,
            notifications_of_department,
        });


    }

    async createNotify(req, res, next) {
        const account = req.account;
        const notification = new Notification({
            userId: account._id,
            username: account.username,
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
        });
        await notification.save();
        return res.json({ notification });
    }

    async updateNotify(req, res, next) {
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id });
        notification.category = req.body.category;
        notification.title = req.body.title;
        notification.date = req.body.date;
        notification.content = req.body.content;
        await notification.save();
        res.redirect("/department/notify");
    }

    async deleteNotify(req, res, next) {
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id });
        await notification.remove();
        res.redirect("/department/notify");
    }

    async renderCategoryNotification(req, res) {
        const account = req.account;
        const { category } = req.params;
        let count = await Notification.count({ category })
        let page = req.query.page || 1
        let skip = (page - 1) * 10
        const first_10_notifications = await Notification.find({ category: category })
            .sort({ date: -1 })
            .skip(skip)
            .limit(10)
            .lean();
        res.render("./user/notifications", { account, first_10_notifications, count, page, category });
    }

    async getNotifications(req, res, next) {
        const { page, category, department } = req.query;
        if (category) {
            const notifications = await Notification.find({ category: category })
                .sort({ date: -1 })
                .skip(page * 10)
                .limit(10);
            res.status(200).send({ notifications });
        } else if (department) {
            const notifications = await Notification.find({ userId: department })
                .sort({ date: -1 })
                .skip(page * 10)
                .limit(10);
            res.status(200).send({ notifications });
        } else {
            const notifications = await Notification.find()
                .sort({ date: -1 })
                .skip(page * 10)
                .limit(10);
            res.status(200).send({ notifications });
        }
    }
}

module.exports = new NotificationController();