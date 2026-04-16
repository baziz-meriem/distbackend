const { annonce } = require('../../../config/dbConfig');
const { validateInput, validateEmail, validatePassword, validatePhoneNumber, validateId } = require('./inputValidation');

const validateAgent = (agent) => {
    /**
     * @description validate the agent and return it or null if it is not valid
     * @param {object} agent
     * @returns {object|null}
    */
    const { nom, prenom, email, password, numTel, idClient } = agent;
    const valideNom = validateInput(nom);
    const validePrenom = validateInput(prenom);
    const valideEmail = validateEmail(email);
    const validePassword = validatePassword(password);
    const valideNumTel = validatePhoneNumber(numTel);
    const valideIdClient = validateId(idClient);
    if (!valideNom || !validePrenom || !valideEmail || !validePassword || !valideNumTel || !valideIdClient) {
        return null;
    }
    return {
        nom: valideNom,
        prenom: validePrenom,
        email: valideEmail,
        password: validePassword,
        numTel: valideNumTel,
        idClient: valideIdClient
    };
}

const validateCostumer = (Costumer) => {
    if (!Costumer || typeof Costumer !== 'object') {
        return null;
    }
    const nom = Costumer.nom != null ? String(Costumer.nom).trim() : '';
    const prenom = Costumer.prenom != null ? String(Costumer.prenom).trim() : '';
    const valideNom = nom ? validateInput(nom) : null;
    const validePrenom = prenom ? validateInput(prenom) : null;
    const valideEmail = validateEmail(Costumer.email);
    const validePassword = validatePassword(Costumer.password);
    const valideNumTel = validatePhoneNumber(Costumer.numTel);
    if (!valideNom || !validePrenom || !valideEmail || !validePassword || !valideNumTel) {
        return null;
    }
    return {
        nom: valideNom,
        prenom: validePrenom,
        email: valideEmail,
        password: validePassword,
        numTel: valideNumTel
    };
};

/** When validateCostumer fails, explains what to fix (for API responses). */
const registerCostumerHints = (Costumer) => {
    if (!Costumer || typeof Costumer !== 'object') {
        return ['Send JSON with nom, prenom, email, password, numTel'];
    }
    const hints = [];
    const nom = Costumer.nom != null ? String(Costumer.nom).trim() : '';
    const prenom = Costumer.prenom != null ? String(Costumer.prenom).trim() : '';
    if (!nom) {
        hints.push('nom is required');
    }
    if (!prenom) {
        hints.push('prenom is required');
    }
    if (!validateEmail(Costumer.email)) {
        hints.push('email must be a valid address');
    }
    if (!validatePassword(Costumer.password)) {
        hints.push('password must be at least 6 characters');
    }
    if (!validatePhoneNumber(Costumer.numTel)) {
        hints.push('numTel: use 10 digits (e.g. 0612345678), or international +33 6 12 34 56 78');
    }
    return hints;
};


const validateClient = (Client)=> {
    const { nom,email,numTel } = Client;
    const valideNom = validateInput(nom);
    const valideEmail = validateEmail(email);
    const valideNumTel = validatePhoneNumber(numTel);
    /*if (!valideNom || !valideEmail || valideNumTel) {
        return null;
    }*/
    return {
        nom: nom,
        email: email,
        numTel: numTel
    };
}


const validateSADM = (SADM) => {
    /**
     * @description validate SADM and return it or null if it is not valid
     * @param {object} SADM
     * @returns {object|null}
    */
    const { nom, prenom, email, password, numTel } = SADM;
    const valideNom = validateInput(nom);
    const validePrenom = validateInput(prenom);
    const valideEmail = validateEmail(email);
    const validePassword = validatePassword(password);
    const valideNumTel = validatePhoneNumber(numTel);
    if (!valideNom || !validePrenom || !valideEmail || !validePassword || !valideNumTel ) {
        console.log("y'a err et voila ou: ",valideNom, validePrenom,valideEmail, validePassword,  valideNumTel );
        return null;
    }
    return {
        nom: valideNom,
        prenom: validePrenom,
        email: valideEmail,
        password: validePassword,
        numTel: valideNumTel,
    };
}

