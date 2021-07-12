// npm packages 
const express = require('express');
const mongoose = require('mongoose');
// server helpers
const app = express();
const PORT = process.env.PORT || 3001;
// middle wear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose database for mongo
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thoughts', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));