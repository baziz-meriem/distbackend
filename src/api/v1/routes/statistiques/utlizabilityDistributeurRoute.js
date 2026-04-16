const route= require('express').Router();
const { getNbCmdByDistByPeriodeHandler, getNbCmdByDistByClientByPeriodeHandler, getNbPayByDistByPeriodeHandler, getNbPayByDistByClientByPeriodeHandler, getNbCmdByDistByRegionByClientByPeriodeHandler} = require('../../controllers/statistiques/utlizabilityDistributeurController');

/**
 * @swagger
 * /api/v1/statistiques/satatUse/tauxUseByRegionsClient/{IdClient}/{dateDebut}/{dateFin}:
 *   get:
 *     summary: Get taux d'utilisation des distributeurs dans chaque regions de client specfier
 *     tags: 
 *       - tauxUseByRegionsClient
 *     parameters:
 *       - in: path
 *         name: IdClient
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de client
 *       - in: path
 *         name: dateDebut
 *         schema:
 *           type: string
 *         required: true
 *         description: date debut de periode
 *       - in: path
 *         name: dateFin
 *         schema:
 *           type: string
 *         required: true
 *         description: date fin de periode
 *     responses:
 *       200:
 *         description: Returns taux d'utilisation des distributeurs dans chaque regions de client specfier
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 utlisationDistributeurs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: number
 *                         description: The count of fixed pannes for the corresponding month
 */ 
route.get('/tauxUseByRegionsClient/:IdClient/:dateDebut/:dateFin',getNbCmdByDistByRegionByClientByPeriodeHandler);

/**
 * @swagger
 * /api/v1/statistiques/satatUse/NbCmdByDistributeur/{IdDistributeur}/{dateDebut}/{dateFin}:
 *   get:
 *     summary: Get nombre de commande d un distributeur
 *     tags: 
 *       - NbCmdByDistributeur
 *     parameters:
 *       - in: path
 *         name: IdDistributeur
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de Distributeur
 *       - in: path
 *         name: dateDebut
 *         schema:
 *           type: string
 *         required: true
 *         description: date debut de periode
 *       - in: path
 *         name: dateFin
 *         schema:
 *           type: string
 *         required: true
 *         description: date fin de periode
 *     responses:
 *       200:
 *         description: Returns nombre de commande d un distributeur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 utlisationDistributeurs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: number
 *                         description: The count of fixed pannes for the corresponding month
 */ 
route.get('/NbCmdByDistributeur/:IdDistributeur/:dateDebut/:dateFin', getNbCmdByDistByPeriodeHandler);

/**
 * @swagger
 * /api/v1/statistiques/satatUse/NbCmdByClient/{IdClient}/{dateDebut}/{dateFin}:
 *   get:
 *     summary: Get nombre de commande d un client dans une periode
 *     tags: 
 *       - NbCmdByClient
 *     parameters:
 *       - in: path
 *         name: IdClient
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de client
 *       - in: path
 *         name: dateDebut
 *         schema:
 *           type: string
 *         required: true
 *         description: date debut de periode
 *       - in: path
 *         name: dateFin
 *         schema:
 *           type: string
 *         required: true
 *         description: date fin de periode
 *     responses:
 *       200:
 *         description: Returns nombre de commande d un distributeur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 utlisationDistributeurs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: number
 *                         description: The count of fixed pannes for the corresponding month
 */ 
route.get('/NbCmdByClient/:IdClient/:dateDebut/:dateFin', getNbCmdByDistByClientByPeriodeHandler);


/**
 * @swagger
 * /api/v1/statistiques/satatUse/NbPayByDistributeur/{IdDistributeur}/{dateDebut}/{dateFin}:
 *   get:
 *     summary: Get nombre de transactions de type paiement d un distributeur dans une periode
 *     tags: 
 *       - NbCmdByDistributeur
 *     parameters:
 *       - in: path
 *         name: IdClient
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de Distributeur
 *       - in: path
 *         name: dateDebut
 *         schema:
 *           type: string
 *         required: true
 *         description: date debut de periode
 *       - in: path
 *         name: dateFin
 *         schema:
 *           type: string
 *         required: true
 *         description: date fin de periode
 *     responses:
 *       200:
 *         description: Returns nombre de transactions de type paiement d un distributeur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 utlisationDistributeurs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: number
 *                         description: The count of fixed pannes for the corresponding month
 */ 
route.get('/NbPayByDistributeur/:IdDistributeur/:dateDebut/:dateFin', getNbPayByDistByPeriodeHandler);

/**
 * @swagger
 * /api/v1/statistiques/satatUse/NbPayByClient/{IdClient}/{dateDebut}/{dateFin}:
 *   get:
 *     summary: Get nombre de transactions de type paiement d un client dans une periode
 *     tags: 
 *       - NbPayByClient
 *     parameters:
 *       - in: path
 *         name: IdClient
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de client
 *       - in: path
 *         name: dateDebut
 *         schema:
 *           type: string
 *         required: true
 *         description: date debut de periode
 *       - in: path
 *         name: dateFin
 *         schema:
 *           type: string
 *         required: true
 *         description: date fin de periode
 *     responses:
 *       200:
 *         description: Returns nombre de transactions de type paiement d un distributeur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 utlisationDistributeurs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: number
 *                         description: The count of fixed pannes for the corresponding month
 */ 
route.get('/NbPayByClient/:IdClient/:dateDebut/:dateFin', getNbPayByDistByClientByPeriodeHandler);


module.exports = route;