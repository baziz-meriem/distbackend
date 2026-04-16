
const validateId = (id) => {
    /**
     * @description validate the id and return it or null if it is not valid
     * @param {number} id
     * @returns {number|null}
     */
    const idNumber = Number(id);
    if (Number.isNaN(idNumber)) {
        return null;
    }
    return idNumber;
}

const validateEmail = (email) => {
    /**
     * @description validate the email and return it or null if it is not valid
     * @param {string} email
     * @returns {string|null}
     */
    if (typeof email !== 'string') {
        return null;
    }
    if (email.length > 255) {
        return null;
    }
    // check if the email is valid using regex
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return null;
    }
    return email;
}

const validatePassword = (password) => {
    /**
     * @description validate the password and return it or null if it is not valid
     * @param {string} password
     * @returns {string|null}
     */
    if (typeof password !== 'string') {
        return null;
    }
    if (password.length < 6) {
        return null;
    }
    return password;
}

const validateInput = (input) => {
    /**
     * @description validate the input and return it or null if it is not valid
     * @param {any} input
     * @returns {any|null}
     */
    return input;
}

/**
 * Normalize to 10 French mobile digits (0XXXXXXXXX). Accepts spaces, +33, 0033, 9-digit mobiles.
 * @param {string|number} num
 * @returns {string|null}
 */
const normalizePhoneNumber = (num) => {
    if (num === undefined || num === null) {
        return null;
    }
    let s = String(num).trim();
    if (!s) {
        return null;
    }
    s = s.replace(/[\s().\-]/g, '');
    if (s.startsWith('00') && s.length > 2) {
        s = s.slice(2);
    }
    if (s.startsWith('+')) {
        s = s.slice(1);
    }
    let digits = s.replace(/\D/g, '');
    if (digits.startsWith('33') && digits.length >= 11) {
        digits = `0${digits.slice(2)}`;
    }
    if (digits.length === 9 && /^[67]/.test(digits)) {
        digits = `0${digits}`;
    }
    if (digits.length !== 10 || !/^[0-9]{10}$/.test(digits)) {
        return null;
    }
    return digits;
};

const validatePhoneNumber = (num) => {
    /**
     * @description validate the phone number and return normalized 10 digits or null
     * @param {string|number} num
     * @returns {string|null}
     */
    return normalizePhoneNumber(num);
};

const validateDate = (date) => {
    /**
     * @description validate the date and return it or null if it is not valid
     * @param {string} date
     * @returns {String|null}
    */
    const valideDate = new Date(date)
    if (isNaN(valideDate)) {
        return null
    }
    return valideDate.toISOString()
}

module.exports = {
    validateId,
    validateEmail,
    validatePassword,
    validateDate,
    validateInput,
    validatePhoneNumber,
    normalizePhoneNumber,
}