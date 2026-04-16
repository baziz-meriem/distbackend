const prisma = require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getAllCategories = async () => {
    /**
     * @description get all Categories from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').Categorie>} Categories
     */
    try {
        const Categories = await prisma.Categorie.findMany({
            select:{
                id: true,
                sexe: true,
                TrancheAge:true
            }
        });
        return Categories;
    } catch (error) {
        return(null)
    }
}

const getCategorieById = async (id) => {
    /**
     * @description get the Categorie with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Categorie>} Categorie
    */
    try {
        const Categorie = await prisma.Categorie.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                sexe: true,
                TrancheAge:true
            }
        });
        return Categorie;
    } catch (error) {
        return(null)
    }
}


const createCategorie = async ( categorieInfos ) => {
    /**
     * @description create a new Categorie in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @returns {Promise<null| import('@prisma/client').Categorie>} Categorie
     * @throws {Error} if the nom already exists
    */
    try {
        const Categorie = await prisma.Categorie.create({
            data: {
                sexe: categorieInfos.sexe,
                TrancheAge: categorieInfos.TrancheAge
            },
            select: {
                id: true,
                sexe: true,
                TrancheAge:true
            }
        });
        return Categorie;
    } catch (error) {
        return(null)
    }
}

const updateCategorie = async (id, Categorie) => {
    /**
     * @description update the Categorie with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').Categorie} Categorie
     * @returns {Promise<null| import('@prisma/client').Categorie>} Categorie
     * @throws {Error} if the Categorie does not exist
     */
    try {
        const updatedCategorie = await prisma.Categorie.update({
            where: {
                id: parseInt(id)
            },
            data: {
                sexe: Categorie.sexe,
                TrancheAge:Categorie.TrancheAge
            },
            select: {
                id: true,
                sexe: true,
                TrancheAge:true
            }
        });
        return updatedCategorie;
    } catch (error) {
        return(null)
    }
}

const deleteCategorie = async(id) => {
    /**
     * @description delete the Categorie with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Categorie>} Categorie
    */
    try {
        const deletedCategorie = await prisma.Categorie.delete({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                sexe: true,
                TrancheAge:true
            }
        });
        return deletedCategorie;
    } catch (error) {
        return(null)
    }
}

module.exports = 
{   getAllCategories, 
    getCategorieById, 
    createCategorie, 
    updateCategorie, 
    deleteCategorie 
}