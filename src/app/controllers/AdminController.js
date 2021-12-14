const Account = require('../models/Account');
const Post = require('../models/Post');
const bcrypt = require("bcrypt");
const setFlashMessage = require('../lib/setFlashMessage')

class AdminController {
    async renderHome(req, res, next) {
        const account = req.account;
        const first_10_posts = await Post.find({}).sort({ date: -1 }).limit(10).lean();
        res.render('./admin/home', { account, first_10_posts, admin: true });
    }


    async renderDepartmentPage(req, res, next) {
        const account = req.account;
        const departments = await Account.find({ role: 'department' }).lean();
        res.render('./admin/departmentPage', { account, departments });
    }

    async createDepartmentAccount(req, res, next) {
        const category = req.body.department;
        const { username } = req.body;
        const avatar = "/images/logo.png";
        let account = await Account.findOne({ username });
        if (account) {
            // return res.status(400).json({
            //     message: "Tên tài khoản đã tồn tại"
            // });
            req.session.flash = setFlashMessage('error', 'Invalid account', "Username was exists")
            res.redirect('/admin/departments');
        } else {
            const hash = await bcrypt.hash('123456', 10);
            account = new Account({
                username,
                password: hash,
                role: 'department',
                avatar,
                category
            });
            await account.save();
            req.session.flash = setFlashMessage('success', 'Successfully', "Create account successfully!")
            res.redirect('/admin/departments');
        }
    }

    async renderMyAccount(req, res, next) {
        const account = req.account;
        res.send(account);
    }
}

module.exports = new AdminController();
