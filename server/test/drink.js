const assert = require('assert');
const drink = require('../models/drink');

describe('saving records', function(){
    it('Saves a record to the database', function(done){
        const newDrink = new drink({
            "drink": {
            "ingredient":"Lemonade",
                "amount":"Mixer",
                "allergy":null,
                "containsAlcohol":false
        },
            "drink": {
            "ingredient":"Vodka",
                "amount":"Shot",
                "allergy":null,
                "containsAlcohol":true
        },
            "drink": {
            "ingredient":"Vodka",
                "amount":"Shot",
                "allergy":null,
                "containsAlcohol":true
        },
            "transactionId":"AB923RFJX"
    });
        newDrink.save().then(function(){
            assert(newDrink.isNew === false);
            done();
        });
    });
});