const route= require('express').Router();
const annonceurRoute= require('./annonceurRoute')
const annonceRoute= require('./annonceRoute')
const annonceRegionRoute= require('./annonceregionRoute')
const annonceCategorieRoute= require('./annoncecategorieRoute')
const categorie = require('./categorieRoute')
const reportRoute = require('./reportRoute')


route.use('/generate-report', reportRoute);
/**
 * @swagger
 * components:
 *  schemas:
 *    ANNONCEUR:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Annonceur's id
 *        nom:
 *          type: string
 *          description: Annonceur's name
 *        idClient:
 *          type: integer
 *          description: Client's id that the annonceur is related to
 *        email:
 *          type: string
 *          description: annonceur email
 *        phoneNumber:
 *          type: string
 *          description: annonceur phone Number
 *        Adr:
 *          type: string
 *          description: annonceur address
 *        
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    ANNONCEUR_POST:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Annonceur's name
 *        idClient:
 *          type: integer
 *          description: Client's id that the annonceur is related to
 *        email:
 *          type: string or undefined
 *          description: annonceur email
 *        phoneNumber:
 *          type: string or undefined
 *          description: annonceur phone Number
 *        Adr:
 *          type: string or undefined
 *          description: annonceur address
 *        
 */
route.use('/annonceur', annonceurRoute);
/**
 * @swagger
 * components:
 *  schemas:
 *    Annonce:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Annonce's id
 *        video:
 *          type: string
 *          description: Annonce's video
 *        periodeAffichage:
 *          type: string
 *          description: periode d'affichage de l'annonce
 *        DateDebut:
 *          type: string
 *          description: date de debut de l'annonce
 *        DateFin:
 *          type: string
 *          description: date de fin de l'annonce
 *        idBoisson:
 *          type: integer
 *          description: id de la boisson
 *        idAnnonceur:
 *          type: integer
 *          description: id de l'annonceur
 *        etat:
 *          type: string
 *          description: etat de l'annonceur active ou blouquer
 */
route.use('/annonce', annonceRoute);

/**
 * @swagger
 * components:
 *  schemas:
 *    AnnonceRegion:
 *      type: object
 *      properties:
 *        idAnnonce:
 *          type: integer
 *          description: Annonce's id
 *        idRegion:
 *          type: integer
 *          description: Region's id
 *        TypePayment:
 *          type: string
 *          description: Annonce's TypePayment in this region forfait ou reel
 *        NbVues:
 *          type: integer
 *          description: Annonce's prix in this region et il sincremente auto,  si type est forfait cette attribut est le prix totale de annonce si type est reel c est prix un vue
 *        PrixAnnonce:
 *          type: float
 *          description: Annonce's prix in this region si type est forfait cette attribut est le prix totale de annonce si type est reel c est prix un vue
 */
route.use('/annonceRegion', annonceRegionRoute);

/**
 * @swagger
 * components:
 *  schemas:
 *    AnnonceCategorie:
 *      type: object
 *      properties:
 *        idAnnonce:
 *          type: integer
 *          description: Annonce's id
 *        idCategorie:
 *          type: integer
 *          description: Region's id
 */
route.use('/annonceCategorie', annonceCategorieRoute);

/**
 * @swagger
 * components:
 *  schemas:
 *    Categorie:
 *      type: object
 *      properties:
 *        idCategorie:
 *          type: integer
 *          description: Categorie's id
 *        sexe:
 *          type: String
 *          description: sexe de cette Categorie F Femme, H Homme
 *        TrancheAge:
 *          type: String
 *          description: tranche d age E enfant, AS Adolescent , JA Jeune adulte , AD Adulte Categorie
 */
route.use('/categorie', categorie);

module.exports = route;