const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = 'mongodb://localhost:27017/gym-db';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.send('home'));
app.get('/items', (req, res) => res.send('items'));
app.use(authRoutes);

app.get('/set-cookies',(req, res) =>{
  res.cookie('new-user',false);
  res.send('you got the cookie')
})