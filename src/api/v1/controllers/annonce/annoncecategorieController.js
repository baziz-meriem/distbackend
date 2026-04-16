
const { getAllAnnonceCategories, getAnnoncesBySexeAge,getCategorieOfAnnonce, createAnnonceCategorie, updateAnnonceCategorie, deleteAnnonceCategorie} = require('../../services/annonce/annoncecategorieService');
const {  validateId } = require('../../validators/inputValidation');
const { incrementViews } = require("../../services/annonce/annonceregionService")

const getAllHandler = async (req,res) => { //get all AnnonceCategories
    // call the service to get all AnnonceCategories
    try{
        const AnnonceCategories = await getAllAnnonceCategories();
        
        if( typeof AnnonceCategories === 'string'){
            return res.status(400).json({
                status: 'Bad Request',
                message: AnnonceCategories
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'All AnnonceCategories retrieved successfully',
            data: AnnonceCategories
        });
    }
    catch(error)
    {
        return res.status(500).json({
            status: 'Bad Request',
            message: 'Error while doing action in AnnonceCategorie'
        });    
    }
    
};

const getOneHandler = async (req, res) => { 
        // get the id from the request params
        var { idAnnonce } = req.params;
        const valideId = validateId(idAnnonce);

        // call validateId to validate the id
    try{

        const AnnonceCategorie = await getCategorieOfAnnonce( valideId );

        if( typeof AnnonceCategorie === 'string'){
            return res.status(400).json({
                status: 'Bad Request',
                message: AnnonceCategorie
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'AnnonceCategorie retrieved successfully',
            data: AnnonceCategorie
        });
    }
    catch(error)
    {
        return res.status(500).json({
            status: 'Bad Request',
            message: 'Error while doing action in AnnonceCategorie'
        });    
    }
}

const getOneHandlerBySexeAge = async (req, res) => { 
    // get the id from the request params
    const {idClient, idRegion} = req.params;
    const valideIdClient = validateId(idClient);
    const valideIdRegion = validateId(idRegion);

    const { sexe, TrancheAge  } = req.body;
    // call validateId to validate the id
try{
    const AnnonceCategorie = await getAnnoncesBySexeAge( valideIdClient, { sexe, TrancheAge } );
    
    if( typeof AnnonceCategorie === 'string'){
        return res.status(400).json({
            status: 'Bad Request',
            message: AnnonceCategorie
        });
    }
    //incremantation nombre de vue
    const AnnonceCategorieUne = AnnonceCategorie[0]
    await incrementViews( AnnonceCategorieUne.id, valideIdRegion )

    return res.status(200).json({
        status: 'OK',
        message: 'AnnonceCategorie retrieved successfully',
        data: AnnonceCategorieUne
    });
}
catch(error)
    {
        return res.status(500).json({
            status: 'Bad Request',
            message: 'Error while doing action in AnnonceCategorie'
        });    
    }
}

const createHandler = async (req, res) => { //create a new AnnonceCategorie

try{
    const {idAnnonce, idCategorie} = req.body

    const AnnonceCategorie = await createAnnonceCategorie( {idAnnonce, idCategorie} );
    
    if( typeof AnnonceCategorie === 'string'){
        return res.status(400).json({
            status: 'Bad Request',
            message: AnnonceCategorie
        });
    }

    return res.status(201).json({
        status: 'success',
        message: 'AnnonceCategorie created successfully',
        data: AnnonceCategorie
    });
}
catch(error)
    {
        return res.status(500).json({
            status: 'Bad Request',
            message: 'Error while doing action in AnnonceCategorie'
        });    
    }
}

const updateHandler = async (req, res) => { //update AnnonceCategorie
        
        // call the service to update the AnnonceCategorieur
    try{
        const { idAnnonce } = req.params;
        const valideId = validateId(idAnnonce);

        const { idCategorie } = req.body

        const AnnonceCategorie = await updateAnnonceCategorie(valideId, idCategorie);
        
        if( typeof AnnonceCategorie === 'string'){
            return res.status(400).json({
                status: 'Bad Request',
                message: AnnonceCategorie
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'AnnonceCategorie updated successfully',
            data: AnnonceCategorie
        });
    }
    catch(error)
    {
        return res.status(500).json({
            status: 'Bad Request',
            message: 'Error while doing action in AnnonceCategorie'
        });    
    }
}

const deleteHandler = async (req, res) => { //delete an AnnonceCategorie
        
    try{
        const { idAnnonce, idCategorie } = req.params;
        const valideIdAnnonce = validateId(idAnnonce);
        const valideIdCategorie = validateId(idCategorie);

        const AnnonceCategorie = await deleteAnnonceCategorie( valideIdAnnonce, valideIdCategorie);
        
        if( typeof AnnonceCategorie === 'string'){
            return res.status(400).json({
                status: 'Bad Request',
                message: AnnonceCategorie
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'AnnonceCategorie deleted successfully',
            data: AnnonceCategorie
        });
    }
    catch(error)
    {
        return res.status(500).json({
            status: 'Bad Request',
            message: 'Error while doing action in AnnonceCategorie'
        });    
    }
}

module.exports = {
    getAllHandler,
    getOneHandler,
    getOneHandlerBySexeAge,
    createHandler,
    updateHandler,
    deleteHandler
}