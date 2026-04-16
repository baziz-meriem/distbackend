const route = require('express').Router();
const { getRevenueHandler, getRevenueByDistributeurHandler, getRevenueByBoissonHandler, getRevenueClientByDistributeurHandler, getRevenueAllBoissonHandler,getRevenueClientByRegionHandler } = require('../../controllers/statistiques/revenueController');

/**
 * @swagger
 * /api/v1/statistiques/revenue/{idClient}:
 *    get:
 *      tags:
 *       - Statistiques
 *      summary: get revenue by client id'
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *         required: true
 *       - in: path
 *         name: dateDebut
 *         schema:
 *          type: string
 *          example: 2023-06-07
 *         description: It's the yesterday by default
 *       - in: path
 *         name: dateFin
 *         schema:
 *          type: string
 *          example: 2023-06-16
 *         description: It's today by default
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                           revenue:
 *                              type: integer
 *        400:
 *          description: provided id is not valid
 */
route.get('/:idClient', getRevenueHandler);

/**
 * @swagger
 * /api/v1/statistiques/revenue/distributeur/{id}:
 *    get:
 *      tags:
 *       - Statistiques
 *      summary: get revenue by distributeur id'
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *         required: true
 *       - in: path
 *         name: dateDebut
 *         schema:
 *          type: string
 *          example: 2023-06-07
 *         description: It's the yesterday by default
*       - in: path
 *         name: dateFin
 *         schema:
 *          type: string
 *          example: 2023-06-16
 *         description: It's today by default
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                           revenue:
 *                              type: integer
 *        400:
 *          description: provided id is not valid
 */
route.get('/distributeur/:id', getRevenueByDistributeurHandler);
/**
 * @swagger
 * /api/v1/statistiques/revenue/{idClient}/boisson/{id}:
 *    get:
 *      tags:
 *       - Statistiques
 *      summary: get revenue by boison id for a client'
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *         required: true
 *       - in: path
 *         name: dateDebut
 *         schema:
 *          type: string
 *          example: 2023-06-07
 *         description: It's the yesterday by default
*       - in: path
 *         name: dateFin
 *         schema:
 *          type: string
 *          example: 2023-06-16
 *         description: It's today by default
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                           revenue:
 *                              type: integer
 *        400:
 *          description: provided id is not valid
 */
route.get('/:idClient/boisson/:id', getRevenueByBoissonHandler);

/**
 * @swagger
 * /api/v1/statistiques/revenue/distributeur/client/{idClient}:
 *    get:
 *      tags:
 *       - Statistiques
 *      summary: get revenue of each distributeur by client id'
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *         required: true
 *       - in: path
 *         name: dateDebut
 *         schema:
 *          type: string
 *          example: 2023-06-07
 *         description: It's the yesterday by default
*       - in: path
 *         name: dateFin
 *         schema:
 *          type: string
 *          example: 2023-06-16
 *         description: It's today by default
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  data:
 *                      type: array
 *                      items: 
 *                             type: object
 *                             properties:
 *                                  idDistributeur:
 *                                     type: integer
 *                                  revenue:    
 *                                      type: integer
 *        400:
 *          description: provided id is not valid
 */
route.get('/distributeur/client/:idClient', getRevenueClientByDistributeurHandler);
/**
 * @swagger
 * /api/v1/statistiques/revenue/{idClient}/boisson:
 *    get:
 *      tags:
 *       - Statistiques
 *      summary: get revenue of each boisson by client id'
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *         required: true
 *       - in: path
 *         name: dateDebut
 *         schema:
 *          type: string
 *          example: 2023-06-07
 *         description: It's the yesterday by default
*       - in: path
 *         name: dateFin
 *         schema:
 *          type: string
 *          example: 2023-06-16
 *         description: It's today by default
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  data:
 *                      type: array
 *                      items: 
 *                             type: object
 *                             properties:
 *                                  idBoisson:
 *                                     type: integer
 *                                  label:
 *                                     type: string
 *                                  revenue:    
 *                                      type: integer
 *        400:
 *          description: provided id is not valid
 */
route.get('/:idClient/boisson/', getRevenueAllBoissonHandler);
/**
 * @swagger
 * /api/v1/statistiques/revenue/region/client/{idClient}/:
 *    get:
 *      tags:
 *       - Statistiques
 *      summary: get revenue of each region by client id'
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *         required: true
 *       - in: path
 *         name: dateDebut
 *         schema:
 *          type: string
 *          example: 2023-06-07
 *         description: It's the yesterday by default
*       - in: path
 *         name: dateFin
 *         schema:
 *          type: string
 *          example: 2023-06-16
 *         description: It's today by default
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  data:
 *                      type: array
 *                      items: 
 *                             type: object
 *                             properties:
 *                                  idRegion:
 *                                     type: integer
 *                                  nom:
 *                                     type: string
 *                                  revenue:    
 *                                      type: integer
 *        400:
 *          description: provided id is not valid
 */
route.get('/region/client/:idClient', getRevenueClientByRegionHandler);

module.exports = route;