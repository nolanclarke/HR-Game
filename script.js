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

let answers = {
  quickHit: null,
  overUnder: [],
  pinpoint: null,
  ladder: null
};

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

function colorClass(score) {
  if (score >= 85) return "green";
  if (score >= 55) return "yellow";
  return "red";
}

function emoji(score) {
  if (score >= 85) return "🟢";
  if (score >= 55) return "🟡";
  return "🔴";
}

function renderShell(label, title, inner) {
  gameEl.innerHTML = `
    <div class="round-label">${label}</div>
    <h2 class="question">${title}</h2>
    ${inner}
  `;
}

function flashByScore(score, cb) {
  const color = colorClass(score);
  gameEl.classList.remove("flash-green", "flash-yellow", "flash-red");
  void gameEl.offsetWidth;
  gameEl.classList.add(`flash-${color}`);

  setTimeout(() => {
    gameEl.classList.remove("flash-green", "flash-yellow", "flash-red");
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
  const score = correct ? 100 : 0;

  answers.quickHit = {
    prompt: q.prompt,
    guess: choice,
    correctAnswer: q.answer,
    points: score
  };

  addScore("quickHit", score);
  flashByScore(score, nextRound);
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
  const correctAnswer = q.actual > q.line ? "over" : "under";
  const isCorrect = choice === correctAnswer;

  if (isCorrect) ouCorrect++;

  const pointsPerQuestion = [33, 33, 34];
  const pointsEarned = isCorrect ? pointsPerQuestion[ouIndex] : 0;

  answers.overUnder.push({
    prompt: q.prompt,
    line: q.line,
    guess: choice,
    actual: q.actual,
    correctAnswer,
    points: pointsEarned
  });

  addScore("overUnder", scores.overUnder + pointsEarned);

  ouIndex++;

  flashByScore(pointsEarned, () => {
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

  const percentError = Math.abs(guess - actual) / actual;
  if (percentError >= 0.5) return 0;

  return Math.max(
    0,
    Math.round(100 * (1 - Math.pow(percentError / 0.5, 0.7)))
  );
}

function submitPin() {
  const q = todayGame().pinpoint;
  const guess = Number(document.getElementById("guess").value);
  const score = scorePin(guess, q.answer);

  answers.pinpoint = {
    prompt: q.prompt,
    guess,
    correctAnswer: q.answer,
    unit: q.unit,
    points: score
  };

  addScore("pinpoint", score);
  flashByScore(score, nextRound);
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

  answers.ladder = {
    prompt: todayGame().ladder.prompt,
    guess: [...ladder],
    correctAnswer: correct,
    points: score
  };

  addScore("ladder", score);
  flashByScore(score, renderFinal);
}

/* FINAL + ANSWERS */

function buildScorecardText() {
  return `${GAME_NAME} 🗓️ #${todayGame().id}
Total: ${totalScore}/400

Quick Hit: ${scores.quickHit}/100 ${emoji(scores.quickHit)}
Over/Under: ${scores.overUnder}/100 ${emoji(scores.overUnder)}
PinPoint: ${scores.pinpoint}/100 ${emoji(scores.pinpoint)}
Ladder: ${scores.ladder}/100 ${emoji(scores.ladder)}

${SITE_URL}`;
}

function renderFinal() {
  const text = buildScorecardText();

  gameEl.innerHTML = `
    <div class="round-label">Final Score</div>
    <h2 class="question">${totalScore}/400</h2>
    <div class="scorecard" id="shareText">${text}</div>
    <button onclick="copyScorecard()">Copy Scorecard</button>
    <button class="secondary" onclick="renderAnswers()">See Answers</button>
  `;
}

function renderAnswers() {
  const ouCards = answers.overUnder.map((a, i) => `
    <div class="answer-card">
      <div class="answer-title">Over/Under ${i + 1}</div>
      <p class="answer-row">${a.prompt}</p>
      <p class="answer-row">Line: <strong>${a.line}</strong></p>
      <p class="answer-row">Your pick: <strong>${a.guess}</strong></p>
      <p class="answer-row">Actual: <strong>${a.actual}</strong> (${a.correctAnswer})</p>
      <p class="answer-points ${colorClass(a.points) + "-text"}">${a.points} pts</p>
    </div>
  `).join("");

  const ladderGuess = answers.ladder.guess.map((p, i) => `${i + 1}. ${p.name}`).join("<br>");
  const ladderCorrect = answers.ladder.correctAnswer.map((p, i) => `${i + 1}. ${p.name} — ${p.value}`).join("<br>");

  gameEl.innerHTML = `
    <div class="round-label">Answer Review</div>
    <h2 class="question">How you scored</h2>

    <div class="answer-card">
      <div class="answer-title">Quick Hit</div>
      <p class="answer-row">${answers.quickHit.prompt}</p>
      <p class="answer-row">Your answer: <strong>${answers.quickHit.guess}</strong></p>
      <p class="answer-row">Correct answer: <strong>${answers.quickHit.correctAnswer}</strong></p>
      <p class="answer-points ${colorClass(answers.quickHit.points) + "-text"}">${answers.quickHit.points} pts</p>
    </div>

    ${ouCards}

    <div class="answer-card">
      <div class="answer-title">PinPoint</div>
      <p class="answer-row">${answers.pinpoint.prompt}</p>
      <p class="answer-row">Your guess: <strong>${answers.pinpoint.guess}</strong></p>
      <p class="answer-row">Correct answer: <strong>${answers.pinpoint.correctAnswer} ${answers.pinpoint.unit}</strong></p>
      <p class="answer-points ${colorClass(answers.pinpoint.points) + "-text"}">${answers.pinpoint.points} pts</p>
    </div>

    <div class="answer-card">
      <div class="answer-title">Ladder</div>
      <p class="answer-row"><strong>Your order:</strong><br>${ladderGuess}</p>
      <p class="answer-row"><strong>Correct order:</strong><br>${ladderCorrect}</p>
      <p class="answer-points ${colorClass(answers.ladder.points) + "-text"}">${answers.ladder.points} pts</p>
    </div>

    <button onclick="renderFinal()">Back to Scorecard</button>
  `;
}

function copyScorecard() {
  navigator.clipboard.writeText(document.getElementById("shareText").innerText);
  alert("Scorecard copied.");
}

render();