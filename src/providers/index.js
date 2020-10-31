const Image = require('../models/image');

module.exports = {
  images: async ({ user }) => {
    const images = await Image.find(
      user ? { user }: {}
    );
    return images;
  }
}
