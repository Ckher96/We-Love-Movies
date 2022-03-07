const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  organization_name: "critic.organization_name",
  surname: "critic.surname",
});

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    next();
  } else {
    next({ status: 404, message: "cannot be found" });
  }
}

async function destroy(req, res) {
  await service.delete(req.params.reviewId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { reviewId } = req.params;
  const { data } = req.body;
  await service.update(data, Number(reviewId));
  const review = await service.readCriticReview(reviewId);
  res.json({ data: addCritic(review) });
}

async function getMovieReview(req, res) {
  const { movieId } = req.params;
  const reviews = await service.list(movieId);
  const alteredReviews = reviews.map((review) => addCritic(review));
  res.json({ data: alteredReviews });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  getMovieReview,
};
