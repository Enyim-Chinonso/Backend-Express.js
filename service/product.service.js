const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary.config");

const createProduct = async ({
  name,
  price,
  description,
  category,
  inStock,
  image,
}) => {
  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "products",
        },

        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        },
      );

      stream.end(image);
    });
  };

  const result = await uploadImage();

  const newProduct = new Product({
    name,
    price,
    description,
    category,
    inStock,
    image: result.secure_url,
  });

  await newProduct.save();

  return newProduct;
};

const getAllProducts = async () => {
  const products = await Product.find().sort({ createdAt: -1 });

  return products;
};

const getSingleProduct = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};


const updateProduct = async(productId, updatedData) => {
  const product = awaitProduct.findByIdAndUpdate
  (productId, updatedData, {
    new: true,
    runValidators: true,
  })
  return updatedProduct
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updatedProduct
};
