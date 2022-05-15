let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');

//create Error definition
const createError = require('http-errors');

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const galleryRoute = require('./routes/Gallery.route');
const likeRoute = require('./routes/Like.Route');
const commentRoute = require('./routes/Comment.route');
const shareRoute = require('./routes/Share.route');
const profilePicRoute = require('./routes/ProfilePic.route');
const coverPicRoute = require('./routes/CoverPic.route');
const eventRoute = require('./routes/event.route');
const eventComment = require('./models/eventComment');
const chatRoute = require('./routes/Chat.Route');




const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/events', eventRoute);
app.use('/api/likes', likeRoute);
app.use('/api/profilePics', profilePicRoute);
app.use('/api/coverPics', coverPicRoute);
app.use('/api/comments', commentRoute);
app.use('/api/eventComments', eventComment);
app.use('/api/gallery', galleryRoute);
app.use('/api/shares', shareRoute);
app.use('/api/chats', chatRoute);


// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});