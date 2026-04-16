const route = require('express').Router();
const { getAllHandler, getByAMHandler, getByClientHandler, getOneHandler, getPannesHandler, postHandler, deleteHandler, putHandler } = require('../../controllers/resourceManagement/distributeurController');

/**
 * @swagger
 * /api/v1/resourceManagement/distributeur:
 *   get:
 *     tags:
 *       - distributeur
 *     summary: get all distributeurs
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/distributeur'
 *       500:
 *         description: Internal Server Error
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/distributeur/am/{idAM}:
 *   get:
 *     tags:
 *       - distributeur
 *     summary: Get single distributeur by idAM
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *       404:
 *         description: Distributeur not found
 *       400:
 *         description: Provided id is not valid
 */

route.get('/am/:id', getByAMHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/distributeur/{id}:
 *   get:
 *     tags:
 *       - distributeur
 *     summary: Get single distributeur by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Distributeur's id
 *                 etat:
 *                   type: string
 *                   description: Distributeur's state
 *                 type:
 *                   type: string
 *                   description: Distributeur's type
 *                 position:
 *                   type: string
 *                   description: Distributeurs's position
 *                 idClient:
 *                   type: integer
 *                   description: Distributeur's client id
 *                 idRegion:
 *                   type: integer
 *                   description: Distributeur's region id
 *                 idAM:
 *                   type: integer
 *                   description: Distributeur's AM id
 *                 code:
 *                   type: string
 *                   description: Distributeur's code deverouilage
 *       404:
 *         description: Distributeur not found
 *       400:
 *         description: Provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/distributeur/client/{idClient}:
 *   get:
 *     tags:
 *       - distributeur
 *     summary: Get distributeurs by id client
 *     parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Distributeur's id
 *                 etat:
 *                   type: string
 *                   description: Distributeur's state
 *                 type:
 *                   type: string
 *                   description: Distributeur's type
 *                 position:
 *                   type: string
 *                   description: Distributeurs's position
 *                 Client:
 *                   type: string
 *                   description: Distributeur's client id
 *                 Region:
 *                   type: string
 *                   description: Distributeur's region id
 *                 AM:
 *                   type: string
 *                   description: Distributeur's AM id
 *                 code:
 *                   type: string
 *                   description: Distributeur's code deverouilage
 *       404:
 *         description: Distributeur not found
 *       400:
 *         description: Provided id is not valid
 */
route.get('/client/:idClient', getByClientHandler)
/**
 * @swagger
 * /api/v1/resourceManagement/distributeur/{id}/pannes:
 *   get:
 *     tags:
 *       - distributeur
 *     summary: get all pannes of single distributeur by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/PANNE'
 *       400:
 *         description: provided id is not valid
 */
route.get('/:id/pannes', getPannesHandler)
/**
 * @swagger
 * /api/v1/resourceManagement/distributeur/:
 *    post:
 *      tags:
 *       - distributeur
 *      summary: add new distributeur'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/distributeur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/distributeur'
 *        400:
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/distributeur/{id}:
 *    put:
 *      tags:
 *       - distributeur
 *      summary: update distributeur with id'
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/distributeur'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/distributeur'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/distributeur/{id}:
 *   delete:
 *     tags:
 *       - distributeur
 *     summary: delete a distributeur by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/distributeur'
 *       400:
 *         description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;