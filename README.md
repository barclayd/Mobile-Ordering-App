# Drin*King*: Mobile Drinks App Ordering Solution 👑🍺

## Motivation
Age old problem of lengthy and unfair queues at bars or other establishments. 
Opportunity as our development team is located in Cardiff with a wealth of students and bars.
Problem is identified and backed by each member, therefore, we support the decision to commit
Ourselves to develop our drinking solution.

## Code style
  [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## System Architecture  

To learn more about our solution, please use the table below.

| Application | Purpose | Demo |
| :-------------: |:-------------:|:-----:|
| [**Mobile App**](mobile/) | Customer app for iOS and  Android | GIF here |
| [**Managerial App**](managerial-app/) | Bar Staff Terminal | GIF here |
| [**Server**](server/) | Server | GIF here |
| [**Terminal**](terminal/) | Bar Staff Terminal | GIF here |

We are using a Mongo database defined and queried using GraphQL. Our customer react-native Android / iOS App communicates to our database through a Node Js server. We are receiving live data changes by use of GraphQL subscriptions, enabled using an Apollo client.

![51801019_289983681694391_8594841858423652352_n](/uploads/642f2bacf40070ed1c766db3285233df/51801019_289983681694391_8594841858423652352_n.png)

### Limitations of Current Solution

- Cashless
- Bar equipment is expensive.
- Payment gateway - Stripe - vendor lock in. unprofitable with small charges and no additional fees.
- No use cases / success stories.

### Future plans for expansion

* App Deployment
* Server Deployment
* Ingredients schema support
* API protection
* Customer ratings
* Loyalty Schemes 
* Possible Gamification features to promote loyalty and rewards
* Functionality to allow users to cancel orders or potentially change orders after placing them
* Out of stock functionality

---
#### References
