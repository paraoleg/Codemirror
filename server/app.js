const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//const passport = require('passport');

const config = require('./config/config');

//require('./config/passport');

const app = express();

mongoose.connect(config.database, { useNewUrlParser: true }, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to mongodb')
    }
});

const server = require('http').createServer();
require('./socket-server')(server);
server.listen(3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

//app.use(passport.initialize());

const mainRoute = require('./routes/main');
const authRoute = require('./routes/auth')
app.use('/api', mainRoute);
app.use('/api/auth', authRoute);

app.listen(config.port, err => {
    console.log('Server on port 3030')
});