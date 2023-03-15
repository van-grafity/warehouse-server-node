const express = require('express')
const router = express.Router()
const multer = require('multer')
const materialController = require('../controllers/materialController');

const storage = multer.diskStorage({
    // Place of picture
    destination: (request, file, callback) => {
        callback(null, 'storage_product/');
    },
    filename: (request, file, callback) => {
        const avatarName = Date.now() + file.originalname;
        callback(null, avatarName);
    }
});

// next how to use storage
const upload = multer({ storage: storage })

router.get('/api/v1/all', materialController.GetAllMaterial);
router.get('/api/v1/deletedata', materialController.GetDeleteMaterial);
router.post('/api/v1/add', upload.single('image'), materialController.AddMaterial);
router.put('/api/v1/update', upload.single('image'), materialController.UpdateMaterial);
router.delete('/api/v1/delete', materialController.DeleteMaterial);


module.exports = router;