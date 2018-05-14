const express = require("express");

// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
// const session = require("express-session");
// const authRoute = require('./routes/auth');
// const userRoute = require("./routes/user");
// const employerRoute = require("./routes/employer");

const app = express();

// mongoose.connect('mongodb://localhost:27017/gig');
// mongoose.connection.on('connected', function(){
//     console.log('Connected to database: MongoDB');
// });
// mongoose.connection.on('error', function(err){
//     console.log('Error connecting to database: ' + err);
// });

//use session for tracking logins
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: false
// }));

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use('/api/auth', authRoute);
// app.use('/api/user', userRoute);
// app.use('/api/employer', employerRoute);
app.use(express.static(path.join(__dirname, 'suriah')));
app.use(express.static(path.join(__dirname, 'maryam')));

app.get('/', function(req, res){
    res.sendFile('./suriah/index.html');
});
// app.get("/student/login", function(req, res) {
//     //res.sendFile('./maryam/freelancer.html');
// });

app.listen(3000, function(){
    console.log('Server started at: http://localhost:3000');
});