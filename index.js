const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', async (req, res) => {
  DB.addScore(req.body);
  const scores = await DB.getHighScores();
  res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


/* new code with Jensen stuff
const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});



// SubmitScore
apiRouter.post('/score', async (req, res) => {
  DB.addScore(req.body);
  const scores = await DB.getHighScores();
  res.send(scores);
});

//Jensen's code
apiRouter,post('/auth/create', async (req, res) => {
  if (await Db.getuser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user'});
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    //set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
})


apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser{req.body.email};
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id});
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized'});
});

apirouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

//Jensen's code
function setAuthCookie(res, authToken) {
  res.cookie(setAuthCookie, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

*/











/* old code
const express = require('express');
const app = express();

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;
//this part is important. For the startup, do port 4000 instead.

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the application's static content
app.use(express.static('public'));
//this tells it to access the public folder

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  //this allows you to limit how many scores are displayed
  //i.e. top 10, top 15, etc.
  if (scores.length > 10) {
    scores.length = 15;
  }

  return scores;
}
*/