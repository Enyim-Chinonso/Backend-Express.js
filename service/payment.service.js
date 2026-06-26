const axios = requir("axios");
require("dotenv").config();
const { FLUTTERWAVE_BASEURL, FLUTTERWAVE_SECRET_KEY } = process.env;

const initializePayment = async(paymentData) => {
    try{
        const response = await axios.post(`${FLUTTERWAVE_BASEURL}/payments`, paymentData, {
            headers: {
                Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
                "Content-Type": "application/json"
            }
        }
        );

        console.log(`The response is ${response}`)

        if(response.data.status != "success"){
            console.error("FLW INIT FAILED", response.data)
            throw new Error(response.data.message || "Payment initialization failed")
        }

        return response.data
    }catch(error){
        console.error("flw init error", error.response?.data || error);
        throw new Error("Failed to initialize payment");
    }
}

const verifyPayment = async(transactionId) => {
    try{
        const response = await axios.get(`${FLUTTERWAVE_BASEURL}/${transactionId}/verify`,
            {
                headers: {
                    Authorization: `Bearer $ {FLUTTERWAVE_SECRET_KEY}`
                }
            }
        );

        return response.data
    }catch(error){
        throw new Error(
            error.response ? error.message.data.message : error.message
        )
    }
}

module.exports = {initializePayment, verifyPayment}