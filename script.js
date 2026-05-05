const GAME_NAME = "BoxScore";
const START_DATE = new Date("2026-05-05T00:00:00");

const dailyGames = [
  {
    id: 1,
    quickHit: {
      prompt: "Were Chris Paul and James Harden ever teammates?",
      options: ["Yes", "No"],
      answer: "Yes",
      reveal: "They played together on the Houston Rockets."
    },
    overUnder: [
      { prompt: "Derrick Rose career points", line: 12500, actual: 12573 },
      { prompt: "Mike Trout career WAR", line: 85, actual: 86.2 },
      { prompt: "Patrick Mahomes career playoff wins", line: 14, actual: 17 }
    ],
    pinpoint: {
      prompt: "Ryan Howard career home runs",
      answer: 382,
      unit: "HR"
    },
    ladder: {
      prompt: "Rank these NBA players by career PPG, highest to lowest.",
      statLabel: "career PPG",
      items: [
        { name: "Kevin Durant", value: 27.3 },
        { name: "LeBron James", value: 27.1 },
        { name: "Allen Iverson", value: 26.7 },
        { name: "Kobe Bryant", value: 25.0 },
        { name: "Stephen Curry", value: 24.8 }
      ]
    }
  },
  {
    id: 2,
    quickHit: {
      prompt: "Did Shohei Ohtani win an MVP before joining the Dodgers?",
      options: ["Yes", "No"],
      answer: "Yes",
      reveal: "He won AL MVP with the Angels."
    },
    overUnder: [
      { prompt: "Barry Bonds career home runs", line: 750, actual: 762 },
      { prompt: "Tom Brady Super Bowl wins", line: 6.5, actual: 7 },
      { prompt: "Steph Curry career 3PM", line: 3500, actual: 3747 }
    ],
    pinpoint: {
      prompt: "Shaquille O'Neal career points",
      answer: 28596,
      unit: "points"
    },
    ladder: {
      prompt: "Rank these MLB players by career home runs, highest to lowest.",
      statLabel: "career HR",
      items: [
        { name: "Albert Pujols", value: 703 },
        { name: "Ken Griffey Jr.", value: 630 },
        { name: "Jim Thome", value: 612 },
        { name: "Frank Thomas", value: 521 },
        { name: "David Ortiz", value: 541 }
      ]
    }
  }
];

let currentRound = 0;
let totalScore = 0;
let scores = {
  quickHit: null,
  overUnder: null,
  pinpoint: null,
  ladder: null
};

const gameEl = document.getElementById("game");
const scoreNowEl = document.getElementById("scoreNow");

const rounds = ["quickHit", "overUnder", "pinpoint", "ladder"];

function getTodayGame() {
  const now = new Date();
  const diffDays = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
  const index = ((diffDays % dailyGames.length) + dailyGames.length) % dailyGames.length;
  return dailyGames[index];
}

const todayGame = getTodayGame();

function updateScore() {
  scoreNowEl.textContent = totalScore;
}

function addScore(roundName, score) {
  scores[roundName] = Math.round(score);
  totalScore = Object.values(scores)
    .filter(v => v !== null)
    .reduce((sum, v) => sum + v, 0);
  updateScore();
}

function grade(total) {
  if (total >= 370) return "A+";
  if (total >= 340) return "A";
  if (total >= 320) return "B+";
  if (total >= 300) return "B";
  if (total >= 270) return "C";
  if (total >= 230) return "D";
  return "F";
}

function emoji(score) {
  if (score >= 85) return "🟢";
  if (score >= 55) return "🟡";
  return "🔴";
}

function nextRound() {
  currentRound++;
  render();
}

function renderRoundShell(label, title, inner) {
  gameEl.innerHTML = `
    <div class="round-label">${label}</div>
    <h2 class="question">${title}</h2>
    ${inner}
  `;
}

function render() {
  const roundName = rounds[currentRound];

  if (!roundName) {
    renderFinal();
    return;
  }

  if (roundName === "quickHit") renderQuickHit();
  if (roundName === "overUnder") renderOverUnder();
  if (roundName === "pinpoint") renderPinpoint();
  if (roundName === "ladder") renderLadder();
}

// ROUND 1: QUICK HIT

function renderQuickHit() {
  const q = todayGame.quickHit;

  renderRoundShell(
    "Round 1 / 4 · Quick Hit · 100 pts",
    q.prompt,
    `
      <div class="btn-grid">
        ${q.options.map(opt => `<button onclick="answerQuickHit('${opt}')">${opt}</button>`).join("")}
      </div>
    `
  );
}

function answerQuickHit(choice) {
  const q = todayGame.quickHit;
  const score = choice === q.answer ? 100 : 0;
  addScore("quickHit", score);

  gameEl.innerHTML = `
    <div class="round-label">Quick Hit Result</div>
    <h2 class="question ${score === 100 ? "green" : "red"}">${score}/100</h2>
    <p class="subtext">${q.reveal}</p>
    <button onclick="nextRound()">Next Round</button>
  `;
}

// ROUND 2: OVER / UNDER

let ouIndex = 0;
let ouCorrect = 0;

