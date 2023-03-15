const {Router} = require("express");

const MovieControllers = require("../Controller/MovieControllers");

const movieRoutes = Router();

const movieControllers = new MovieControllers();

movieRoutes.post("/:user_id", movieControllers.create);
movieRoutes.get("/:id", movieControllers.show);

module.exports = movieRoutes;