class Button {
  constructor(soundUrl, el) {
    this.el = el;
    this.sound = new Audio(soundUrl);
    this.press = async function (delayms = 500, playSound = true) {
      el.style.filter = "brightness(100%)";
      if (playSound) {
        this.sound.play();
      }
      await delay(delayms);
      el.style.filter = "brightness(50%)";
    };
  }
}

const sounds = [
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
];

const states = {
  reset: 0,
  addNote: 1,
  playSequence: 2,
  playerPlayback: 3,
  mistake: 4,
  win: 5,
};

let state = states.reset;

async function pressButton(button) {
  buttons.get(button.id).press();
}

let buttons = new Map();
function initializeButtons() {
  document.querySelectorAll(".game-button").forEach((el, i) => {
    if (i < sounds.length) {
      buttons.set(el.id, new Button(sounds[i], el));
      el.style.filter = "brightness(50%)";
    }
  });
}

initializeButtons();

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function buttonDance() {
  for (let step = 0; step < 5; step++) {
    for (const btn of buttons.values()) {
      await btn.press(100, false);
    }
  }
}
