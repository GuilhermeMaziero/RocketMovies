const { Router } = require('express');

const ClassMovieNotesController = require('../controllers/MovieNotesController');

const movieNotesRoutes = Router();

const movieNotesController = new ClassMovieNotesController();

movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.post("/:user_id", movieNotesController.create);
movieNotesRoutes.delete("/:id", movieNotesController.delete);


module.exports = movieNotesRoutes;