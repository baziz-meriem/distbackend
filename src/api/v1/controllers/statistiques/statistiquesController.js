const { getFixedPannesByMonth, getFixedPannesByYear, getFixedPannesByWeek } = require('../../services/statistiques/statistiquesService');




//statistiques représentant le nombre de pannes par mois 
const getFixedPannesByMonthHandler = async (req, res) => {
    // call the service to get the pannes sorted by months 
    const pannes = await getFixedPannesByMonth(req,res);
    
    if(!pannes){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while trying to get number of pannes created in each month'
       
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'All pannes retrieved successfully',
        data: pannes
    });

};

//statistiques représentant le nombre de pannes par annees
const getFixedPannesByYearHandler = async (req, res) => {
    // call the service to get the pannes sorted by year 
    const pannes = await getFixedPannesByYear(req,res);
    
    if(!pannes){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while trying to get number of pannes created in each month'
       
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'All pannes retrieved successfully',
        data: pannes
    });

};

//statistiques représentant le nombre de pannes par semaines
const getFixedPannesByWeekHandler = async (req, res) => {
    // call the service to get the pannes sorted by weeks
    const pannes = await getFixedPannesByWeek(req,res);
    
    if(!pannes){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while trying to get number of pannes created in each month'
       
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'All pannes retrieved successfully',
        data: pannes
    });

};



module.exports = {
    getFixedPannesByMonthHandler,
    getFixedPannesByYearHandler,
    getFixedPannesByWeekHandler
}