global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;


const request = require("supertest")
const app = require("../app");

test('Check for get topics', async () => {
    await request(app).get('/topics').expect(200);
})