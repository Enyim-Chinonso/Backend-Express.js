const productService = require('../service/product.service')

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, inStock } = req.body

    console.log(`the body is ${JSON.stringify(req.body)}`)

    if (!name || !price || !description || !category || !inStock) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" })
    }

    const image = req.file.buffer

    const product = await productService.createProduct({
      name,
      price,
      description,
      category,
      inStock,
      image,
    })

    return res.status(201).json({
      message: "Product created successfully",
      product,
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message || "Server error",
    })
  }
}

const getAllProducts = async(req, res) => {
    try{
        const products = await productService.getAllProducts()

        return res.status(200).json({
            message: "Products retrieved successfully",
            products,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message || "Server error",
        })
    }
}


const getSingleProduct = async(req, res) =>{
  try{
    const productId = req.params.id;

    const product = await productService.getSingleProduct(productId)

    if(!product){
      return res.status(404).json({message: "Product retrieved successfully", product})   
    }
  }catch(error){
      console.log(error)
      return res.status(500).json({message: error.message || "server error", })
    }
  }


  const searchProduct = async(req, res) => {
    const{name, category} = req.query

    try{
      const products = await productService.searchProduct(name, category)
      return res.status(200).json({
        message: "Products searched successfully", products,
      })
    }catch(error){
      console.log(error)
      return res.status(500).json({
        message: error.message || "server error",
      })
    }
  }

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct
}