const route= require('express').Router();
const {getFixedPannesByMonthHandler,getFixedPannesByYearHandler,getFixedPannesByWeekHandler} = require('../../controllers/statistiques/statistiquesController');


/**
 * @swagger
 * /api/v1/statistiques/weeks/{year}/{idAM}:
 *   get:
 *     summary: Get the number of fixed pannes by week for a specific year
 *     tags: 
 *       - Statistiques
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: The year for which to retrieve the number of fixed pannes by week
 *       - in: path
 *         name: idAM
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the AM who fixed the pannes
 *     responses:
 *       200:
 *         description: Returns the number of fixed pannes by week for a specific year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fixedPannesByWeek:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         description: The month for which the number of fixed pannes is provided
 *                       count:
 *                         type: number
 *                         description: The count of fixed pannes for the corresponding month
 */

route.get('/weeks/:year/:idAM',getFixedPannesByWeekHandler);

/**
 * @swagger
 * /api/v1/statistiques/months/{year}/{idAM}:
 *   get:
 *     summary: Get the number of fixed pannes recorded by month for a specific year and AM identifier
 *     tags: 
 *       - Statistiques
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: The year for which to retrieve the fixed pannes
 *       - in: path
 *         name: idAM
 *         schema:
 *           type: integer
 *         required: true
 *         description: The identifier of the AM for which to retrieve the fixed pannes
 *     responses:
 *       200:
 *         description: Returns the number of fixed pannes recorded by month for a specific year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fixedPannesByMonth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         description: The month for which the number of fixed pannes is provided
 *                       count:
 *                         type: number
 *                         description: The count of fixed pannes for the corresponding month
 */
route.get('/months/:year/:idAM', getFixedPannesByMonthHandler);
/**
 * @swagger
 * /api/v1/statistiques/years/{idAM}:
 *   get:
 *     summary: Get the number of fixed pannes recorded by years for a specific AM identifier
 *     tags: 
 *       - Statistiques
 *     parameters:
 *       - in: path
 *         name: idAM
 *         schema:
 *           type: integer
 *         required: true
 *         description: The identifier of the AM for which to retrieve the fixed pannes
 *     responses:
 *       200:
 *         description: Returns the number of fixed pannes recorded by years
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fixedPannesByYear:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       year:
 *                         type: string
 *                         description: The year for which the number of fixed pannes is provided
 *                       count:
 *                         type: number
 *                         description: The count of fixed pannes for the corresponding year
 */

route.get('/years/:idAM',getFixedPannesByYearHandler);


module.exports = route;