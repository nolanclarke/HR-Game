const MULTIPLIERS = [1, 1, 1, 2, 2, 3, 3, 4, 5];
const GOAL_SCORE = 12000;

const players = [
  {
    "Player": "Barry Bonds",
    "HR": 762,
    "img": "player-images/Barry Bonds.jpg"
  },
  {
    "Player": "Hank Aaron",
    "HR": 755,
    "img": "player-images/Hank Aaron.jpg"
  },
  {
    "Player": "Babe Ruth",
    "HR": 714,
    "img": "player-images/Babe Ruth.jpg"
  },
  {
    "Player": "Albert Pujols",
    "HR": 703,
    "img": "player-images/Albert Pujols.jpg"
  },
  {
    "Player": "Alex Rodriguez",
    "HR": 696,
    "img": "player-images/Alex Rodriguez.jpg"
  },
  {
    "Player": "Willie Mays",
    "HR": 660,
    "img": "player-images/Willie Mays.jpg"
  },
  {
    "Player": "Ken Griffey Jr.",
    "HR": 630,
    "img": "player-images/Ken Griffey Jr.jpg"
  },
  {
    "Player": "Jim Thome",
    "HR": 612,
    "img": "player-images/Jim Thome.jpg"
  },
  {
    "Player": "Sammy Sosa",
    "HR": 609,
    "img": "player-images/Sammy Sosa.jpg"
  },
  {
    "Player": "David Ortiz",
    "HR": 541,
    "img": "player-images/David Ortiz.jpg"
  },
  {
    "Player": "Mike Trout",
    "HR": 387,
    "img": "player-images/Mike Trout.jpg"
  },
  {
    "Player": "Shohei Ohtani",
    "HR": 242,
    "img": "player-images/Shohei Ohtani.jpg"
  },
  {
  "Player": "Bryce Harper",
  "HR": 344,
  "img": "player-images/Bryce Harper.jpg"
},
{
  "Player": "Aaron Judge",
  "HR": 331,
  "img": "player-images/Aaron Judge.jpg"
},
{
  "Player": "Giancarlo Stanton",
  "HR": 429,
  "img": "player-images/Giancarlo Stanton.jpg"
},
{
  "Player": "Nolan Arenado",
  "HR": 346,
  "img": "player-images/Nolan Arenado.jpg"
},
{
  "Player": "Freddie Freeman",
  "HR": 352,
  "img": "player-images/Freddie Freeman.jpg"
},
{
  "Player": "Anthony Rizzo",
  "HR": 303,
  "img": "player-images/Anthony Rizzo.jpg"
},
{
  "Player": "Paul Goldschmidt",
  "HR": 367,
  "img": "player-images/Paul Goldschmidt.jpg"
},
{
  "Player": "Jose Ramirez",
  "HR": 264,
  "img": "player-images/Jose Ramirez.jpg"
},
{
  "Player": "Derek Jeter",
  "HR": 260,
  "img": "player-images/Derek Jeter.jpg"
},
{
  "Player": "Ichiro Suzuki",
  "HR": 117,
  "img": "player-images/Ichiro Suzuki.jpg"
},
{
  "Player": "Tony Gwynn",
  "HR": 135,
  "img": "player-images/Tony Gwynn.jpg"
},
{
  "Player": "Rod Carew",
  "HR": 92,
  "img": "player-images/Rod Carew.jpg"
},
{
  "Player": "Joe Mauer",
  "HR": 143,
  "img": "player-images/Joe Mauer.jpg"
},
{
  "Player": "Ozzie Smith",
  "HR": 28,
  "img": "player-images/Ozzie Smith.jpg"
},
{
  "Player": "Pete Rose",
  "HR": 160,
  "img": "player-images/Pete Rose.jpg"
},
{
  "Player": "Craig Biggio",
  "HR": 291,
  "img": "player-images/Craig Biggio.jpg"
},
{
  "Player": "Wade Boggs",
  "HR": 118,
  "img": "player-images/Wade Boggs.jpg"
},
{
  "Player": "Roberto Alomar",
  "HR": 210,
  "img": "player-images/Roberto Alomar.jpg"
},
{
  "Player": "DJ LeMahieu",
  "HR": 125,
  "img": "player-images/DJ LeMahieu.jpg"
},
{
  "Player": "Xander Bogaerts",
  "HR": 189,
  "img": "player-images/Xander Bogaerts.jpg"
},
{
  "Player": "Dansby Swanson",
  "HR": 150,
  "img": "player-images/Dansby Swanson.jpg"
},
{
  "Player": "Tim Anderson",
  "HR": 98,
  "img": "player-images/Tim Anderson.jpg"
},
{
  "Player": "Whit Merrifield",
  "HR": 94,
  "img": "player-images/Whit Merrifield.jpg"
},
{
  "Player": "Yadier Molina",
  "HR": 176,
  "img": "player-images/Yadier Molina.jpg"
},
{
  "Player": "J.T. Realmuto",
  "HR": 173,
  "img": "player-images/J.T. Realmuto.jpg"
},
{
  "Player": "Michael Brantley",
  "HR": 129,
  "img": "player-images/Michael Brantley.jpg"
},
{
  "Player": "Brandon Phillips",
  "HR": 211,
  "img": "player-images/Brandon Phillips.jpg"
},
{
  "Player": "Starling Marte",
  "HR": 156,
  "img": "player-images/Starling Marte.jpg"
},
{
  "Player": "Clayton Kershaw",
  "HR": 1,
  "img": "player-images/Clayton Kershaw.jpg"
},
{
  "Player": "Jacob deGrom",
  "HR": 3,
  "img": "player-images/Jacob deGrom.jpg"
},
{
  "Player": "Max Scherzer",
  "HR": 1,
  "img": "player-images/Max Scherzer.jpg"
},
{
  "Player": "Justin Verlander",
  "HR": 0,
  "img": "player-images/Justin Verlander.jpg"
},
{
  "Player": "Zack Greinke",
  "HR": 9,
  "img": "player-images/Zack Greinke.jpg"
},
{
  "Player": "Gerrit Cole",
  "HR": 3,
  "img": "player-images/Gerrit Cole.jpg"
},
{
  "Player": "CC Sabathia",
  "HR": 3,
  "img": "player-images/CC Sabathia.jpg"
},
{
  "Player": "Madison Bumgarner",
  "HR": 19,
  "img": "player-images/Madison Bumgarner.jpg"
},
{
  "Player": "Pedro Martinez",
  "HR": 0,
  "img": "player-images/Pedro Martinez.jpg"
},
{
  "Player": "Randy Johnson",
  "HR": 1,
  "img": "player-images/Randy Johnson.jpg"
},
{
  "Player": "Roger Clemens",
  "HR": 0,
  "img": "player-images/Roger Clemens.jpg"
},
{
  "Player": "Greg Maddux",
  "HR": 5,
  "img": "player-images/Greg Maddux.jpg"
},
{
  "Player": "Tom Glavine",
  "HR": 1,
  "img": "player-images/Tom Glavine.jpg"
},
{
  "Player": "John Smoltz",
  "HR": 5,
  "img": "player-images/John Smoltz.jpg"
},
{
  "Player": "Nolan Ryan",
  "HR": 2,
  "img": "player-images/Nolan Ryan.jpg"
},
{
  "Player": "Mark Buehrle",
  "HR": 1,
  "img": "player-images/Mark Buehrle.jpg"
},
{
  "Player": "David Wells",
  "HR": 0,
  "img": "player-images/David Wells.jpg"
},
{
  "Player": "Bartolo Colon",
  "HR": 1,
  "img": "player-images/Bartolo Colon.jpg"
},
{
  "Player": "Felix Hernandez",
  "HR": 1,
  "img": "player-images/Felix Hernandez.jpg"
},
{
  "Player": "Stephen Strasburg",
  "HR": 4,
  "img": "player-images/Stephen Strasburg.jpg"
},
{
  "Player": "Josh Donaldson",
  "HR": 279,
  "img": "player-images/Josh Donaldson.jpg"
},
{
  "Player": "Andrelton Simmons",
  "HR": 70,
  "img": "player-images/Andrelton Simmons.jpg"
},
{
  "Player": "Buster Posey",
  "HR": 158,
  "img": "player-images/Buster Posey.jpg"
},
{
  "Player": "Carlos Correa",
  "HR": 189,
  "img": "player-images/Carlos Correa.jpg"
},
{
  "Player": "George Springer",
  "HR": 266,
  "img": "player-images/George Springer.jpg"
},
{
  "Player": "Kyle Schwarber",
  "HR": 301,
  "img": "player-images/Kyle Schwarber.jpg"
},
{
  "Player": "Matt Olson",
  "HR": 270,
  "img": "player-images/Matt Olson.jpg"
},
{
  "Player": "Trea Turner",
  "HR": 174,
  "img": "player-images/Trea Turner.jpg"
},
{
  "Player": "Francisco Lindor",
  "HR": 258,
  "img": "player-images/Francisco Lindor.jpg"
},
{
  "Player": "Bo Bichette",
  "HR": 97,
  "img": "player-images/Bo Bichette.jpg"
},
{
  "Player": "Joey Votto",
  "HR": 356,
  "img": "player-images/Joey Votto.jpg"
},
{
  "Player": "Nelson Cruz",
  "HR": 464,
  "img": "player-images/Nelson Cruz.jpg"
},
{
  "Player": "Javier Baez",
  "HR": 187,
  "img": "player-images/Javier Baez.jpg"
},
{
  "Player": "Manny Machado",
  "HR": 345,
  "img": "player-images/Manny Machado.jpg"
},
{
  "Player": "Alex Bregman",
  "HR": 202,
  "img": "player-images/Alex Bregman.jpg"
},
{
  "Player": "Jose Abreu",
  "HR": 263,
  "img": "player-images/Jose Abreu.jpg"
},
{
  "Player": "Andrew McCutchen",
  "HR": 322,
  "img": "player-images/Andrew McCutchen.JPG"
},
{
  "Player": "Christian Yelich",
  "HR": 213,
  "img": "player-images/Christian Yelich.jpg"
},
{
  "Player": "Ronald Acuna Jr.",
  "HR": 165,
  "img": "player-images/Ronald Acuna Jr.jpg"
},
{
  "Player": "Vladimir Guerrero Jr.",
  "HR": 166,
  "img": "player-images/Vladimir Guerrero Jr.jpg"
}
];

