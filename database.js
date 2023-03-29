const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@cluster0.uma6uu5.mongodb.net/`;

const client = new MongoClient(url);
const scoreCollection = client.db('simon').collection('score');

function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = {score: {$gt: 0}};
  const options = {
    sort: {score: -1},
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {addScore, getHighScores};

/* code with Jensen stuff
const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
//const userCollection = client.db('simon').collection('user'); //this line is in Jensen's code only
const scoreCollection = client.db('simon').collection('score');

//getUser fucntion, getUserByToken function, and createUser function are all Jensen's code

function getUser(email) {
    return userCollection.findOne ({ email: email});
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10); //bcrypt is a package from npm that must be installed

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(), //this part might be uuid.v4[]
};
await userCollection.insertOne(user);

return user;
}



function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = {score: {$gt: 0}};
  const options = {
    sort: {score: -1},
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {addScore, getHighScores}; //to comment out if using Jensen's code
//stuff below in Jensen's code only
module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addScore,
    getHighScores,
};

*/