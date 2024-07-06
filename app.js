const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const itemsRouter = require('./app/api/v1/items/router');
const banksRouter = require('./app/api/v1/banks/router');

const v1 = '/api/v1';

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to bwa appi',
  });
});

app.use(`${v1}/cms`, itemsRouter);
app.use(`${v1}/cms`, banksRouter);

module.exports = app;
