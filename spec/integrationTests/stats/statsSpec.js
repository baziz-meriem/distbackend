const superTest = require('supertest');
const {server}=  require('../../../src/index.js'); 

const request = superTest(server);



describe('Stats routes tests', () => {

describe('GET /api/v1/stats/distributeurs', () => {
    it('should return 200', async () => {
        const response = await request.get('/api/v1/stats/distributeurs');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/stats/month', () => {
    it('should return 200', async () => {
        const response = await request.get('/api/v1/stats/month');
        expect(response.status).toBe(200);
    });
});

});