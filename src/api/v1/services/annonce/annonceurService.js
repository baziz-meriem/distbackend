const prisma = require('../../../../config/dbConfig');

const getAllAnnonceurs = async () => {
    try {
        const annonceurs = await prisma.annonceur.findMany();
        return annonceurs;
    } catch (error) {
        return null;
    }
};

const getAnnonceursByClient = async (idClient) => {
    try {
        const annonceurs = await prisma.annonceur.findMany({
            where: {
                idClient
            }
        });
        return annonceurs;
    } catch (error) {
        return null;
    }
};

const getOneAnnonceur = async (id) => {
    try {
        const annonceur = await prisma.annonceur.findUnique({
            where: {
                id
            }
        });
        return annonceur;
    } catch (error) {
        return null;
    }
}

const createAnnonceur = async (AnonceurInfos) => {
    try {
        const newAnnonceur = await prisma.annonceur.create({
            data: {
                nom: AnonceurInfos.nom,
                idClient: AnonceurInfos.idClient,
                email:AnonceurInfos.email,
                phoneNumber: AnonceurInfos.phoneNumber,
                Adr: AnonceurInfos.Adr
            }
        });
        return newAnnonceur;
    } catch (error) {
        return null;
    }
}

const updateAnnonceur = async (id, AnonceurInfos) => {
    try {
        const annonceur = await prisma.annonceur.update({
            where: {
                id
            },
            data: {
                nom: AnonceurInfos.nom,
                email:AnonceurInfos.email,
                phoneNumber: AnonceurInfos.phoneNumber,
                Adr: AnonceurInfos.Adr
            }
        });
        return annonceur;
    } catch (error) {
        return null;
    }
}

const deleteAnnonceur = async (id) => {
    try {
        const annonceur = await prisma.annonceur.delete({
            where: {
                id
            }
        });
        return annonceur;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getAllAnnonceurs,
    getAnnonceursByClient,
    getOneAnnonceur,
    createAnnonceur,
    updateAnnonceur,
    deleteAnnonceur
}