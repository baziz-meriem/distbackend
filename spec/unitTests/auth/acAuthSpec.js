const superTest = require('supertest');
const {server}=  require('../../../src/index.js'); 

const request = superTest(server);
const route = "/api/v1/auth/ac";


const acLoginTest = {
    "email": "ouael2019esi@gmail.com",
    "password": "1234567891"
};

describe(`POST ${route}/login`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(`${route}/login`).send(acLoginTest);
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.post(`${route}/login`).send({});
        expect(response.status).toBe(400);
    });
})
