const MULTIPLIERS = [1, 1, 1, 2, 2, 3, 3, 4, 5];
const GOAL_SCORE = 12000;

const players = [
  { Player: "Barry Bonds", HR: 762 }, { Player: "Hank Aaron", HR: 755 }, { Player: "Babe Ruth", HR: 714 },
  { Player: "Albert Pujols", HR: 703 }, { Player: "Alex Rodriguez", HR: 696 }, { Player: "Willie Mays", HR: 660 },
  { Player: "Ken Griffey Jr.", HR: 630 }, { Player: "Jim Thome", HR: 612 }, { Player: "Sammy Sosa", HR: 609 },
  { Player: "David Ortiz", HR: 541 }, { Player: "Mike Trout", HR: 368 }, { Player: "Shohei Ohtani", HR: 171 },
  { Player: "Bryce Harper", HR: 306 }, { Player: "Aaron Judge", HR: 257 }, { Player: "Giancarlo Stanton", HR: 402 },
  { Player: "Nolan Arenado", HR: 325 }, { Player: "Freddie Freeman", HR: 321 }, { Player: "Anthony Rizzo", HR: 295 },
  { Player: "Paul Goldschmidt", HR: 340 }, { Player: "Jose Ramirez", HR: 230 }, { Player: "Derek Jeter", HR: 260 },
  { Player: "Ichiro Suzuki", HR: 117 }, { Player: "Tony Gwynn", HR: 135 }, { Player: "Rod Carew", HR: 92 },
  { Player: "Joe Mauer", HR: 143 }, { Player: "Ozzie Smith", HR: 28 }, { Player: "Pete Rose", HR: 160 },
  { Player: "Craig Biggio", HR: 291 }, { Player: "Wade Boggs", HR: 118 }, { Player: "Roberto Alomar", HR: 210 },
  { Player: "DJ LeMahieu", HR: 112 }, { Player: "Xander Bogaerts", HR: 168 }, { Player: "Dansby Swanson", HR: 115 },
  { Player: "Tim Anderson", HR: 98 }, { Player: "Whit Merrifield", HR: 90 }, { Player: "Yadier Molina", HR: 176 },
  { Player: "J.T. Realmuto", HR: 138 }, { Player: "Michael Brantley", HR: 129 }, { Player: "Brandon Phillips", HR: 211 },
  { Player: "Starling Marte", HR: 147 }, { Player: "Clayton Kershaw", HR: 1 }, { Player: "Jacob deGrom", HR: 2 },
  { Player: "Max Scherzer", HR: 1 }, { Player: "Justin Verlander", HR: 0 }, { Player: "Zack Greinke", HR: 9 },
  { Player: "Gerrit Cole", HR: 0 }, { Player: "CC Sabathia", HR: 3 }, { Player: "Madison Bumgarner", HR: 19 },
  { Player: "Pedro Martinez", HR: 0 }, { Player: "Randy Johnson", HR: 1 }, { Player: "Roger Clemens", HR: 0 },
  { Player: "Greg Maddux", HR: 5 }, { Player: "Tom Glavine", HR: 1 }, { Player: "John Smoltz", HR: 3 },
  { Player: "Nolan Ryan", HR: 2 }, { Player: "Mark Buehrle", HR: 1 }, { Player: "David Wells", HR: 0 },
  { Player: "Bartolo Colon", HR: 1 }, { Player: "Felix Hernandez", HR: 1 }, { Player: "Stephen Strasburg", HR: 0 },
  { Player: "Josh Donaldson", HR: 276 }, { Player: "Andrelton Simmons", HR: 79 }, { Player: "Buster Posey", HR: 158 },
  { Player: "Carlos Correa", HR: 174 }, { Player: "George Springer", HR: 244 }, { Player: "Kyle Schwarber", HR: 256 },
  { Player: "Matt Olson", HR: 219 }, { Player: "Trea Turner", HR: 138 }, { Player: "Francisco Lindor", HR: 215 },
  { Player: "Bo Bichette", HR: 85 }, { Player: "Joey Votto", HR: 356 }, { Player: "Nelson Cruz", HR: 464 },
  { Player: "Javier Baez", HR: 179 }, { Player: "Manny Machado", HR: 312 }, { Player: "Alex Bregman", HR: 170 },
  { Player: "Jose Abreu", HR: 263 }, { Player: "Andrew McCutchen", HR: 299 }, { Player: "Christian Yelich", HR: 183 },
  { Player: "Ronald Acuña Jr.", HR: 170 }, { Player: "Vladimir Guerrero Jr.", HR: 130 }
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
    content.innerText = assigned[i] ? `✅ ${assigned[i].Player}` : "EMPTY";

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