function renderOverUnder() {
  const q = todayGame.overUnder[ouIndex];

  renderRoundShell(
    `Round 2 / 4 · Over/Under · Question ${ouIndex + 1}/3`,
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
  const q = todayGame.overUnder[ouIndex];
  const correct = q.actual > q.line ? "over" : "under";
  if (choice === correct) ouCorrect++;

  ouIndex++;

  if (ouIndex < todayGame.overUnder.length) {
    renderOverUnder();
  } else {
    const score = Math.round((ouCorrect / todayGame.overUnder.length) * 100);
    addScore("overUnder", score);

    gameEl.innerHTML = `
      <div class="round-label">Over/Under Result</div>
      <h2 class="question">${score}/100</h2>
      <p class="subtext">You got ${ouCorrect}/${todayGame.overUnder.length} correct.</p>
      <button onclick="nextRound()">Next Round</button>
    `;
  }
}

// ROUND 3: PINPOINT

function renderPinpoint() {
  const q = todayGame.pinpoint;

  renderRoundShell(
    "Round 3 / 4 · PinPoint · 100 pts",
    q.prompt,
    `
      <input id="pinGuess" type="number" placeholder="Enter your guess" />
      <button onclick="submitPinpoint()">Lock It In</button>
    `
  );
}

function scorePinpoint(guess, answer) {
  guess = Number(guess);
  answer = Number(answer);

  if (!guess || guess <= 0 || !answer || answer <= 0) return 0;

  const error = Math.abs(guess - answer);
  const percentError = error / answer;

  // This curve works across tiny and huge stats.
  // 0% error = 100
  // 10% error ≈ 74
  // 25% error ≈ 37
  // 50%+ error ≈ near 0
  const score = 100 * Math.exp(-3 * percentError);

  return Math.max(0, Math.min(100, Math.round(score)));
}

function submitPinpoint() {
  const q = todayGame.pinpoint;
  const guess = Number(document.getElementById("pinGuess").value);
  const score = scorePinpoint(guess, q.answer);

  addScore("pinpoint", score);

  gameEl.innerHTML = `
    <div class="round-label">PinPoint Result</div>
    <h2 class="question">${score}/100</h2>
    <p class="subtext">
      Your guess: <strong>${guess}</strong><br />
      Actual: <strong>${q.answer} ${q.unit}</strong>
    </p>
    <button onclick="nextRound()">Next Round</button>
  `;
}

// ROUND 4: LADDER

let ladderOrder = [];

function renderLadder() {
  ladderOrder = [...todayGame.ladder.items].sort(() => Math.random() - 0.5);
  drawLadder();
}

function drawLadder() {
  const q = todayGame.ladder;

  renderRoundShell(
    "Round 4 / 4 · Ladder · 100 pts",
    q.prompt,
    `
      <p class="subtext">Move players into order from highest to lowest.</p>
      <div id="ladderList">
        ${ladderOrder.map((item, i) => `
          <div class="ladder-item">
            <strong>${i + 1}. ${item.name}</strong>
            <div class="ladder-actions">
              <button class="secondary" onclick="moveItem(${i}, -1)">↑</button>
              <button class="secondary" onclick="moveItem(${i}, 1)">↓</button>
            </div>
          </div>
        `).join("")}
      </div>
      <button onclick="submitLadder()">Submit Ladder</button>
    `
  );
}

function moveItem(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= ladderOrder.length) return;

  const temp = ladderOrder[index];
  ladderOrder[index] = ladderOrder[newIndex];
  ladderOrder[newIndex] = temp;
  drawLadder();
}

function scoreLadder(userOrder, correctOrder) {
  const n = correctOrder.length;
  let totalPairs = 0;
  let correctPairs = 0;

  const correctRank = {};
  correctOrder.forEach((item, index) => {
    correctRank[item.name] = index;
  });

  for (let i = 0; i < userOrder.length; i++) {
    for (let j = i + 1; j < userOrder.length; j++) {
      totalPairs++;

      const a = userOrder[i].name;
      const b = userOrder[j].name;

      if (correctRank[a] < correctRank[b]) {
        correctPairs++;
      }
    }
  }

  // Pairwise scoring is fairer than exact-position scoring.
  // For 5 players, there are 10 pair comparisons.
  return Math.round((correctPairs / totalPairs) * 100);
}

function submitLadder() {
  const q = todayGame.ladder;
  const correctOrder = [...q.items].sort((a, b) => b.value - a.value);
  const score = scoreLadder(ladderOrder, correctOrder);

  addScore("ladder", score);

  gameEl.innerHTML = `
    <div class="round-label">Ladder Result</div>
    <h2 class="question">${score}/100</h2>
    <p class="subtext">Correct order:</p>
    <div class="result">
      ${correctOrder.map((item, i) => `
        <p><strong>${i + 1}. ${item.name}</strong> — ${item.value} ${q.statLabel}</p>
      `).join("")}
    </div>
    <button onclick="nextRound()">See Final Score</button>
  `;
}

// FINAL SCORECARD

function renderFinal() {
  const finalGrade = grade(totalScore);

  const scorecard =
`${GAME_NAME} 🗓️ #${todayGame.id}
Total: ${totalScore}/400 — ${finalGrade}

Quick Hit: ${scores.quickHit}/100 ${emoji(scores.quickHit)}
Over/Under: ${scores.overUnder}/100 ${emoji(scores.overUnder)}
PinPoint: ${scores.pinpoint}/100 ${emoji(scores.pinpoint)}
Ladder: ${scores.ladder}/100 ${emoji(scores.ladder)}`;

  gameEl.innerHTML = `
    <div class="round-label">Final Score</div>
    <h2 class="question">You scored ${totalScore}/400</h2>
    <p class="subtext">Grade: <strong>${finalGrade}</strong></p>

    <div class="scorecard" id="shareText">${scorecard}</div>

    <button onclick="copyScorecard()">Copy Scorecard</button>
    <button class="secondary" onclick="location.reload()">Play Again</button>
  `;
}

function copyScorecard() {
  const text = document.getElementById("shareText").innerText;
  navigator.clipboard.writeText(text);
  alert("Scorecard copied.");
}

render();