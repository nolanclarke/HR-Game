const GAME_NAME = "BoxScore";
const START_DATE = new Date("2026-05-05");

const dailyGames = [
  {
    id: 1,
    quickHit: {
      prompt: "Were Chris Paul and James Harden ever teammates?",
      options: ["Yes", "No"],
      answer: "Yes"
    },
    overUnder: [
      { prompt: "Derrick Rose career points", line: 12500, actual: 12573 },
      { prompt: "Mike Trout career WAR", line: 85, actual: 86.2 },
      { prompt: "Patrick Mahomes playoff wins", line: 14, actual: 17 }
    ],
    pinpoint: {
      prompt: "Ryan Howard career home runs",
      answer: 382
    },
    ladder: {
      prompt: "Rank by career PPG (highest → lowest)",
      items: [
        { name: "Kevin Durant", value: 27.3 },
        { name: "LeBron James", value: 27.1 },
        { name: "Allen Iverson", value: 26.7 },
        { name: "Kobe Bryant", value: 25.0 },
        { name: "Stephen Curry", value: 24.8 }
      ]
    }
  }
];

let totalScore = 0;
let currentRound = 0;
let scores = { quickHit: 0, overUnder: 0, pinpoint: 0, ladder: 0 };

const gameEl = document.getElementById("game");
const scoreNowEl = document.getElementById("scoreNow");

const rounds = ["quickHit", "overUnder", "pinpoint", "ladder"];

function updateScore() {
  scoreNowEl.textContent = totalScore;
}

function addScore(key, val) {
  scores[key] = val;
  totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  updateScore();
}

function flashResult(good, cb) {
  gameEl.classList.remove("flash-green", "flash-red");
  void gameEl.offsetWidth;
  gameEl.classList.add(good ? "flash-green" : "flash-red");

  setTimeout(() => {
    gameEl.classList.remove("flash-green", "flash-red");
    cb();
  }, 600);
}

function nextRound() {
  currentRound++;
  render();
}

function render() {
  if (currentRound >= rounds.length) return renderFinal();

  const r = rounds[currentRound];
  if (r === "quickHit") renderQuickHit();
  if (r === "overUnder") renderOU();
  if (r === "pinpoint") renderPin();
  if (r === "ladder") renderLadder();
}

/* QUICK HIT */

function renderQuickHit() {
  const q = dailyGames[0].quickHit;

  gameEl.innerHTML = `
    <h2>${q.prompt}</h2>
    ${q.options.map(o => `<button onclick="answerQuick('${o}')">${o}</button>`).join("")}
  `;
}

function answerQuick(choice) {
  const q = dailyGames[0].quickHit;
  const correct = choice === q.answer;
  addScore("quickHit", correct ? 100 : 0);

  flashResult(correct, nextRound);
}

/* OVER UNDER */

let ouIndex = 0;
let ouCorrect = 0;

function renderOU() {
  const q = dailyGames[0].overUnder[ouIndex];

  gameEl.innerHTML = `
    <h2>${q.prompt}: ${q.line}</h2>
    <button onclick="answerOU('over')">Over</button>
    <button onclick="answerOU('under')">Under</button>
  `;
}

function answerOU(choice) {
  const q = dailyGames[0].overUnder[ouIndex];
  const correct = q.actual > q.line ? "over" : "under";
  const isCorrect = choice === correct;

  if (isCorrect) ouCorrect++;
  ouIndex++;

  flashResult(isCorrect, () => {
    if (ouIndex < 3) renderOU();
    else {
      const score = Math.round((ouCorrect / 3) * 100);
      addScore("overUnder", score);
      nextRound();
    }
  });
}

/* PINPOINT */

function renderPin() {
  const q = dailyGames[0].pinpoint;

  gameEl.innerHTML = `
    <h2>${q.prompt}</h2>
    <input id="guess" type="number" />
    <button onclick="submitPin()">Submit</button>
  `;
}

function scorePin(guess, actual) {
  const err = Math.abs(guess - actual) / actual;
  return Math.max(0, Math.round(100 * Math.exp(-3 * err)));
}

function submitPin() {
  const guess = Number(document.getElementById("guess").value);
  const actual = dailyGames[0].pinpoint.answer;
  const score = scorePin(guess, actual);

  addScore("pinpoint", score);
  flashResult(score > 70, nextRound);
}

/* LADDER */

let ladder = [];

function renderLadder() {
  ladder = [...dailyGames[0].ladder.items].sort(() => Math.random() - 0.5);
  drawLadder();
}

function drawLadder() {
  gameEl.innerHTML = `
    <h2>${dailyGames[0].ladder.prompt}</h2>
    ${ladder.map((p,i)=>`
      <div>
        ${i+1}. ${p.name}
        <button onclick="move(${i},-1)">↑</button>
        <button onclick="move(${i},1)">↓</button>
      </div>
    `).join("")}
    <button onclick="submitLadder()">Submit</button>
  `;
}

function move(i,d) {
  const j = i+d;
  if (j<0||j>=ladder.length) return;
  [ladder[i],ladder[j]] = [ladder[j],ladder[i]];
  drawLadder();
}

function submitLadder() {
  const correct = [...dailyGames[0].ladder.items].sort((a,b)=>b.value-a.value);

  let score = 0;
  for (let i=0;i<ladder.length;i++){
    if (ladder[i].name === correct[i].name) score+=20;
  }

  addScore("ladder", score);
  flashResult(score > 60, renderFinal);
}

/* FINAL */

function grade(s) {
  if (s>=360) return "A";
  if (s>=320) return "B";
  if (s>=280) return "C";
  if (s>=220) return "D";
  return "F";
}

function renderFinal() {
  const g = grade(totalScore);

  const text =
`${GAME_NAME}
${totalScore}/400 — ${g}

Quick Hit: ${scores.quickHit}
Over/Under: ${scores.overUnder}
PinPoint: ${scores.pinpoint}
Ladder: ${scores.ladder}`;

  gameEl.innerHTML = `
    <h2>${totalScore}/400 — ${g}</h2>
    <pre>${text}</pre>
    <button onclick="copy()">Copy</button>
  `;
}

function copy() {
  navigator.clipboard.writeText(document.querySelector("pre").innerText);
}

render();