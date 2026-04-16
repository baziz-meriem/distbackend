const {  getIdDistributeurByIdClient, getNbCmdByIdDistributeurByPeriode, getNbCmdInDistributeursByIdClientByPeriode, getNbPayByIdDistributeurByPeriode, getNbPayInDistributeursByIdClientByPeriode, getIdDistributeursInRegionsByIdClientByPeriode } = require('../../services/statistiques/utlizabilityDistributeurService');
const {  validateId } = require('../../validators/inputValidation');
const { convertDate } = require('./../../middlewares/transformeDate');

const getNbCmdByDistByPeriodeHandler = async (req, res) => {

    const {IdDistributeur, dateDebut, dateFin} = req.params;

    const valideId = validateId(IdDistributeur);
    
    const dateDebutFormated = convertDate(dateDebut);
    const dateFinFormated = convertDate(dateFin);
    const periode = { dateDebutFormated, dateFinFormated };
    
    const cmds = await getNbCmdByIdDistributeurByPeriode( valideId ,periode);
    
    if( (cmds == null) || ( typeof cmds === "string") ){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: cmds
        });
    }
    return res.status(200).json({
        status: 'Success',
        message: 'result retrieved successfully',
        data: cmds
    });
};

const getNbCmdByDistByClientByPeriodeHandler = async (req, res) => {

    const {IdClient, dateDebut, dateFin} = req.params;
    const valideId = validateId(IdClient);

    const dateDebutFormated = convertDate(dateDebut);
    const dateFinFormated = convertDate(dateFin);
    const periode = { dateDebutFormated, dateFinFormated };
    
    const cmds = await getNbCmdInDistributeursByIdClientByPeriode( valideId, periode );
    
    if( (cmds == null) || ( typeof cmds === "string") ){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: cmds
        });
    }
    return res.status(200).json({
        status: 'Success',
        message: 'result retrieved successfully',
        data: cmds
    });
};

const getNbPayByDistByPeriodeHandler = async (req, res) => {
    const {IdDistributeur, dateDebut, dateFin} = req.params;
    const valideId = validateId(IdDistributeur);

    const dateDebutFormated = convertDate(dateDebut);
    const dateFinFormated = convertDate(dateFin);
    const periode = { dateDebutFormated, dateFinFormated };


    const transcations = await getNbPayByIdDistributeurByPeriode( valideId, periode );
    
    if( (transcations == null) || ( typeof transcations === "string") ){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: transcations
        });
    }
    return res.status(200).json({
        status: 'Success',
        message: 'result retrieved successfully',
        data: transcations
    });
};
const getNbPayByDistByClientByPeriodeHandler = async (req, res) => {
    const {IdClient, dateDebut, dateFin} = req.params;
    const valideId = validateId(IdClient);

    const dateDebutFormated = convertDate(dateDebut);
    const dateFinFormated = convertDate(dateFin);
    const periode = { dateDebutFormated, dateFinFormated };

    
    const transcations = await getNbPayInDistributeursByIdClientByPeriode( valideId , periode );
    
    if( (transcations == null) || ( typeof transcations === "string") ){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: transcations
        });
    }
    return res.status(200).json({
        status: 'Success',
        message: 'result retrieved successfully',
        data: transcations
    });
};

const getNbCmdByDistByRegionByClientByPeriodeHandler = async (req, res) => {
    const {IdClient, dateDebut, dateFin} = req.params;
    const valideId = validateId(IdClient);
    const dateDebutFormated = convertDate(dateDebut);
    const dateFinFormated = convertDate(dateFin);
    const periode = { dateDebutFormated, dateFinFormated };

    
    const cmds = await getIdDistributeursInRegionsByIdClientByPeriode( valideId , periode );
    
    if( (cmds == null) || ( typeof cmds === "string") ){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: cmds
        });
    }
    return res.status(200).json({
        status: 'Success',
        message: 'result retrieved successfully',
        data: cmds
    });
};



module.exports = {
    getNbCmdByDistByPeriodeHandler,
    getNbCmdByDistByClientByPeriodeHandler,
    getNbPayByDistByClientByPeriodeHandler,
    getNbPayByDistByPeriodeHandler,
    getNbCmdByDistByRegionByClientByPeriodeHandler
}