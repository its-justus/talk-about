const getApp = require("../server/server");
const supertest = require("supertest");
const { idText } = require("typescript");
const { exampleBadSecret } = require("../server/constants/warnings");
const app = getApp();
const request = supertest(app);

it('gets the topics endpoint', async (done) => {
	const response = await request.get('/api/topic');

	expect(response.status).toBe(200);
	expect(response.body.length).toBeLessThanOrEqual(10);
	done();
})