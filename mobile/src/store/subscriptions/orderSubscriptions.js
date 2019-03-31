const orderAdded = `
    subscription OrderUpdated ($orderId:ID!) {
      orderUpdated(orderId:$orderId) {
        _id
        collectionPoint {
          name
        }
        status
        drinks {
          name
          price
        }
      }
    }`;

export {
    orderAdded
}