const validateADM = (ADM) => {
    /**
     * @description validate ADM and return it or null if it is not valid
     * @param {object} ADM
     * @returns {object|null}
    */
     const { nom, prenom, email, password, numTel, idClient } = ADM;
     const valideNom = validateInput(nom);
     const validePrenom = validateInput(prenom);
     const valideEmail = validateEmail(email);
     const validePassword = validatePassword(password);
     const valideNumTel = validatePhoneNumber(numTel);
     const valideIdClient = validateId(idClient);
     if (!valideNom || !validePrenom || !valideEmail || !validePassword || !valideNumTel || !valideIdClient) {
         return null;
     }
     return {
         nom: valideNom,
         prenom: validePrenom,
         email: valideEmail,
         password: validePassword,
         numTel: valideNumTel,
         idClient: valideIdClient
     };
}

const validateAM = (AM) => {
    /**
     * @description validate AM and return it or null if it is not valid
     * @param {object} AM
     * @returns {object|null}
    */
     const { nom, prenom, email, mot_de_passe, numTel, idClient } = AM;
     const valideNom = validateInput(nom);
     const validePrenom = validateInput(prenom);
     const valideEmail = validateEmail(email);
     const validePassword = validatePassword(mot_de_passe);
     const valideNumTel = validatePhoneNumber(numTel);
     const valideIdClient = validateId(idClient);
     //const valideDistS = validateDistS(DistS);
    //console.log("AM VALIDATE = ", { valideNom ,validePrenom ,valideEmail ,validePassword ,valideNumTel ,valideIdClient} )
     if (!valideNom || !validePrenom || !valideEmail || !validePassword || !valideNumTel || !valideIdClient ) {
         return null;
     }
     return {
         nom: valideNom,
         prenom: validePrenom,
         email: valideEmail,
         password: validePassword,
         numTel: valideNumTel,
         idClient: valideIdClient,
         //distS: valideDistS
     };
}

const validateAnnonceur = (Annonceur) => {
    /**
     * @description validate Annonceur and return it or null if it is not valid
     * @param {object} Annonceur
     * @returns {object|null}
     *  */
    const { nom, idClient,email } = Annonceur;
    const valideNom = validateInput(nom);
    const valideIdClient = validateId(idClient);
    const valideEmail = validateEmail(email);
    if (!valideNom || !valideIdClient || !valideEmail) {
        return null;
    }
    return {
        nom: valideNom,
        idClient: valideIdClient,
        email: valideEmail,
        phoneNumber: validatePhoneNumber(Annonceur.phoneNumber),
        Adr: validateInput(Annonceur.Adr)
    };
}

const validateDistributeur = (Distributeur) => {
    /**
     * @description validate Distributeur and return it or null if it is not valid
     * @param {object} Distributeur
     * @returns {object|null}
    */
    const { etat, type, position, codeDeverouillage, idClient, idRegion, idAM} = Distributeur;
    const valideEtat = validateInput(etat);
    const valideType = validateInput(type);
    const validePosition = validateInput(position);
    const valideIdClient = validateId(idClient);
    const valideIdRegion = validateId(idRegion);
    const valideIdAM = validateId(idAM);
    const valideCodeDeverouillage= validateInput(codeDeverouillage);
        if (!valideEtat || !valideType || !validePosition || !valideIdRegion  || !valideCodeDeverouillage ) {
        console.log("y'a err et voila ou: ",valideEtat, valideType,validePosition, valideIdClient,  valideIdRegion,valideIdAM, valideCodeDeverouillage);
        return null;
    }
    return {
        etat: valideEtat,
        type: valideType,
        position: validePosition,
        idClient: valideIdClient,
        idRegion: valideIdRegion,
        idAM: valideIdAM,
        codeDeverouillage: valideCodeDeverouillage
    };
}

const validateSupplement = (supplement) => {
    /**
     * @description validate Supplement and return it or null if it is not valid
     * @param {object} Supplement
     * @returns {object|null}
    */
    const {label} = supplement;
    const valideLabel = validateInput(label);
        if (!valideLabel ) {
        console.log("y'a err et voila ou: ",valideLabel);
        return null;
    }
    return {
        label: valideLabel,
    };
}


module.exports = {
    validateAgent,
    validateCostumer,
    registerCostumerHints,
    validateClient,
    validateSADM,
    validateADM,
    validateAM,
    validateAnnonceur,
    validateDistributeur,
    validateSupplement
}
