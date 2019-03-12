const stripe = require('stripe')(process.env.STRIPE_KEY);

const processPayment = async (token, orderPrice, orderId, currency) => {
    if (!token) {
        return true;
    }
    return await stripe.charges.create({
        amount: orderPrice,
        currency: 'gbp',
        description: `DrinKing Order: ${orderId}`,
        statement_descriptor: `DRINKING ORDER ${orderId}`,
        source: token
    });
};

module.exports = {
    processPayment
};
