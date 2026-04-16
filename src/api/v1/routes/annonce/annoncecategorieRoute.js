const route= require('express').Router();
const { getAllHandler, getOneHandler, getOneHandlerBySexeAge ,createHandler, updateHandler, deleteHandler } = require('../../controllers/annonce/annoncecategorieController');
/**
 * @swagger
 * /api/v1/annonce/annonceCategorie:
 *   get:
 *     summary: Retrieve all AnnonceCategories 
 *     tags: [AnnonceCategorie]
 *     responses:
 *       200:
 *         description: AnnonceCategories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 *                 data:
 *                   type: array
 *                   description: List of all AnnonceCategorie
 *                   items:
 *                     $ref: '#/components/schemas/AnnonceCategorie'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/annonce/annonceCategorie/{idAnnonce}:
 *   get:
 *     summary: Retrieve all categories of annonce
 *     tags: [AnnonceCategorie]
 *     parameters:
 *       - in: path
 *         name: idCategorie
 *         required: true
 *         description: ID of annnonce to find all his categorie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Annonce's Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 *                 data:
 *                   $ref: '#/components/schemas/AnnonceCategorie'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 */
route.get('/:idAnnonce', getOneHandler);

/**
 * @swagger
 * /api/v1/annonce/annonceCategorie/getBySexeAge/{idClient}/{idRegion}:
 *   post:
 *     summary: Retrieve a  annonces by sexe, age
 *     tags: [AnnonceCategorie]
 *     parameters:
 *       - in: path
 *         name: idClient
 *         required: true
 *         description: id Client
 *         schema:
 *           type: string
 *       - in: path
 *         name: idRegion
 *         required: true
 *         description: id Region
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sexe:
 *                 type: string
 *                 description: sexe de cette Categorie F Femme, H Homme
 *               TrancheAge:
 *                 type: string
 *                 description: tranche d age E enfant, AS Adolescent , JA Jeune adulte , AD Adulte Categorie
 *     responses:
 *       200:
 *         description: Annonce's Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 *                 data:
 *                   $ref: '#/components/schemas/AnnonceCategorie'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 */
route.post('/getBySexeAge/:idClient/:idRegion', getOneHandlerBySexeAge );

/**
 * @swagger
 * /api/v1/annonce/annonceCategorie:
 *   post:
 *     summary: Create a new annonce
 *     tags: [Annonce]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAnnonce:
 *                 type: string
 *                 description: Id of the annonceur for the annonce
 *               idCategorie:
 *                 type: string
 *                 description: Id of the Categorie for the annonce
 *     responses:
 *       201:
 *         description: Annonce created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 *                 data:
 *                   $ref: '#/components/schemas/AnnonceCategorie'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: Message of the response
 */

route.post('/', createHandler);

/**
 * @swagger
 * /api/v1/annonce/annonceCategorie/{idAnnonce}/{idCategorie}:
 *   delete:
 *     summary: Delete by annonce  and Categorie ID
 *     tags: [AnnonceCategorie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the annonce to delete
 *     responses:
 *       "200":
 *         description: Annonce deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnnonceCategorie'
 *       "400":
 *         description: Invalid ID or Error while deleting annonce
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   description: The error object returned by the service
 *       "404":
 *         description: Annonce not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   description: The error object returned by the service
 */
route.delete('/:idAnnonce/:idCategorie', deleteHandler);

module.exports = route;