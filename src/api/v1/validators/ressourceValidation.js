const { validateId, validateDate, validateInput } = require('./inputValidation')

const validatePanne = ({  idDistributeur, idTypeAnomalie }) => {
    /**
     * @description validate the panne format , if its valide, return it with the correct format else return null
     */

    // validate the distributeur's id
    const valideIdDistributeur = validateId(idDistributeur)
    // validate the typeAnomalie's id
    const valideIdTypeAnomalie = validateId(idTypeAnomalie)
    
    if ( !valideIdDistributeur || !valideIdTypeAnomalie ) {
        return null
    }
    return {
        idDistributeur: valideIdDistributeur,
        idTypeAnomalie: valideIdTypeAnomalie,
    }
}

const validateTypeAnnomalie = ({ type, description }) => {
    /**
     * @description validate the typeAnnomalie format , if its valide, return it with the correct format else return null
     * @param {string} type
     * @param {string} description
     * @returns {object} typeAnnomalie
     */
    // validate the type
    const validateType = validateInput(type)
    // validate the description
    const validateDescription = validateInput(description)
    if (!validateType || !validateDescription) {
        return null
    }
    return {
        type: validateType,
        description: validateDescription
    }

}

module.exports = {
    validatePanne,
    validateTypeAnnomalie
}