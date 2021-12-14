const Account = require('./account')
const User = require('./user')
const Admin = require('./admin')
const Department = require('./department')
const Post_API = require('./API/post')
const Comment_API = require('./API/comment')
const Notification_API = require('./API/notification')
const Error = require('./error')
function route(app) {
    app.use('/department', Department)
    app.use('/admin', Admin)
    app.use('/API/post', Post_API)
    app.use('/API/comment', Comment_API)
    app.use('/API/notification', Notification_API)
    app.use('/', User)
    app.use('/', Account)
    app.use('/', Error)
}
module.exports = route;