const prisma = require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');
const { convertDate } = require("../../middlewares/transformeDate")

const getAllDistributeurs = async () => {
  try {
    const distributeurs = await prisma.Distributeur.findMany({
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
        idClient: true,
        dateAffectation: true,
        idRegion: true,
        idAM: true
      },
    });

    return distributeurs;
  } catch (error) {
    return (catchPrismaClientError(error));
  }
};
const getByAM = async (amId) => {
  try {
    const distributeurs = await prisma.Distributeur.findMany({
      where: {
        idAM: parseInt(amId),
      },
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
        idClient: true,
        idRegion: true,
        idAM: true,
        codeDeverouillage: true,
      },
    });
    return distributeurs;
  } catch (error) {
    return null;
  }
};

const getByClient = async (clientId) => {
  try {
    const distributeurs = await prisma.distributeur.findMany({
      where: {
        idClient: parseInt(clientId),
      },
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
        codeDeverouillage:true,
        dateAffectation: true,
        client:{
          select:{
            nom: true,
          }    
        },
        region:{
          select:{
            nom: true,
          }
        },
        AM:{
          select:{
            nom: true,
            prenom : true,
          }
        }
      },
    })
    const results=distributeurs.map((distributeur) => {
      return{
        ...distributeur,
        client: distributeur.client.nom,
        region: distributeur.region.nom,
        AM: `${distributeur.AM.nom} ${distributeur.AM.prenom}`,
      }
    });
    return results;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};


const getDistributeurById = async (id) => {
  try {
    const distributeur = await prisma.Distributeur.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
        idClient: true,
        dateAffectation: true,
        idRegion: true,
        idAM: true,
        codeDeverouillage: true,
      },
    });
    return distributeur;
  } catch (error) {
    return (null);
  }
};

const createDistributeur = async ({etat, type, position,idClient, idRegion, idAM, codeDeverouillage}) => {
  
    try {
        const distributeur = await prisma.Distributeur.create({
            data: {
                etat: etat,
                type: type,
                position: position,
                idRegion: Number(idRegion),
                idAM: (idAM)?idAM:null,
                idClient: (idClient)?idClient:null,
                codeDeverouillage: codeDeverouillage
            },
            select: {
                id: true,
                etat: true,
                type: true,
                position: true,
                idClient: true,
                dateAffectation: true,
                idRegion: true,
                codeDeverouillage: true,
                idAM: true,
            }
        });
        return distributeur;
    } catch (error) {
        console.log(error.message);
        return (catchPrismaClientError(error));
    }
}

const deleteDistributeur = async (id) => {
  try {
    const deletedDistributeur = await prisma.Distributeur.delete({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
      },
    });
    return deletedDistributeur;
  } catch (error) {
    return (catchPrismaClientError(error));
  }
};

const updateDistributeur = async (id, distributeur) => {
  try {
    const existingDistributeur = await prisma.Distributeur.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const updatedDistributeur = await prisma.Distributeur.update({
      where: {
        id: parseInt(id),
      },
      data: {
        etat: distributeur.etat,
        type: distributeur.type,
        position: distributeur.position,
        idRegion: distributeur.idRegion,
        idAM: distributeur.idAM,
        idClient: distributeur.idClient,
        dateAffectation: distributeur.idClient !== existingDistributeur.idClient
        ? new Date()
        : existingDistributeur.dateAffectation,
        codeDeverouillage: distributeur.codeDeverouillage,
      },
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
        idClient: true,
        idRegion: true,
        idAM: true,
        codeDeverouillage: true,
        dateAffectation: true,
      },
    });
    return updatedDistributeur;
  } catch (error) {
    console.log(error);
    return (catchPrismaClientError(error));
  }
};

module.exports = {
  getAllDistributeurs,
  getByAM,
  getByClient,
  getDistributeurById,
  createDistributeur,
  deleteDistributeur,
  updateDistributeur,
};