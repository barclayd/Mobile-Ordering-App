const stripe = require('stripe')('sk_test_og2wtkFlVbxanpmP8jxaFAmq');

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
