const cloudinary = require("cloudinary");
const credentials = require('./credentials')
cloudinary.config({
    cloud_name: credentials.cloudinary.cloud_name,
    api_key: credentials.cloudinary.api_key,
    api_secret: credentials.cloudinary.api_secret
});
module.exports = cloudinary