const router = require("express").Router();
const controller = require("./movies.controller");
const reviewRouter = require("../reviews/reviews.router");
const theaterRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:movieId/reviews", reviewRouter);

router.use("/:movieId/theaters", theaterRouter);

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;
