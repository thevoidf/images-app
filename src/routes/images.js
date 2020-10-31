const images = require('../controllers/images');
const { Router } = require('express');
const router = Router();
const path = require('path');
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { UPLOAD_DIR } = process.env;
    const dir = path.join(__dirname, '../../', UPLOAD_DIR);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const { mimetype, originalname } = file;
    const ext = file.mimetype.split('/')[1];
    const filename = originalname.split('.')[0];
    const filenameTrim = filename.replace(/\s/g, '')
    const name = filenameTrim + '_' + Date.now() + '.' + ext;
    cb(null, name);
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 5000000 }
})
const { catchErrors } = require('../utils');

router.post(
  '/',
  upload.single('image'),
  catchErrors(images.upload)
);
router.get('/', catchErrors(images.getAllImages));
router.get('/:user', catchErrors(images.getImagesByUser));

module.exports = router;
