const assert = require('assert');
const drink = require('../models/drink');

describe('saving records', function(){
    it('Saves a record to the database', function(done){
        const newDrink = new drink(
        {
            "name": "Double vodka lemonade",
            "ingredients": [
            {
                "__id": "5ADJKSDFJI3R23IE",
                "name": "Lemonade",
                "amount": "mixer",
                "allergy": "none",
                "containsAlcohol": false
            },
            {
                "__id": "5A3EIJFHDFIIW",
                "name": "Vodka",
                "amount": "shot",
                "allergy": "none",
                "containsAlcohol": true
            },
                {
                    "__id": "5BD73IUHJOIS",
                    "name": "Vodka",
                    "amount": "shot",
                    "allergy": "none",
                    "containsAlcohol": true
                }

        ]
    });
        newDrink.save().then(function(){
            assert(newDrink.isNew === false);
            done();
        });
    });
});