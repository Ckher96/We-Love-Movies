const knex = require("../db/connection");

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function update(updatedReview, reviewId) {
  return knex("reviews").where({ review_id: reviewId }).update(updatedReview);
}

function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).select("*").first();
}

function readCriticReview(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first();
}

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ movie_id: movieId })
    .select("*");
}

module.exports = {
  update,
  delete: destroy,
  read,
  list,
  readCriticReview,
};
