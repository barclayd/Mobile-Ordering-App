const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(function(done){
    //connect to mongoDB
    mongoose.connect('mongodb://localhost/data', { useNewUrlParser: true });
    mongoose.connection.once('open', function () {
        console.log('MongoDB Connected...');
        done();
    }).on('error', function (error) {
        console.log('Connection error: ', error);
    });
});
beforeEach(function(done){
    //drops collection before each test
    mongoose.connection.collections.drinks.drop(function(){
        done();
    });
});
after(function(done){
    mongoose.connection.close()﻿
    done();
});