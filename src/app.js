if (process.env.USER) require("dotenv").config();
const express = require("express");
const notFound = require("./errors/notFound");
const cors = require("cors");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require("./movies/movies.router");
const reviewRouter = require("./reviews/reviews.router");
const theaterRouter = require("./theaters/theaters.router");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/movies", moviesRouter);

app.use("/reviews", reviewRouter);

app.use("/theaters", theaterRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
