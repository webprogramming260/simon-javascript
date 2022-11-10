const sounds = ["sound1.mp3", "sound2.mp3", "sound3.mp3", "sound4.mp3"];
const mistakeSound = loadSound("error.mp3");

class Button {
  constructor(soundUrl, el) {
    this.el = el;
    this.sound = loadSound(soundUrl);

    this.press = async function (delayms = 500, playSound = true) {
      el.style.filter = "brightness(100%)";
      if (playSound) {
        this.sound.play();
      }
      await delay(delayms);
      el.style.filter = "brightness(50%)";
      await delay(100);
    };
  }
}

let buttons = new Map();
let allowPlayer = false;
let sequence = [];
let playerPlaybackPos = 0;

async function pressButton(button) {
  if (allowPlayer) {
    allowPlayer = false;
    await buttons.get(button.id).press();

    if (sequence[playerPlaybackPos].el.id === button.id) {
      playerPlaybackPos++;
      if (playerPlaybackPos === sequence.length) {
        playerPlaybackPos = 0;
        addNote();
        updateScore(sequence.length - 1);
        await playSequence(500);
      }
      allowPlayer = true;
    } else {
      saveScore(sequence.length - 1);
      mistakeSound.play();
      await buttonDance();
    }
  }
}

function initialize() {
  document.querySelectorAll(".game-button").forEach((el, i) => {
    if (i < sounds.length) {
      buttons.set(el.id, new Button(sounds[i], el));
      el.style.filter = "brightness(50%)";
    }
  });
}
initialize();

async function reset() {
  allowPlayer = false;
  playerPlaybackPos = 0;
  sequence = [];
  updateScore("--");
  await buttonDance(1);
  addNote();
  await playSequence(1000);
  allowPlayer = true;
}

async function playSequence(delayms = 0) {
  if (delayms > 0) {
    await delay(delayms);
  }
  for (const btn of sequence) {
    await btn.press();
  }
}

function addNote() {
  btn = getRandomButton();
  sequence.push(btn);

  for (const btn of sequence) {
    console.log(btn.el.id);
  }
}

function updateScore(score) {
  const scoreEl = document.querySelector("#score");
  scoreEl.textContent = score;
}

async function buttonDance(laps = 5) {
  for (let step = 0; step < laps; step++) {
    for (const btn of buttons.values()) {
      await btn.press(100, false);
    }
  }
}

function getRandomButton() {
  let btns = Array.from(buttons.values());
  return btns[Math.floor(Math.random() * buttons.size)];
}

function saveScore(score) {
  let userName = sessionStorage.getItem("userName");
  if (!userName) {
    userName = "unknown";
  }
  let scores = [];
  const scoresText = sessionStorage.getItem("scores");
  if (scoresText) {
    scores = JSON.parse(scoresText);
  }
  scores = updateScores(userName, score, scores);

  sessionStorage.setItem("scores", JSON.stringify(scores));
}

function updateScores(userName, score, scores) {
  const date = new Date().toLocaleDateString();
  const newScore = { name: userName, score: score, date: date };

  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function loadSound(filename) {
  return new Audio("assets/" + filename);
}
