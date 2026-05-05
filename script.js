const GAME_NAME = "BoxScore";
const SITE_URL = "boxscoregame.com";
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
      answer: 382,
      unit: "HR"
    },
    ladder: {
      prompt: "Rank by career PPG, highest to lowest.",
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

let ouIndex = 0;
let ouCorrect = 0;
let ladder = [];

function todayGame() {
  return dailyGames[0];
}

function updateScore() {
  scoreNowEl.textContent = totalScore;
}

function addScore(key, val) {
  scores[key] = Math.round(val);
  totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  updateScore();
}

function renderShell(label, title, inner) {
  gameEl.innerHTML = `
    <div class="round-label">${label}</div>
    <h2 class="question">${title}</h2>
    ${inner}
  `;
}

function flashResult(good, cb) {
  gameEl.classList.remove("flash-green", "flash-red");
  void gameEl.offsetWidth;
  gameEl.classList.add(good ? "flash-green" : "flash-red");

  setTimeout(() => {
    gameEl.classList.remove("flash-green", "flash-red");
    cb();
  }, 1100);
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
  const q = todayGame().quickHit;

  renderShell(
    "Round 1 / 4 · Quick Hit · 100 pts",
    q.prompt,
    `
      <p class="subtext">One tap. No overthinking.</p>
      <div class="btn-grid">
        ${q.options.map(o => `<button onclick="answerQuick('${o}')">${o}</button>`).join("")}
      </div>
    `
  );
}

function answerQuick(choice) {
  const q = todayGame().quickHit;
  const correct = choice === q.answer;

  addScore("quickHit", correct ? 100 : 0);
  flashResult(correct, nextRound);
}

/* OVER / UNDER */

function renderOU() {
  const q = todayGame().overUnder[ouIndex];

  renderShell(
    `Round 2 / 4 · Over/Under · ${ouIndex + 1}/3`,
    `${q.prompt}: ${q.line}`,
    `
      <p class="subtext">Is the actual number over or under?</p>
      <div class="btn-grid">
        <button onclick="answerOU('over')">Over</button>
        <button onclick="answerOU('under')" class="secondary">Under</button>
      </div>
    `
  );
}

function answerOU(choice) {
  const q = todayGame().overUnder[ouIndex];
  const correct = q.actual > q.line ? "over" : "under";
  const isCorrect = choice === correct;

  if (isCorrect) ouCorrect++;

  const pointsPerQuestion = [33, 33, 34];
  const pointsEarned = isCorrect ? pointsPerQuestion[ouIndex] : 0;

  addScore("overUnder", scores.overUnder + pointsEarned);

  ouIndex++;

  flashResult(isCorrect, () => {
    if (ouIndex < todayGame().overUnder.length) {
      renderOU();
    } else {
      nextRound();
    }
  });
}

/* PINPOINT */

function renderPin() {
  const q = todayGame().pinpoint;

  renderShell(
    "Round 3 / 4 · PinPoint · 100 pts",
    q.prompt,
    `
      <p class="subtext">Type your best guess. Closer = more points.</p>
      <input id="guess" type="number" placeholder="Enter number" />
      <button onclick="submitPin()">Lock It In</button>
    `
  );
}

function scorePin(guess, actual) {
  if (!guess || guess <= 0 || !actual || actual <= 0) return 0;
  const err = Math.abs(guess - actual) / actual;
  return Math.max(0, Math.round(100 * Math.exp(-3 * err)));
}

function submitPin() {
  const guess = Number(document.getElementById("guess").value);
  const actual = todayGame().pinpoint.answer;
  const score = scorePin(guess, actual);

  addScore("pinpoint", score);
  flashResult(score >= 70, nextRound);
}

/* LADDER */

function renderLadder() {
  ladder = [...todayGame().ladder.items].sort(() => Math.random() - 0.5);
  drawLadder();
}

function drawLadder() {
  const q = todayGame().ladder;

  renderShell(
    "Round 4 / 4 · Ladder · 100 pts",
    q.prompt,
    `
      <p class="subtext">Move players into the correct order.</p>
      <div>
        ${ladder.map((p, i) => `
          <div class="ladder-item">
            <div class="ladder-name">${i + 1}. ${p.name}</div>
            <div class="ladder-actions">
              <button class="secondary" onclick="move(${i}, -1)">↑</button>
              <button class="secondary" onclick="move(${i}, 1)">↓</button>
            </div>
          </div>
        `).join("")}
      </div>
      <button onclick="submitLadder()">Submit Ladder</button>
    `
  );
}

function move(i, d) {
  const j = i + d;
  if (j < 0 || j >= ladder.length) return;
  [ladder[i], ladder[j]] = [ladder[j], ladder[i]];
  drawLadder();
}

function scoreLadder(userOrder, correctOrder) {
  const correctRank = {};
  correctOrder.forEach((item, index) => {
    correctRank[item.name] = index;
  });

  let totalPairs = 0;
  let correctPairs = 0;

  for (let i = 0; i < userOrder.length; i++) {
    for (let j = i + 1; j < userOrder.length; j++) {
      totalPairs++;
      if (correctRank[userOrder[i].name] < correctRank[userOrder[j].name]) correctPairs++;
    }
  }

  return Math.round((correctPairs / totalPairs) * 100);
}

function submitLadder() {
  const correct = [...todayGame().ladder.items].sort((a, b) => b.value - a.value);
  const score = scoreLadder(ladder, correct);

  addScore("ladder", score);
  flashResult(score >= 70, renderFinal);
}

/* FINAL */

function emoji(score) {
  if (score >= 85) return "🟢";
  if (score >= 55) return "🟡";
  return "🔴";
}

function renderFinal() {
  const text =
`${GAME_NAME} 🗓️ #${todayGame().id}
Total: ${totalScore}/400

Quick Hit: ${scores.quickHit}/100 ${emoji(scores.quickHit)}
Over/Under: ${scores.overUnder}/100 ${emoji(scores.overUnder)}
PinPoint: ${scores.pinpoint}/100 ${emoji(scores.pinpoint)}
Ladder: ${scores.ladder}/100 ${emoji(scores.ladder)}

${SITE_URL}`;

  gameEl.innerHTML = `
    <div class="round-label">Final Score</div>
    <h2 class="question">${totalScore}/400</h2>
    <div class="scorecard" id="shareText">${text}</div>
    <button onclick="copyScorecard()">Copy Scorecard</button>
  `;
}

function copyScorecard() {
  navigator.clipboard.writeText(document.getElementById("shareText").innerText);
  alert("Scorecard copied.");
}

render();