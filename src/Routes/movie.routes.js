const {Router} = require("express");

const MovieControllers = require("../Controller/MovieControllers");

const movieRoutes = Router();

const movieControllers = new MovieControllers();

movieRoutes.get("/", movieControllers.index);
movieRoutes.post("/:user_id", movieControllers.create);
movieRoutes.get("/:id", movieControllers.show);
movieRoutes.delete("/:id", movieControllers.delete);

module.exports = movieRoutes;