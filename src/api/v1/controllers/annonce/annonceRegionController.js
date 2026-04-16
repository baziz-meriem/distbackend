const {validateId} = require('../../validators/inputValidation');

const { getAllAnnonceRegions, getOneAnnonceRegionByIdAnnonce, createAnnonceRegion, updateAnnonceRegion, deleteAnnonceRegion} = require('../../services/annonce/annonceregionService');

const getAllHandler = async (req,res) => { //get all AnnonceRegions
    // call the service to get all AnnonceRegions
    try{
        const AnnonceRegions = await getAllAnnonceRegions();
        return res.status(200).json({
            status: 'OK',
            message: 'All AnnonceRegions retrieved successfully',
            data: AnnonceRegions
        });
    }
    catch(error)
    {
        return (res.status(400).json({ status: "failed", message:"y'a err"}))
    }
    
};

const getOneHandler = async (req, res) => { 
        // get the id from the request params
        const { idAnnonce } = req.params;
        const valideIdAnnonce = validateId(idAnnonce);

        // call validateId to validate the id
        // call the service to get one AnnonceRegion
        const AnnonceRegion = await getOneAnnonceRegionByIdAnnonce( valideIdAnnonce );
        if(!AnnonceRegion){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while getting AnnonceRegion'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'AnnonceRegion retrieved successfully',
            data: AnnonceRegion
        });

}

const createHandler = async (req, res) => { //create a new AnnonceRegion
    // get the data from the request body
    // call the service to create the AnnonceRegion
    const annonceRegion = req.body;
    const AnnonceRegion = await createAnnonceRegion( annonceRegion );
    if(!AnnonceRegion){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while creating AnnonceRegion'
        });
    }
    return res.status(201).json({
        status: 'success',
        message: 'AnnonceRegion created successfully',
        data: AnnonceRegion
    });
}

const updateHandler = async (req, res) => { //update AnnonceRegion
        
        // call the service to update the AnnonceRegion
        const { idAnnonce, idRegion } = req.params;
        const valideIdAnnonce = validateId(idAnnonce);
        const valideIdRegion = validateId(idRegion);

        const annonceRegion = req.body;

        const AnnonceRegion = await updateAnnonceRegion({idAnnonce:valideIdAnnonce,idRegion: valideIdRegion}, annonceRegion);
        if(!AnnonceRegion){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while updating AnnonceRegion'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'AnnonceRegion updated successfully',
            data: AnnonceRegion
        });

}

const deleteHandler = async (req, res) => { //delete an AnnonceRegion
        const { idAnnonce, idRegion } = req.params;
        const valideIdAnnonce = validateId(idAnnonce);
        const valideIdRegion = validateId(idRegion);

        const AnnonceRegion = await deleteAnnonceRegion( {valideIdAnnonce,valideIdRegion });
    
        if(!AnnonceRegion){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while deleting AnnonceRegion '
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'AnnonceRegion deleted successfully',
            data: AnnonceRegion
        });
    
}

module.exports = {
    getAllHandler,
    getOneHandler,
    createHandler,
    updateHandler,
    deleteHandler,
}