let playerPool = [];
let currentIndex = 0;
let assigned = Array(9).fill(null);

const scoreEl = document.getElementById("score");
const playerEl = document.getElementById("current-player");
const slotList = document.getElementById("slot-list");
const endMessage = document.getElementById("end-message");
const restartBtn = document.getElementById("restart");

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function assignSlot(index) {
  assigned[index] = playerPool[currentIndex];
  currentIndex++;
  updateScore();

  if (currentIndex < 9) {
    updatePlayer();
    renderSlots();
  } else {
    endGame();
  }
}

function updatePlayer() {
  const p = playerPool[currentIndex];
  playerEl.innerText = `Player ${currentIndex + 1} of 9: ${p.Player}`;
  const imgEl = document.getElementById("current-player-img");
  imgEl.src = p.img;
  imgEl.classList.remove("hidden");
}

function renderSlots() {
  slotList.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const row = document.createElement("div");
    row.className = `flex justify-between items-center border border-dark-border rounded p-3 cursor-pointer transition-colors duration-150 text-[1.05rem] ${assigned[i] ? 'bg-dark-hover' : 'hover:bg-dark-hover'}`;
    row.onclick = () => {
      if (!assigned[i] && currentIndex < playerPool.length) assignSlot(i);
    };

    const label = document.createElement("span");
    label.innerText = `x${MULTIPLIERS[i]}`;

    const content = document.createElement("span");
    content.id = `slot-${i}`;

    if (assigned[i]) {
      const text = document.createElement("span");
      text.innerText = assigned[i].Player;

      const img = document.createElement("img");
      img.src = assigned[i].img;
      img.alt = assigned[i].Player;
      img.className = "w-6 h-6 rounded-full ml-2 inline-block align-middle";

      content.appendChild(text);
      content.appendChild(img);
    } else {
      content.innerText = "EMPTY";
    }

    row.appendChild(label);
    row.appendChild(content);
    slotList.appendChild(row);
  }
}

