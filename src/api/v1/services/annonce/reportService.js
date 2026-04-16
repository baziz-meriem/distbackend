const prisma = require('../../../../config/dbConfig');
const {getOneAnnonceRegionByIdAnnonce} = require("../../services/annonce/annonceregionService");
const {getRegionById} = require("../../services/resourceManagement/regionService")
const {getOneAnnonceur} = require("../annonce/annonceurService")

const getReportAnnonces = async (id) => {
    try {
      
     // const annonces = await prisma.annonce.findMany();
      const annonces = await prisma.annonce.findMany({
        where: {
            idAnnonceur : parseInt(id) 
        }
    });
      const result = [];
  
      for (const annonce of annonces) {
        const annonceRegions = await getOneAnnonceRegionByIdAnnonce(annonce.id);
        const extractedData = [];
  
        for (const annonceRegion of annonceRegions) {
          const { idRegion, ...rest } = annonceRegion;
          const region = await getRegionById(idRegion);
  
          if (region) {
            extractedData.push({ ...rest, region: region.nom });
          }
        }
  
        const annonceur = await getOneAnnonceur(annonce.idAnnonceur);
  
        if (annonceur) {
          result.push({
            annonce: {
              idAnnonceur: annonceur.id,
              nomAnnonceur: annonceur.nom, // Include the name of the annonceur
              annonceRegions: extractedData
            }
          });
        }
      }
  
      return result;
    } catch (error) {
      return null;
    }
  };
  
  
  
module.exports = {
    getReportAnnonces
}