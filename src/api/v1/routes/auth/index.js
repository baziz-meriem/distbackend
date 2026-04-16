const {  getRole } = require('../../controllers/auth/common');

const route= require('express').Router();

route.use('/ac', require('./acAuth'));

route.use('/adm', require('./admAuth'));

route.use('/am', require('./amAuth'));

const customerAuth = require('./customerAuth');
route.use('/consommateur', customerAuth);
// Alias: Swagger and some clients used capital C; Express paths are case-sensitive.
route.use('/Consommateur', customerAuth);

route.use('/decideur', require('./decideurAuth'));

route.use('/sadm', require('./sadmAuth'));

route.get('/role', getRole);

module.exports = route;