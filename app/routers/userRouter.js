const express = require('express')
const router = express.Router()
const multer = require('multer');

const extension = require('../middleware/extensions')

const storage = multer.diskStorage({
    // Place of picture
    destination: (request, file, callback) => {
        callback(null, 'storage_user/');
    },
    filename: (request, file, callback) => {
        const avatarName = Date.now() + file.originalname;
        callback(null, avatarName);
    }
});

// next how to use storage
const upload = multer({ storage: storage })

const userController = require('../controllers/userController.js');

router.post('/api/v1/signup', userController.Register);
router.post('/api/v1/login', userController.Login);

module.exports = router;