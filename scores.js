function loadScores() {
  let scores = [];
  const scoresText = sessionStorage.getItem("scores");
  if (scoresText) {
    scores = JSON.parse(scoresText);
  }

  const tableBodyEl = document.querySelector("#scores");

  for (const score of scores) {
    const nameTdEl = document.createElement("td");
    const scoreTdEl = document.createElement("td");
    const dateTdEl = document.createElement("td");

    nameTdEl.textContent = score.name;
    scoreTdEl.textContent = score.score;
    dateTdEl.textContent = score.date;

    const rowEl = document.createElement("tr");
    rowEl.appendChild(nameTdEl);
    rowEl.appendChild(scoreTdEl);
    rowEl.appendChild(dateTdEl);

    tableBodyEl.appendChild(rowEl);
  }

  console.log(scores);
}

loadScores();
