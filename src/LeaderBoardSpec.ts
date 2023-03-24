
const request = require('supertest-as-promised')
const express = require('express')
const got = require('got')

describe('LeaderBoard', () => {
    it('should display a leaderboard with the state of all games', async () => {
        const app = express()

        await request(app)
            .get('/leaderboard')
            .expect({board: undefined})

    });



});
