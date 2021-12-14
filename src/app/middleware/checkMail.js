const setFlashMessage = require('../lib/setFlashMessage')
module.exports = function checkEmail(req, res, next) {
    let email = req.user.emails[0].value;
    if (email.search('@student.tdtu.edu.vn') > 0 || email.search('@tdtu.edu.vn') > 0) {
        next();
    } else {
        req.session.flash = setFlashMessage('error', 'Invalid account', "Google account not inside TDTu")
        return res.redirect('/login');
    }
}
