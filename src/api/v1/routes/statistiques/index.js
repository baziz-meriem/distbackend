const route = require('express').Router();

const statsRoute = require('./statistiquesRoute');

const statsUtilizabilityRoute = require('./utlizabilityDistributeurRoute');

route.use('/',statsRoute)

route.use('/revenue/',require('./revenueRoute'))

route.use('/satatUse', statsUtilizabilityRoute)


module.exports = route;