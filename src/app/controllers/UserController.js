const multiparty = require('multiparty')
const Account = require('../models/Account')
const Post = require('../models/Post')
const Notification = require('../models/Notification')
const uploadImage = require('../lib/upload_image')
class UserController {
    async renderHome(req, res, next) {
        const account = req.account;
        const first_10_posts = await Post.find({})
            .sort({ date: -1 })
            .limit(10)
            .lean();
        const first_10_notifications = await Notification.find({
            user_id: account._id,
        })
            .sort({ date: -1 })
            .limit(10)
            .lean();
        res.render("./user/home", {
            account,
            first_10_posts,
            first_10_notifications,
        });
    }

    async renderProfile(req, res, next) {
        const account = await Account.findOne({ _id: req.session.user_id }).lean();
        let admin = false
        if (account.role == "admin") admin = true
        try {
            const user = await Account.findOne({ _id: req.params.id }).lean();
            const user_first_10_posts = await Post.find({ id_user: user._id })
                .sort({ date: -1 })
                .limit(10)
                .lean();
            res.render("./user/profile", { account, user, user_first_10_posts, admin });
        } catch (e) {
            res.redirect('/404')
        }
    }

    async updateAccount(req, res, next) {
        var form = new multiparty.Form();
        form.parse(req, async function (err, fields, files) {
            let username = fields.username[0]
            let faculty = fields.faculty[0]
            let classUser = fields.class[0]
            let data = { username, class: classUser, faculty }
            if (files.image[0].size > 0)
                data.avatar = await uploadImage(files.image[0])
            await Account.findOneAndUpdate({ _id: req.account._id }, data)
            res.redirect('back')
        })
    }
}

module.exports = new UserController();
