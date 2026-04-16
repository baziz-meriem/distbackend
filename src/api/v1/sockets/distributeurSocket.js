const {validateDistributeur}= require('../validators/profileValidation');
const {updateDistributeur}= require('../services/resourceManagement/distributeurService');
const {createTentativeVol}= require('../services/resourceManagement/tentativeVolService.js');

const distributeurHandler=async (socket,data,event)=>{
    // validate the data before sending it to the client and the database
    const valideDistributeur = validateDistributeur(data);
    // if the data is valid, send it to the client and the database
    if(valideDistributeur){
        const distributeur = await updateDistributeur(data.id,data);
        await createTentativeVol(data.idDistributeur, data.position);
        if(distributeur){
            socket.to(socket.idClient.toString()).emit(event, data);
        }
    }
}

module.exports = distributeurHandler;