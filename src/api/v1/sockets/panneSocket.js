const {validatePanne}= require('../validators/ressourceValidation')
const {createPanne}= require('../services/resourceManagement/panneService')

const panneHandler = async (socket, data) => {
    // validate the data before sending it to the client and the database
    const validePanne = validatePanne(data);
    // if the data is valid, send it to the client and the database
    if (validePanne) {
        const panne = await createPanne(data.idDistributeur, data.idTypeAnomalie);
        if (panne) {
            socket.to(socket.idClient.toString()).emit('panne', panne);
        }
    }
}

module.exports = panneHandler;