const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const reduceMovies = reduceProperties("theater_id", {
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
});

async function list(req, res) {
  const { movieId } = req.params;
  const theaters = await service.list();
  if (movieId) {
    const theatersWithMovie = theaters.filter(
      (theater) => theater.movie_id === Number(movieId)
    );
    res.json({ data: theatersWithMovie });
  } else {
    res.json({ data: reduceMovies(theaters) });
  }
}

module.exports = {
  list : [asyncErrorBoundary(list)],
};
