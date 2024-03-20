const CONFIG = require('../../../knexfile');
const knex = require('knex');
const CONNECTION = knex(CONFIG.development);

module.exports = CONNECTION;