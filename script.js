const MULTIPLIERS = [1, 1, 1, 2, 2, 3, 3, 4, 5];
const GOAL_SCORE = 10000;

const players = [
  { Player: "Barry Bonds", HR: 762 }, { Player: "Hank Aaron", HR: 755 },
  { Player: "Babe Ruth", HR: 714 }, { Player: "Mike Trout", HR: 368 },
  { Player: "Shohei Ohtani", HR: 171 }, { Player: "Derek Jeter", HR: 260 },
  { Player: "Pedro Martinez", HR: 0 }, { Player: "Clayton Kershaw", HR: 1 },
  { Player: "Madison Bumgarner", HR: 19 }, { Player: "Ken Griffey Jr.", HR: 630 },
  { Player: "Jim Thome", HR: 612 }, { Player: "David Ortiz", HR: 541 }
];

let playerPool = [];
let currentIndex = 0;
let assigned = Array(9).fill(null);

const scoreEl = document.getElementById("score");
const playerEl = document.getElementById("current-player");
const slotList = document.getElementById("slot-list");
const endMessage = document.getElementById("end-message");
const restartBtn = document.getElementById("restart");

function startGame() {
  playerPool = shuffle(players).slice(0, 9);
  currentIndex = 0;
  assigned = Array(9).fill(null);
  endMessage.innerText = "";
  restartBtn.classList.add("hidden");
  renderSlots();
  updateScore();
  updatePlayer();
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function renderSlots() {
  slotList.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const row = document.createElement("div");
    row.className = `flex justify-between items-center border border-dark-border rounded p-3 cursor-pointer transition-colors duration-150 ${assigned[i] ? 'bg-dark-hover' : 'hover:bg-dark-hover'}`;
    row.onclick = () => {
      if (!assigned[i] && currentIndex < playerPool.length) assignSlot(i);
    };

    const label = document.createElement("span");
    label.innerText = `x${MULTIPLIERS[i]}`;

    const content = document.createElement("span");
    content.id = `slot-${i}`;
    content.innerText = assigned[i] ? `✅ ${assigned[i].Player}` : "🕳️ EMPTY";

    row.appendChild(label);
    row.appendChild(content);
    slotList.appendChild(row);
  }
}

function assignSlot(index) {
  assigned[index] = playerPool[currentIndex];
  document.getElementById(`slot-${index}`).innerText = `✅ ${playerPool[currentIndex].Player}`;
  currentIndex++;
  updateScore();

  if (currentIndex < 9) {
    updatePlayer();
    renderSlots();
  } else {
    showResults();
  }
}

function updatePlayer() {
  const p = playerPool[currentIndex];
  playerEl.innerText = `Player ${currentIndex + 1} of 9: ${p.Player}`;
}

function updateScore() {
  let total = 0;
  for (let i = 0; i < 9; i++) {
    if (assigned[i]) total += assigned[i].HR * MULTIPLIERS[i];
  }
  scoreEl.innerText = `Total Score: ${total}`;
}

function showResults() {
  let total = 0;
  endMessage.innerText = "🏁 Final Lineup:\n\n";
  for (let i = 0; i < 9; i++) {
    const player = assigned[i];
    const score = player.HR * MULTIPLIERS[i];
    total += score;
    endMessage.innerText += `x${MULTIPLIERS[i]} – ${player.Player} (${player.HR} HRs) = ${score}\n`;
  }
  endMessage.innerText += `\n🎯 Final Score: ${total}\n`;
  endMessage.innerText += total >= GOAL_SCORE ? "🎉 You Win!" : "❌ Try Again!";
  restartBtn.classList.remove("hidden");
}

startGame();