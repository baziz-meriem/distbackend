const superTest = require('supertest');
const {server}=  require('../../src/index.js'); 

const request = superTest(server);

describe('GET /api/v1', () => {
    it('should return 200', async () => {
        const response = await request.get('/api/v1');
        expect(response.status).toBe(200);
    });
});
