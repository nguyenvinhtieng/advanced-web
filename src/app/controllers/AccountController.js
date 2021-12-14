const bcrypt = require("bcrypt")
const Account = require('../models/Account')
const setFlashMessage = require('../lib/setFlashMessage')

class AccountController {

    renderLogin(req, res, next) {
        delete req.session.user_id;
        res.render("./login");
    }

    loginGoogleFailure(req, res, next) {
        res.redirect("./login");
    }

    googleCallBack(req, res, next) {
        res.redirect("/check-login-google");
    }

    async loginGoogle(req, res, next) {
        let account = await Account.findOne({ email: req.user.emails[0].value });
        if (account) {
            req.session.user_id = account._id;
            res.redirect("/home");
        } else {
            next();
        }
    }

    async createAccountStudent(req, res, next) {
        let email = req.user.emails[0].value;
        let familyName = req.user.name.familyName;
        let firstName = req.user.name.givenName;
        let avatar = req.user.photos[0].value;
        const data = {
            email,
            username: firstName + " " + familyName,
            avatar,
            role: "student",
            class: "User haven't set class",
            faculty: "User haven't set faculty",
        };
        const account = new Account(data);
        await account.save();
        req.session.user_id = account._id;
        res.redirect("/home");
    }

    async loginByAccount(req, res, next) {
        let password = req.body.password;
        let username = req.body.username;
        let account = await Account.findOne({ username });
        if (account) {
            if (bcrypt.compareSync(password, account.password)) {
                req.session.user_id = account._id;
                if (account.role === "admin") {
                    res.redirect("/admin/home");
                } else {
                    res.redirect("/department/home");
                }
            } else {
                req.session.flash = setFlashMessage('error', 'Invalid account', "Tài khoản hoặc mật khẩu không chính xác")
                res.redirect("/login");
            }
        } else {
            req.session.flash = setFlashMessage('error', 'Invalid account', "Tài khoản hoặc mật khẩu không chính xác")
            res.redirect("/login");
        }
    }

    logOut(req, res, next) {
        delete req.session.user_id;
        res.redirect("/login");
    }

    async changePassword(req, res, next) {
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        if (newPassword !== confirmPassword) {
            res.send("Mật khẩu không khớp");
        } else {
            const hash = await bcrypt.hash(newPassword, 10);
            await Account.findOneAndUpdate(
                { _id: req.session.user_id },
                { password: hash }
            );
            res.redirect("/logout");
        }
    }
}

module.exports = new AccountController();
