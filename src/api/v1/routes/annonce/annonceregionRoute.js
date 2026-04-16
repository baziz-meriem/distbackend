const route= require('express').Router();
const { getAllHandler, getOneHandler,createHandler, updateHandler, deleteHandler } = require('../../controllers/annonce/annonceRegionController');
/**
 * @swagger
 * /api/v1/annonce/annonceRegion:
 *   get:
 *     summary: Retrieve all AnnonceRegions 
 *     tags: [AnnonceRegion]
 *     responses:
 *       200:
 *         description: AnnonceRegions retrieved successfully
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
 *                   description: List of all AnnonceRegion
 *                   items:
 *                     $ref: '#/components/schemas/AnnonceRegion'
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
 * /api/v1/annonce/annonceRegion/{idAnnonce}:
 *   get:
 *     summary: Retrieve a single annonceRegion by ID
 *     tags: [AnnonceRegion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the AnnonceRegion to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Annonce's Regions retrieved successfully
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
 *                   $ref: '#/components/schemas/AnnonceRegion'
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
 * /api/v1/annonce/annonceRegion:
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
 *                  type: integer
 *                  description: Annonce's id
 *               idRegion:
 *                  type: integer
 *                  description: Region's id
 *               TypePayment:
 *                  type: string
 *                  description: Annonce's TypePayment in this region forfait ou reel
 *               NbVues:
 *                  type: integer
 *                  description: Annonce's prix in this region si type est forfait cette attribut est le prix totale de annonce si type est reel c est prix un vue
 *               PrixAnnonce:
 *                  type: Float
 *                  description: Annonce's prix in this region si type est forfait cette attribut est le prix totale de annonce si type est reel c est prix un vue
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
 *                   $ref: '#/components/schemas/AnnonceRegion'
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
 * /api/v1/annonce/annonceRegion/{idAnnonce}/{idRegion}:
 *   put:
 *      tags:
 *       - Annonce
 *      summary: Update a AnnonceRegion by idAnnonce et idRegion
 *      parameters:
 *       - in: path
 *         name: idAnnonce
 *         schema:
 *           type: integer
 *         required: true
 *         description: id of the Annonce to update
 *       - in: path
 *         name: idRegion
 *         schema:
 *           type: integer
 *         required: true
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AnnonceRegion'
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AnnonceRegion'
 *        400:
 *          description: invalid id or inputs
 */
route.put('/:idAnnonce/:idRegion', updateHandler);
 /**
 * @swagger
 * /api/v1/annonce/annonceRegion/{id}:
 *   delete:
 *     summary: Delete by annonce  and region ID
 *     tags: [AnnonceRegion]
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
 *               $ref: '#/components/schemas/AnnonceRegion'
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

route.delete('/:idAnnonce/:idRegion', deleteHandler);

module.exports = route;