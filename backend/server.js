var express = require('express'),
 attendance = require('./routes/attendanceroutes')
var app = express();
var bodyParser = require('body-parser');


/* mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://avijit:123456qwe@cluster0.jro1w.mongodb.net/?retryWrites=true&w=majority',{useMongoClient:true}).then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err)); */
// configure app to use bodyParser()
// this will let us get the data from a POST
/* const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(uri, options) */
/* mongoose.connect('mongodb://localhost/test',{useMongoClient:true}) */
const mongoose = require('mongoose');
let db_url="mongodb+srv://avijit:123456qwe@cluster0.jro1w.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_url, {
    keepAlive: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose.connection;






app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow cross origin requests on server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();
});
var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our attendance module apis' });
});

// create an attendance record (accessed at POST http://localhost:3000/api/markattendance)
router.route('/markattendance').post(attendance.markattendance);
// retrieve all records
router.get('/getallrecords',attendance.getallrecords);
//retrieve by month
router.post('/getbymonth',attendance.getbymonth);
//retrieve by date
router.post('/getbydate',attendance.getbydate);
app.use('/api', router);
var port = process.env.PORT || 3000;
app.listen(port);
console.log("serve listening on port 3000");
