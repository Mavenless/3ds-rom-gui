// 1. Install the necessary dependencies: `express` and `body-parser`.
// npm install express body-parser

// 2. Import the `express` and `body-parser` modules.
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// 3. Import the `./wrapper.js` module.
import { fetchLink, fetchName, getGameByName, installGame } from './wrapper.js';
const games = await fetchName();
// 4. Create an instance of the `express` application.
const app = express();

// 5. Use `body-parser` middleware to parse incoming request bodies.
app.use(bodyParser.json());
app.use(cors());

// 6. Define the API routes for each function in `./wrapper.js`.
app.get('/getGames', async (req, res) => {
    // 7. Implement the route handlers for each API route, calling the corresponding function in `./wrapper.js`.
    res.json({ result: games });
});

app.get('/getLinks', async (req, res) => {
    const result = await fetchLink();
    res.json({ result });
});

app.get('/getGameByName', async (req, res) => {
    const result = await getGameByName(req.query.name, games);
    res.json({ result });
});

app.get('/installGame', async (req, res) => {
    const result = await installGame(req.query.name, req.query.directory);
    res.json({ result });
});

app.get("/sendNotification", async (req, res) => {
    console.log("finished");
    res.json({ result: req.query.name });
});
// 8. Start the server and listen for incoming requests.
app.listen(3000, () => {
    console.log('API server listening on port 3000');
});

