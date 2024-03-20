const { Router } = require('express');

const ClassMovieTagsController = require('../controllers/MovieTagsController');

const tagsRoutes = Router();

const tagsController = new ClassMovieTagsController();

tagsRoutes.get("/:user_id", tagsController.index);


module.exports = tagsRoutes;