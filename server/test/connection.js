const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(function(done){
    //connect to mongoDB
    mongoose.connect('mongodb://localhost/data', { useNewUrlParser: true });
        // .then(() => console.log('MongoDB Connected...'));
    mongoose.connection.once('open', function () {
        console.log('MongoDB Connected...');
        done();
    }).on('error', function (error) {
        console.log('Connection error: ', error);
    });
});
after(function(done){
    mongoose.connection.close()﻿
    done();
});
