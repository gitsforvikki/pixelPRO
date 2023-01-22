const express =  require('express');
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');


//initialze express js 
const app = express();

//config cors
app.use(cors());

//config dotenv
dotEnv.config();

const port = process.env.PORT ||5000;

//config express to accept json form data
app.use(express.json());


//config mongoose
mongoose.connect(process.env.MONGO_DB_CLOUD_URL ,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then((response)=>{
    console.log('mongoDB cloud connected successfully.......');
}).catch((error)=>{
    console.log(error);
    process.exit(1); //stop the process if unable to connect to mongodb
});


//config router
app.use('/api/users', require('./router/userRouter'));
app.use('/api/posts', require('./router/postRouter'));
app.use('/api/profiles', require('./router/profileRouter'));


//simple request
// app.get('/' , (request , response)=>{
//     response.send(`<h2>Welcome to Social-profile Application</h2>`)
// })


//to serve the frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

//config router
app.listen(port , ()=>{
    console.log(`social-profile-app server started at port:${port}`);
});