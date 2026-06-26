const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const User = require('../models/user.model')

const addToCart = async(userId, productId, quantity) => {
      try{
           const user = await User.findById(userId);
           if(!user){
             throw new Error("User not found")
           }

           const product = await Product.findById(productId)
           if(!product){
             throw new Error("Product not found")
           }


           if(product.inStock < quantity){
             throw new Error(`Only ${product.inStock} items in stock`)
           }

           let cartItem = await Cart.findOne({userId, productId})

           if(cartItem){
              cartItem.quantity += quantity;
              await cartItem.save()
              return cartItem
           }else{
              cartItem = new Cart({userId, productId, quantity})
              await cartItem.save()
              return cartItem
           }
      }catch(error){
            throw new Error(error.message || "Server error")    
      }
}

const viewCart = async(userId) => {
    try{
       const cartItems = await Cart.find({userId}).populate('productId')

       if(!cartItems){
         throw new Error("Cart is empty")
       }

       let totalAmount = 0;

       cartItems.forEach(item => {
           totalAmount += item.productId.price * item.quantity
       })

       return {cartItems, totalAmount}
    }catch(error){
           throw new Error(error.message || "Server error")  
    }
}

const deleteCart = async(cartId) => {
    try{
       let cartItems = await Cart.findById(cartId);

       if(!cartItems){
          throw new Error("Cart not found")
       }

       await Cart.findByIdAndDelete(cartId)
    }catch(error){
        throw new Error(error.message || "Server error") 
    }
}

const clearCart = async(userId) => {
     try{
        const cartItems = await Cart.find({ userId });
        if(!cartItems || cartItems.length === 0){
            throw new Error("No cart items found for this user")
        }
        await Cart.deleteMany({ userId });
    }catch(error){
        throw new Error('Error clearing cart: ' + error.message);
    }
}
 
module.exports = {addToCart, viewCart, deleteCart, clearCart}