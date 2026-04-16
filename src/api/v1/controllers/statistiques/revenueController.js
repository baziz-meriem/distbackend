const { validateId } = require('../../validators/inputValidation');
const { getRevenueClient, getRevenueDistributeur, getRevenueBoisson,getRevenueClientByDistributeur,getRevenueClientByBoisson,getRevenueClientByRegion } = require('../../services/statistiques/revenueService');

const getRevenueHandler = async (req, res) => {
    const { idClient } = req.params;
    const {  dateDebut=new Date(-1), dateFin=new Date() } = req.query;
    const valideId = validateId(idClient);
    if (!valideId) {
        return res.status(400).json({ message: 'Invalid idClient' });
    }
    console.log({dateDebut,dateFin});
    const total = await getRevenueClient(valideId, { dateDebut, dateFin })
    if (typeof total === 'string') {
        return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: "OK", data: { revenue: total } });
};

const getRevenueByDistributeurHandler = async (req, res) => {
    const { id } = req.params;
    const {  dateDebut=new Date(-1), dateFin=new Date() } = req.query;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    const total = await getRevenueDistributeur(valideId, { dateDebut, dateFin })
    if (typeof total === 'string') {
        return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: "OK", data: { revenue: total } });
}

const getRevenueByBoissonHandler = async (req, res) => {
    const { id,idClient } = req.params;
    const {  dateDebut=new Date(-1), dateFin=new Date() } = req.query;
    const valideId = validateId(id);
    const valideClientId = validateId(idClient);
    if (!valideId || !valideClientId) {
        return res.status(400).json({ message: 'Invalid id/ clientId' });
    }
    const total = await getRevenueBoisson(valideId, valideClientId, { dateDebut, dateFin })
    if (typeof total === 'string') {
        return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: "OK", data: { revenue: total } });
}

const getRevenueClientByDistributeurHandler = async (req, res) => {
    const { idClient } = req.params;
    const {  dateDebut=new Date(-1), dateFin=new Date() } = req.query;
    const valideId = validateId(idClient);
    if (!valideId) {
        return res.status(400).json({ message: 'Invalid idClient' });
    }
    const revenue = await getRevenueClientByDistributeur(valideId, { dateDebut, dateFin })
    if (typeof total === 'string') {
        return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: "OK", data: revenue });
}

const getRevenueAllBoissonHandler = async (req, res) => {
    const { idClient } = req.params;
    const {  dateDebut=new Date(-1), dateFin=new Date() } = req.query;
    const valideId = validateId(idClient);
    if (!valideId) {
        return res.status(400).json({ message: 'Invalid idClient' });
    }
    const revenue = await getRevenueClientByBoisson(valideId, { dateDebut, dateFin })
    if (typeof total === 'string') {
        return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: "OK", data: revenue });
}

const getRevenueClientByRegionHandler = async (req, res) => {
    const { idClient } = req.params;
    const {  dateDebut=new Date(-1), dateFin=new Date() } = req.query;
    const valideId = validateId(idClient);
    if (!valideId) {
        return res.status(400).json({ message: 'Invalid idClient' });
    }
    const revenue = await getRevenueClientByRegion(valideId, { dateDebut, dateFin })
    if (typeof total === 'string') {
        return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: "OK", data: revenue });
}

module.exports = {
    getRevenueHandler,
    getRevenueByDistributeurHandler,
    getRevenueByBoissonHandler,
    getRevenueClientByDistributeurHandler,
    getRevenueAllBoissonHandler,
    getRevenueClientByRegionHandler
}