const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    next();
  } else {
    next({ status: 404, message: "Movie id does not exist" });
  }
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  const moviesList = await service.list();
  if (is_showing === "true") {
    const moviesTheaters = await service.showing();
    const showingList = moviesTheaters.filter(
      (showing) => showing.is_showing == 1
    );
    res.json({ data: showingList });
  } else {
    res.json({ data: moviesList });
  }
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
