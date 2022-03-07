const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function showing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("*")
    .groupBy("m.movie_id");
}

function read(movieId) {
  return knex("movies").where({ movie_id: movieId }).select("*").first();
}

module.exports = {
  list,
  showing,
  read,
};
