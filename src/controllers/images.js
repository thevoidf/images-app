const routes = module.exports = exports = {};
const Image = require('../models/image');

routes.upload = async (req, res) => {
  const { user } = req.body;
  const {
    originalname: name,
    mimetype: type,
    filename,
    size
  } = req.file;
  const path = `${req.protocol}://${req.get("host")}/static/${filename}`
  const image = {
    user,
    name,
    type,
    path,
    size
  };

  await Image.create({ ...image });

  res.status(200).json({
    message: 'Image uploaded',
    image
  });
}

routes.getAllImages = async (req, res) => {
  const images = await Image.find({});

  res.status(200).json({
    images
  });
}

routes.getImagesByUser = async (req, res) => {
  const { user } =  req.params;
  const images = await Image.find({ user });

  res.status(200).json({
    images
  });
}
