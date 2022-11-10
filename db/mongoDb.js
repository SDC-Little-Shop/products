const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/qa');
}

const productsSchema = new mongoose.Schema({
  name: String,
  slogan: String,
  description: String,
  cateogry: String,
  default_price: Number
});

const relatedSchema = new mongoose.Schema({
  id: Number,
  current_product_id: Number,
  related_product_id: Number
});

const featuresSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  feature: String,
  value: String
});

const stylesSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  sale_price: Number,
  original_price: Number,
  default_style: Number
});

const skusSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number
});

const photosSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  url: String,
  thumbnail_url: String,
});

const Product = new mongoose.model('Product', productsSchema);
const Related = new mongoose.model('Related', relatedSchema);
const Features = new mongoose.model('Features', featuresSchema);
const Styles = new mongoose.model('Styles', stylesSchema);
const Skus = new mongoose.model('Skus', skusSchema);
const Photos = new mongoose.model('Photos', photosSchema);

module.exports.Product = Product;
module.exports.Related = Related;
module.exports.Features = Features;
module.exports.Styles = Styles;
module.exports.Skus = Skus;
module.exports.Photos = Photos;
