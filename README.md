# DrinKing: Mobile Drinks App Ordering Solution 🤴🏽🍺

## Motivation
Age old problem of lengthy and unfair queues at bars or other establishments. 
Opportunity as our development team is located in Cardiff with a wealth of students and bars.
Problem is identified and backed by each member, therefore, we support the decision to commit
Ourselves to develop our drinking solution.


## System Architecture  

To learn more about our solution, please use the table below.

| Application | Purpose | Demo |
| :-------------: |:-------------:|:-----:|
| [**Mobile App**](terminal/) | Customer app for iOS and  Android | GIF here |
| [**Managerial App**](managerial-app/) | Bar Staff Terminal | GIF here |
| [**Terminal**](terminal/) | Bar Staff Terminal | GIF here |

We are using a Mongo database defined and queried using GraphQL. Our customer react-native Android / iOS App communicates to our database through a Node Js server. We are receiving live data changes by use of GraphQL subscriptions, enabled using an Apollo client.

![51801019_289983681694391_8594841858423652352_n](/uploads/642f2bacf40070ed1c766db3285233df/51801019_289983681694391_8594841858423652352_n.png)


## Schema visual
<img width="800" alt="Database Models and Schema" src="https://user-images.githubusercontent.com/39765499/53703777-babdab00-3e0d-11e9-8f45-136b54e106a8.png">
</br>

## Features
- [x] Bar Staff terminal app can listen to changes such as new orders.
- [x] Mobile App updates order status when Terminal app changes the status or order such as “IN_PROGRESS” TO “AWAITING_COLLECTION”

### Limitations of Current Solution

- Cashless
- Bar equipment is expensive.
- Payment gateway - Stripe - vendor lock in. unprofitable with small charges and no additional fees.
- No use cases / success stories.

### Future plans for expansion

* App Deployment
* Server Deployment
---
#### References

#### Links