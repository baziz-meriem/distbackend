const prisma = require('../../../../config/dbConfig')


const getAllReclamation = async () => {
    try {
        const reclamations = await prisma.Reclamation.findMany();
        return reclamations;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const getReclamationByPayment= async (idPayment) => {
    try {
        const reclamation = await prisma.reclamation.findMany({
            where:{
                idPayment:idPayment
            },
            include:{
                Reponse:true
            }
        });
        return reclamation;
    } catch (error) {
        console.log(error)
        return null;
    }
}


const getOneReclamation = async (id) => {
    try {
        const reclamation = await prisma.Reclamation.findFirst({
            where: {
                id
            }
        })
        return reclamation;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createReclamation = async (subject,description,idPayment) => {
    try {
        const reclamation = await prisma.Reclamation.create({
            data: {
                subject,
                description,
                idPayment,
                status: "Non traite",
            }
        })
        return reclamation;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateReclamation = async (id,subject,description,status) => {
    try {
        const reclamation = await prisma.Reclamation.update({
            where: {
                id
            },
            data: {
                subject,
                description,
                status,
            }
        })
        return reclamation;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const deleteReclamation = async (id) => {
    try {
        const reclamation = await prisma.Reclamation.delete({
            where: {
                id
            }
        })
        return reclamation;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getOneReclamation,
    createReclamation,
    updateReclamation,
    deleteReclamation,
    getAllReclamation,
    getReclamationByPayment
}