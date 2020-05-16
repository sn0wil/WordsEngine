import express from 'express';

import { WordsEngine } from '../words-project-lib/wordsEngine';

const app: express.Application = express();

app.get('/session/new', function (_req, res) {
    const session = WordsEngine.initateSession();
    const sessionResponse = session.start();
    res.send(sessionResponse);
});

app.get('/session/answer', function (req, res) {
    const session = WordsEngine.getPotentialSession('');
    const sessionResponse = session.answer(req.body);
    res.send(sessionResponse);
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});

