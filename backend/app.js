const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


const weatherRouter = require('./routes/weather');
const favouritesRouter = require('./routes/favourites');
app.use('/weather', weatherRouter);
app.use('/favourites', favouritesRouter);

app.listen(8080);