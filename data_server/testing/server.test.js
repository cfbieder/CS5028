global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
var mongoose = require("../../components/node_modules/mongoose");
const Feeds = require('../../components/models/feeds');
const Topics = require('../../components/models/topics');

const request = require("supertest")
const app = require("../app");

const testTopic1 = { "name": "vitamin A" }
const testTopic2 = { "name": "Antioxidant" }

beforeEach(async () => {
    await Topics.deleteMany();
    await new Topics(testTopic1).save();

})

test('Check for get topics', async () => {
    const response = await request(app).get('/topics').expect(200);
    expect(response.body[0].name).toBe(testTopic1.name);
})

test('Check for post topic', async () => {
    await request(app).post('/topics').send(testTopic2).expect(200);
    const response = await request(app).get('/topics').expect(200);
    expect(response.body.length).toBe(2);
})

test('Check for delete topic', async () => {
    await request(app).delete('/topics').send(testTopic1).expect(200);
    const response = await request(app).get('/topics').expect(200);
    expect(response.body.length).toBe(0);
})

afterAll(async () => {
    await mongoose.connection.close()
});
