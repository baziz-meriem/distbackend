const prisma = require('../../../../config/dbConfig');
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getAllAnnonceCategories = async () => {
    try {
        const AnnonceCategories = await prisma.AnnonceCategorie.findMany();
        return AnnonceCategories;
    } catch (error) {
        return catchPrismaClientError(error);
    }
};

const getCategorieOfAnnonce = async (idAnnonce ) => {
    try {
        const AnnonceCategorie = await prisma.Annonce.findMany({
            where: {
                id: idAnnonce
                },
            include: 
            { 
                AnnonceCategorie: 
                    { 
                        select: { categorie: true } 
                    } 
            }
        });
        return AnnonceCategorie;
    } catch (error) {
        return catchPrismaClientError(error);
    }
}

const getAnnoncesBySexeAge = async ( idClient, {sexe, TrancheAge} ) => {
    try {
        const CategorieExists = await prisma.categorie.findMany({
            where: {
                sexe: sexe,
                TrancheAge: TrancheAge
            },
            select:{
                id:true
            }
        });

        const idCategorie = CategorieExists[0].id

        const AnnonceCategorie = await prisma.annonce.findMany({
            where: {
                annonceur:{
                    idClient: idClient
                },
                AnnonceCategorie: {
                    some: {
                        idCategorie: idCategorie
                    }
                }
            },
            select: {
                id: true,
                video: true,
                periodeAffichage: true,
                DateDebut: true,
                DateFin: true,
                idBoisson: true,
                idAnnonceur: true,
            }
        });
        
        return AnnonceCategorie;
    } catch (error) {
        return catchPrismaClientError(error);
    }
}


const createAnnonceCategorie = async ({idAnnonce, idCategorie}) => {
    try { 

        const newAnnonceCategorie = await prisma.AnnonceCategorie.create({
            data: {
                idAnnonce: parseInt (idAnnonce),
                idCategorie: parseInt(idCategorie)
            }
        });
        return newAnnonceCategorie;
    } catch (error) {
        return catchPrismaClientError(error);
    }
}

const updateAnnonceCategorie = async (idAnnonce, idCategorie) => {
    // check if the ID exists in the database

    try {
        const AnnonceCategorie = await prisma.AnnonceCategorie.updateMany({
            where: { 
                idAnnonce: parseInt(idAnnonce) ,
                idCategorie : parseInt(idCategorie)
            },
            data: {
                idAnnonce: parseInt(idAnnonce),
                idCategorie : parseInt(idCategorie),
            }
        });
        return AnnonceCategorie;
    } catch (error) {
        return catchPrismaClientError(error);
    }
}

const deleteAnnonceCategorie = async (idAnnonce, idCategorie) => {

    try {

        const AnnonceCategorie = await prisma.AnnonceCategorie.delete({
            where: {
                idAnnonce_idCategorie: {
                    idAnnonce: parseInt(idAnnonce),
                    idCategorie : parseInt(idCategorie)
                },
            },
        });
        
        return AnnonceCategorie;
    } catch (error) {
        return catchPrismaClientError(error);
    }
}

module.exports = {
    getAllAnnonceCategories,
    getCategorieOfAnnonce,
    createAnnonceCategorie,
    updateAnnonceCategorie,
    deleteAnnonceCategorie,
    getAnnoncesBySexeAge
}