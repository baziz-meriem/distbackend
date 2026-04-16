const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/annonce/categorieController');
/**
 * @swagger
 * /api/v1/resourceManagement/Categorie/:
 *    get:
 *      tags:
 *       - Categorie
 *      summary: get all Categories
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Categorie'
 *        500:
 *          description: Internal Server Error
 * 
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/Categorie/{id}:
 *    get:
 *      tags:
 *       - Categorie
 *      summary: get single Categorie by id
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Categorie'
 *        404:
 *          description: Categorie not found
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/Categorie/:
 *    post:
 *      tags:
 *       - Categorie
 *      summary: add new Categorie
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Categorie'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Categorie'
 *        400:
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/Categorie/{id}:
 *    put:
 *      tags:
 *       - Categorie
 *      summary: update Categorie with id
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
 *                      $ref: '#/components/schemas/Categorie'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Categorie'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/Categorie/{id}:
 *    delete:
 *      tags:
 *       - Categorie
 *      summary: delete Categorie with id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Categorie'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;