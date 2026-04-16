const superTest = require('supertest');
const {server}=  require('../../../src/index.js'); 

const request = superTest(server);
const route = "/api/v1/auth/consommateur";

const costumerTest = {
    "nom": "meryem",
    "prenom": "meryem",
    "email": "meryemmeryem@esi.dz",
    "password": "meryem12345678910",
    "numTel": "1234567892",
};
const costumerLoginTest = {
    "email": "meryemmeryem@esi.dz",
    "password": "meryem12345678910"
};

describe(`POST ${route}/login`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(`${route}/login`).send(costumerLoginTest);
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.post(`${route}/login`).send({});
        expect(response.status).toBe(400);
    });
})
