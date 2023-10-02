const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};
const createPaymentIntent = async (req, res) => {
    // This is your test secret API key.                    
    const stripe = require("stripe")('sk_test_51N5sSQINfoOcmqC55K3vGNNMHp119JQGwPp1xCLJUY2LCHDhthBp1CgHYPOqwvEkz3A454g96HJGLZUGVyAbv3GN00NnudzfIy');

    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
        enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}



module.exports = {
    createPaymentIntent,
};
