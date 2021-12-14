const cloudinary = require('../../config/cloudinary')
async function uploadImage(file) {
    let result = await cloudinary.uploader.upload(file.path);
    return result.url
}
module.exports = uploadImage;