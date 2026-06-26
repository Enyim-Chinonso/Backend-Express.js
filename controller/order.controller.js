const orderService = require('../service/order.service')

const placeOrder = async(req, res) => {
     try{
        const userId = req.user._id;

        const result = await orderService.placeOrder(userId);
        res.status(201).json({
            message: "Order placed successfully",
            order: result,
        })
     }catch(error){
            res.status(500).json({message: error.message || "Server error"})
     }
}



const confirmOrder = async(req, res) => {
    try{
        const{transaction_Id} = req.query;

        if(!transaction_id) return res.status(400).json({message: "Transaction id is required"})

            const order = await orderService.confirmOrder(transaction_id)

            res.status(200).json({
                message: `Order ${order.status === "completed" ? "confirmed": "Failed"}`,
                data: order
            })

            if(order.status === "completed"){
                return res.redirect(`${process.env.FRONTEND_URL}/payment-success? orderId=${order._id}`)
            }else{
                return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?orderId=${order._Id}`)
            }
    }catch(error){
            res.status(500).json({message: error.message || "Server error"})
    }
}
module.exports = {placeOrder, confirmOrder}