const mongoose = require('mongoose');
//connect to mongoDB
mongoose.connect('mongodb://localhost/data', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'));