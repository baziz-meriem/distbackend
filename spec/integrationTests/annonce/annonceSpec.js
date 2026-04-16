const request = require('supertest');
const {server}=  require('../../../src/index'); 


const route = "/api/v1/annonce/annonce";


  const testAnnonce = {
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ/super",
    periodeAffichage: "20",
    DateDebut: "2023-12-01T12:30:00.000Z",
    DateFin: "2023-12-01T12:30:00.000Z",
    idBoisson:2,
    idAnnonceur:1
  };


  
describe('Annonce tests', () => {

    let createdAnnonce 
    // test createAnnonce function
        
    describe('createAnnonce /api/v1/annonce/annonce', () => {
        it('should create a new Annonce and return the created object', async () => {
        const response = await request(server)
            .post('/api/v1/annonce/annonce')
            .send(testAnnonce);
        expect(response.statusCode).toBe(201);
        createdAnnonce = response.body.data
        });
    });


    describe('GET /api/v1/annonce/annonce', () => {
        it('get all annonces', async () => {
          const response = await request(server).get('/api/v1/annonce/annonce');
          expect(response.status).toBe(200);
          expect(response.body.status).toBe('OK');
          expect(response.body.message).toBe('All annonces retrieved successfully');
          expect(Array.isArray(response.body.data)).toBe(true);
        });
        
      });

  // test getAnnonceById function
describe('getAnnonceById /api/v1/annonce/annonce/{id}', () => {
    it('should return the Annonce object with the specified id', async () => {
      const response = await request(server)
        .get(`/api/v1/annonce/annonce/${createdAnnonce.id}`)
        .send();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(createdAnnonce);
    });
  });

  // test updateAnnonce function
describe('updateAnnonce function', () => {
    it('should update the Annonce object with the specified id and return the updated object', async () => {
      const updatedAnnonce = {
        ...createdAnnonce,
        video: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      };
      const response = await request(server)
        .put(`/api/v1/annonce/annonce/${createdAnnonce.id}`)
        .send(updatedAnnonce);
      expect(response.statusCode).toBe(200);
      expect(response.body.data.count).toEqual(1);
    });

});

describe('GET /api/v1/annonce/annonce/annonceur/:AnnonceurId', () => {
    it('should return 200 and an array of annonces for a valid AnnonceurId', async () => {
      const res = await request(server).get('/api/v1/annonce/annonceur/1'); 
      expect(res.statusCode).toEqual(200);
    });
  

  });


  describe('DELETE /api/v1/annonce/annonce/:id', () => {
    it('should delete an existing annonce', async () => {
      const response = await request(server)
        .delete(`/api/v1/annonce/annonce/${createdAnnonce.id}`) 
        .expect(200);
  
      expect(response.body.status).toEqual('OK');
      expect(response.body.message).toEqual('Annonce deleted successfully');
      expect(response.body.data).toBeDefined();
    });
  
  });


});
