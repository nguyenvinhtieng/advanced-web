
const bcrypt = require("bcrypt");
const Account = require('../app/models/Account.js')
// const uploadImage = require("../app/lib/uploadImage");
async function createAdminAccount() {
    let acc = await Account.findOne({ role: 'admin' })
    if (!acc) {
        let password = bcrypt.hashSync('123456', 10);
        let data = {
            username: "Admin",
            role: "admin",
            password: password,
            avatar:
                "/images/logo.png",
        };
        const account = new Account(data)
        await account.save();
    }
}
module.exports = { createAdminAccount };