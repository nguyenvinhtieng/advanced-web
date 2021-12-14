const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../../config/firebase.json");
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const storageRef = admin.storage().bucket(`gs://final-web-2021.appspot.com`);

module.exports = async function uploadImage(path, filename) {
  const storage = await storageRef.upload(path, {
    public: true,
    destination: `/uploads/${filename}`,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    },
  });

  return storage[0].metadata.mediaLink;
};
