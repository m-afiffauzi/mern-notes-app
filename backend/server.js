require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');

// express server
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

// static files (frontend build)
app.use(express.static(path.join(__dirname, '../frontend', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

// error handlers
app.use('/', (req, res, next) => {
  res.status(404);
  res.json({
    status: '404',
    errors: 'page not found',
  });
});

// connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen on port 4000
    app.listen(process.env.PORT, () => {
      console.log(`connected to database & listening on port`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.error(error);
  });