function updateScore() {
  let total = 0;
  for (let i = 0; i < 9; i++) {
    if (assigned[i]) total += assigned[i].HR * MULTIPLIERS[i];
  }
  scoreEl.innerText = `Total Score: ${total}`;
}

function endGame() {
  document.getElementById("game-ui").style.display = "none";
  document.getElementById("current-player-img").classList.add("hidden");
  restartBtn.classList.remove("hidden");

  let finalMsg = "🏁 Final Lineup:\n\n";
  let total = 0;
  for (let i = 0; i < 9; i++) {
    const p = assigned[i];
    const m = MULTIPLIERS[i];
    finalMsg += `x${m} – ${p.Player} (${p.HR} HRs) = ${p.HR * m}\n`;
    total += p.HR * m;
  }

  finalMsg += `\n🎯 Final Score: ${total}\n${total >= GOAL_SCORE ? "🎉 You Win!" : "❌ Try Again!"}`;
  endMessage.innerText = finalMsg;
}

function startGame() {
  playerPool = shuffle(players).slice(0, 9);
  assigned = Array(9).fill(null);
  currentIndex = 0;

  endMessage.innerText = "";
  restartBtn.classList.add("hidden");
  document.getElementById("game-ui").style.display = "block";

  updatePlayer();
  renderSlots();
  updateScore();
}

startGame();