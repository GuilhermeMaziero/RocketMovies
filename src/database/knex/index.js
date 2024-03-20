const CONFIG = require('../../../knexfile');
const KNEX = require('knex');
const CONNECTION = KNEX(CONFIG.development);

module.exports = CONNECTION;