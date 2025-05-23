const MULTIPLIERS = [1, 1, 1, 2, 2, 3, 3, 4, 5];
const GOAL_SCORE = 12000;

const players = [
  {
    "Player": "Barry Bonds",
    "HR": 762,
    "img": "Images/Barry Bonds.jpg"
  },
  {
    "Player": "Hank Aaron",
    "HR": 755,
    "img": "Images/Hank Aaron.jpg"
  },
  {
    "Player": "Babe Ruth",
    "HR": 714,
    "img": "Images/Babe Ruth.jpg"
  },
  {
    "Player": "Albert Pujols",
    "HR": 703,
    "img": "Images/Albert Pujols.jpg"
  },
  {
    "Player": "Alex Rodriguez",
    "HR": 696,
    "img": "Images/Alex Rodriguez.jpg"
  },
  {
    "Player": "Willie Mays",
    "HR": 660,
    "img": "Images/Willie Mays.jpg"
  },
  {
    "Player": "Ken Griffey Jr.",
    "HR": 630,
    "img": "Images/Ken Griffey Jr.jpg"
  },
  {
    "Player": "Jim Thome",
    "HR": 612,
    "img": "Images/Jim Thome.jpg"
  },
  {
    "Player": "Sammy Sosa",
    "HR": 609,
    "img": "Images/Sammy Sosa.jpg"
  },
  {
    "Player": "David Ortiz",
    "HR": 541,
    "img": "Images/David Ortiz.jpg"
  },
  {
    "Player": "Mike Trout",
    "HR": 368,
    "img": "Images/Mike Trout.jpg"
  },
  {
    "Player": "Shohei Ohtani",
    "HR": 171,
    "img": "Images/Shohei Ohtani.jpg"
  },
  {
  "Player": "Bryce Harper",
  "HR": 306,
  "img": "Images/Bryce Harper.jpg"
},
{
  "Player": "Aaron Judge",
  "HR": 257,
  "img": "Images/Aaron Judge.jpg"
},
{
  "Player": "Giancarlo Stanton",
  "HR": 402,
  "img": "Images/Giancarlo Stanton.jpg"
},
{
  "Player": "Nolan Arenado",
  "HR": 325,
  "img": "Images/Nolan Arenado.jpg"
},
{
  "Player": "Freddie Freeman",
  "HR": 321,
  "img": "Images/Freddie Freeman.jpg"
},
{
  "Player": "Anthony Rizzo",
  "HR": 295,
  "img": "Images/Anthony Rizzo.jpg"
},
{
  "Player": "Paul Goldschmidt",
  "HR": 340,
  "img": "Images/Paul Goldschmidt.jpg"
},
{
  "Player": "Jose Ramirez",
  "HR": 230,
  "img": "Images/Jose Ramirez.jpg"
},
{
  "Player": "Derek Jeter",
  "HR": 260,
  "img": "Images/Derek Jeter.jpg"
},
{
  "Player": "Ichiro Suzuki",
  "HR": 117,
  "img": "Images/Ichiro Suzuki.jpg"
},
{
  "Player": "Tony Gwynn",
  "HR": 135,
  "img": "Images/Tony Gwynn.jpg"
},
{
  "Player": "Rod Carew",
  "HR": 92,
  "img": "Images/Rod Carew.jpg"
},
{
  "Player": "Joe Mauer",
  "HR": 143,
  "img": "Images/Joe Mauer.jpg"
},
{
  "Player": "Ozzie Smith",
  "HR": 28,
  "img": "Images/Ozzie Smith.jpg"
},
{
  "Player": "Pete Rose",
  "HR": 160,
  "img": "Images/Pete Rose.jpg"
},
{
  "Player": "Craig Biggio",
  "HR": 291,
  "img": "Images/Craig Biggio.jpg"
},
{
  "Player": "Wade Boggs",
  "HR": 118,
  "img": "Images/Wade Boggs.jpg"
},
{
  "Player": "Roberto Alomar",
  "HR": 210,
  "img": "Images/Roberto Alomar.jpg"
},
{
  "Player": "DJ LeMahieu",
  "HR": 112,
  "img": "Images/DJ LeMahieu.jpg"
},
{
  "Player": "Xander Bogaerts",
  "HR": 168,
  "img": "Images/Xander Bogaerts.jpg"
},
{
  "Player": "Dansby Swanson",
  "HR": 115,
  "img": "Images/Dansby Swanson.jpg"
},
{
  "Player": "Tim Anderson",
  "HR": 98,
  "img": "Images/Tim Anderson.jpg"
},
{
  "Player": "Whit Merrifield",
  "HR": 90,
  "img": "Images/Whit Merrifield.jpg"
},
{
  "Player": "Yadier Molina",
  "HR": 176,
  "img": "Images/Yadier Molina.jpg"
},
{
  "Player": "J.T. Realmuto",
  "HR": 138,
  "img": "Images/J.T. Realmuto.jpg"
},
{
  "Player": "Michael Brantley",
  "HR": 129,
  "img": "Images/Michael Brantley.jpg"
},
{
  "Player": "Brandon Phillips",
  "HR": 211,
  "img": "Images/Brandon Phillips.jpg"
},
{
  "Player": "Starling Marte",
  "HR": 147,
  "img": "Images/Starling Marte.jpg"
},
{
  "Player": "Clayton Kershaw",
  "HR": 1,
  "img": "Images/Clayton Kershaw.jpg"
},
{
  "Player": "Jacob deGrom",
  "HR": 2,
  "img": "Images/Jacob deGrom.jpg"
},
{
  "Player": "Max Scherzer",
  "HR": 1,
  "img": "Images/Max Scherzer.jpg"
},
{
  "Player": "Justin Verlander",
  "HR": 0,
  "img": "Images/Justin Verlander.jpg"
},
{
  "Player": "Zack Greinke",
  "HR": 9,
  "img": "Images/Zack Greinke.jpg"
},
{
  "Player": "Gerrit Cole",
  "HR": 0,
  "img": "Images/Gerrit Cole.jpg"
},
{
  "Player": "CC Sabathia",
  "HR": 3,
  "img": "Images/CC Sabathia.jpg"
},
{
  "Player": "Madison Bumgarner",
  "HR": 19,
  "img": "Images/Madison Bumgarner.jpg"
},
{
  "Player": "Pedro Martinez",
  "HR": 0,
  "img": "Images/Pedro Martinez.jpg"
},
{
  "Player": "Randy Johnson",
  "HR": 1,
  "img": "Images/Randy Johnson.jpg"
},
{
  "Player": "Roger Clemens",
  "HR": 0,
  "img": "Images/Roger Clemens.jpg"
},
{
  "Player": "Greg Maddux",
  "HR": 5,
  "img": "Images/Greg Maddux.jpg"
},
{
  "Player": "Tom Glavine",
  "HR": 1,
  "img": "Images/Tom Glavine.jpg"
},
{
  "Player": "John Smoltz",
  "HR": 3,
  "img": "Images/John Smoltz.jpg"
},
{
  "Player": "Nolan Ryan",
  "HR": 2,
  "img": "Images/Nolan Ryan.jpg"
},
{
  "Player": "Mark Buehrle",
  "HR": 1,
  "img": "Images/Mark Buehrle.jpg"
},
{
  "Player": "David Wells",
  "HR": 0,
  "img": "Images/David Wells.jpg"
},
{
  "Player": "Bartolo Colon",
  "HR": 1,
  "img": "Images/Bartolo Colon.jpg"
},
{
  "Player": "Felix Hernandez",
  "HR": 1,
  "img": "Images/Felix Hernandez.jpg"
},
{
  "Player": "Stephen Strasburg",
  "HR": 0,
  "img": "Images/Stephen Strasburg.jpg"
},
{
  "Player": "Josh Donaldson",
  "HR": 276,
  "img": "Images/Josh Donaldson.jpg"
},
{
  "Player": "Andrelton Simmons",
  "HR": 79,
  "img": "Images/Andrelton Simmons.jpg"
},
{
  "Player": "Buster Posey",
  "HR": 158,
  "img": "Images/Buster Posey.jpg"
},
{
  "Player": "Carlos Correa",
  "HR": 174,
  "img": "Images/Carlos Correa.jpg"
},
{
  "Player": "George Springer",
  "HR": 244,
  "img": "Images/George Springer.jpg"
},
{
  "Player": "Kyle Schwarber",
  "HR": 256,
  "img": "Images/Kyle Schwarber.jpg"
},
{
  "Player": "Matt Olson",
  "HR": 219,
  "img": "Images/Matt Olson.jpg"
},
{
  "Player": "Trea Turner",
  "HR": 138,
  "img": "Images/Trea Turner.jpg"
},
{
  "Player": "Francisco Lindor",
  "HR": 215,
  "img": "Images/Francisco Lindor.jpg"
},
{
  "Player": "Bo Bichette",
  "HR": 85,
  "img": "Images/Bo Bichette.jpg"
},
{
  "Player": "Joey Votto",
  "HR": 356,
  "img": "Images/Joey Votto.jpg"
},
{
  "Player": "Nelson Cruz",
  "HR": 464,
  "img": "Images/Nelson Cruz.jpg"
},
{
  "Player": "Javier Baez",
  "HR": 179,
  "img": "Images/Javier Baez.jpg"
},
{
  "Player": "Manny Machado",
  "HR": 312,
  "img": "Images/Manny Machado.jpg"
},
{
  "Player": "Alex Bregman",
  "HR": 170,
  "img": "Images/Alex Bregman.jpg"
},
{
  "Player": "Jose Abreu",
  "HR": 263,
  "img": "Images/Jose Abreu.jpg"
},
{
  "Player": "Andrew McCutchen",
  "HR": 299,
  "img": "Images/Andrew McCutchen.jpg"
},
{
  "Player": "Christian Yelich",
  "HR": 183,
  "img": "Images/Christian Yelich.jpg"
},
{
  "Player": "Ronald Acuna Jr.",
  "HR": 170,
  "img": "Images/Ronald Acuna Jr.jpg"
},
{
  "Player": "Vladimir Guerrero Jr.",
  "HR": 130,
  "img": "Images/Vladimir Guerrero Jr.jpg"
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