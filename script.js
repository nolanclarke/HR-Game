const MULTIPLIERS = [1, 1, 1, 2, 2, 3, 3, 4, 5];
const GOAL_SCORE = 12000;

const players = [
  {
    "Player": "Barry Bonds",
    "HR": 762,
    "img": "https://ui-avatars.com/api/?name=Barry+Bonds&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Hank Aaron",
    "HR": 755,
    "img": "https://ui-avatars.com/api/?name=Hank+Aaron&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Babe Ruth",
    "HR": 714,
    "img": "https://ui-avatars.com/api/?name=Babe+Ruth&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Albert Pujols",
    "HR": 703,
    "img": "https://ui-avatars.com/api/?name=Albert+Pujols&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Alex Rodriguez",
    "HR": 696,
    "img": "https://ui-avatars.com/api/?name=Alex+Rodriguez&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Willie Mays",
    "HR": 660,
    "img": "https://ui-avatars.com/api/?name=Willie+Mays&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Ken Griffey Jr.",
    "HR": 630,
    "img": "https://ui-avatars.com/api/?name=Ken+Griffey+Jr.&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Jim Thome",
    "HR": 612,
    "img": "https://ui-avatars.com/api/?name=Jim+Thome&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Sammy Sosa",
    "HR": 609,
    "img": "https://ui-avatars.com/api/?name=Sammy+Sosa&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "David Ortiz",
    "HR": 541,
    "img": "https://ui-avatars.com/api/?name=David+Ortiz&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Mike Trout",
    "HR": 368,
    "img": "https://ui-avatars.com/api/?name=Mike+Trout&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Shohei Ohtani",
    "HR": 171,
    "img": "https://ui-avatars.com/api/?name=Shohei+Ohtani&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Bryce Harper",
    "HR": 306,
    "img": "https://ui-avatars.com/api/?name=Bryce+Harper&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Aaron Judge",
    "HR": 257,
    "img": "https://ui-avatars.com/api/?name=Aaron+Judge&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Giancarlo Stanton",
    "HR": 402,
    "img": "https://ui-avatars.com/api/?name=Giancarlo+Stanton&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Nolan Arenado",
    "HR": 325,
    "img": "https://ui-avatars.com/api/?name=Nolan+Arenado&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Freddie Freeman",
    "HR": 321,
    "img": "https://ui-avatars.com/api/?name=Freddie+Freeman&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Anthony Rizzo",
    "HR": 295,
    "img": "https://ui-avatars.com/api/?name=Anthony+Rizzo&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Paul Goldschmidt",
    "HR": 340,
    "img": "https://ui-avatars.com/api/?name=Paul+Goldschmidt&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Jose Ramirez",
    "HR": 230,
    "img": "https://ui-avatars.com/api/?name=Jose+Ramirez&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Derek Jeter",
    "HR": 260,
    "img": "https://ui-avatars.com/api/?name=Derek+Jeter&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Ichiro Suzuki",
    "HR": 117,
    "img": "https://ui-avatars.com/api/?name=Ichiro+Suzuki&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Tony Gwynn",
    "HR": 135,
    "img": "https://ui-avatars.com/api/?name=Tony+Gwynn&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Rod Carew",
    "HR": 92,
    "img": "https://ui-avatars.com/api/?name=Rod+Carew&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Joe Mauer",
    "HR": 143,
    "img": "https://ui-avatars.com/api/?name=Joe+Mauer&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Ozzie Smith",
    "HR": 28,
    "img": "https://ui-avatars.com/api/?name=Ozzie+Smith&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Pete Rose",
    "HR": 160,
    "img": "https://ui-avatars.com/api/?name=Pete+Rose&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Craig Biggio",
    "HR": 291,
    "img": "https://ui-avatars.com/api/?name=Craig+Biggio&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Wade Boggs",
    "HR": 118,
    "img": "https://ui-avatars.com/api/?name=Wade+Boggs&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Roberto Alomar",
    "HR": 210,
    "img": "https://ui-avatars.com/api/?name=Roberto+Alomar&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "DJ LeMahieu",
    "HR": 112,
    "img": "https://ui-avatars.com/api/?name=DJ+LeMahieu&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Xander Bogaerts",
    "HR": 168,
    "img": "https://ui-avatars.com/api/?name=Xander+Bogaerts&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Dansby Swanson",
    "HR": 115,
    "img": "https://ui-avatars.com/api/?name=Dansby+Swanson&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Tim Anderson",
    "HR": 98,
    "img": "https://ui-avatars.com/api/?name=Tim+Anderson&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Whit Merrifield",
    "HR": 90,
    "img": "https://ui-avatars.com/api/?name=Whit+Merrifield&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Yadier Molina",
    "HR": 176,
    "img": "https://ui-avatars.com/api/?name=Yadier+Molina&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "J.T. Realmuto",
    "HR": 138,
    "img": "https://ui-avatars.com/api/?name=J.T.+Realmuto&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Michael Brantley",
    "HR": 129,
    "img": "https://ui-avatars.com/api/?name=Michael+Brantley&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Brandon Phillips",
    "HR": 211,
    "img": "https://ui-avatars.com/api/?name=Brandon+Phillips&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Starling Marte",
    "HR": 147,
    "img": "https://ui-avatars.com/api/?name=Starling+Marte&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Clayton Kershaw",
    "HR": 1,
    "img": "https://ui-avatars.com/api/?name=Clayton+Kershaw&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Jacob deGrom",
    "HR": 2,
    "img": "https://ui-avatars.com/api/?name=Jacob+deGrom&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Max Scherzer",
    "HR": 1,
    "img": "https://ui-avatars.com/api/?name=Max+Scherzer&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Justin Verlander",
    "HR": 0,
    "img": "https://ui-avatars.com/api/?name=Justin+Verlander&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Zack Greinke",
    "HR": 9,
    "img": "https://ui-avatars.com/api/?name=Zack+Greinke&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Gerrit Cole",
    "HR": 0,
    "img": "https://ui-avatars.com/api/?name=Gerrit+Cole&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "CC Sabathia",
    "HR": 3,
    "img": "https://ui-avatars.com/api/?name=CC+Sabathia&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Madison Bumgarner",
    "HR": 19,
    "img": "https://ui-avatars.com/api/?name=Madison+Bumgarner&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Pedro Martinez",
    "HR": 0,
    "img": "https://ui-avatars.com/api/?name=Pedro+Martinez&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Randy Johnson",
    "HR": 1,
    "img": "https://ui-avatars.com/api/?name=Randy+Johnson&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Roger Clemens",
    "HR": 0,
    "img": "https://ui-avatars.com/api/?name=Roger+Clemens&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Greg Maddux",
    "HR": 5,
    "img": "https://ui-avatars.com/api/?name=Greg+Maddux&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Tom Glavine",
    "HR": 1,
    "img": "https://ui-avatars.com/api/?name=Tom+Glavine&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "John Smoltz",
    "HR": 3,
    "img": "https://ui-avatars.com/api/?name=John+Smoltz&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Nolan Ryan",
    "HR": 2,
    "img": "https://ui-avatars.com/api/?name=Nolan+Ryan&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Mark Buehrle",
    "HR": 1,
    "img": "https://ui-avatars.com/api/?name=Mark+Buehrle&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "David Wells",
    "HR": 0,
    "img": "https://ui-avatars.com/api/?name=David+Wells&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Bartolo Colon",
    "HR": 1,
    "img": "https://ui-avatars.com/api/?name=Bartolo+Colon&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Felix Hernandez",
    "HR": 1,
    "img": "https://ui-avatars.com/api/?name=Felix+Hernandez&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Stephen Strasburg",
    "HR": 0,
    "img": "https://ui-avatars.com/api/?name=Stephen+Strasburg&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Josh Donaldson",
    "HR": 276,
    "img": "https://ui-avatars.com/api/?name=Josh+Donaldson&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Andrelton Simmons",
    "HR": 79,
    "img": "https://ui-avatars.com/api/?name=Andrelton+Simmons&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Buster Posey",
    "HR": 158,
    "img": "https://ui-avatars.com/api/?name=Buster+Posey&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Carlos Correa",
    "HR": 174,
    "img": "https://ui-avatars.com/api/?name=Carlos+Correa&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "George Springer",
    "HR": 244,
    "img": "https://ui-avatars.com/api/?name=George+Springer&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Kyle Schwarber",
    "HR": 256,
    "img": "https://ui-avatars.com/api/?name=Kyle+Schwarber&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Matt Olson",
    "HR": 219,
    "img": "https://ui-avatars.com/api/?name=Matt+Olson&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Trea Turner",
    "HR": 138,
    "img": "https://ui-avatars.com/api/?name=Trea+Turner&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Francisco Lindor",
    "HR": 215,
    "img": "https://ui-avatars.com/api/?name=Francisco+Lindor&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Bo Bichette",
    "HR": 85,
    "img": "https://ui-avatars.com/api/?name=Bo+Bichette&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Joey Votto",
    "HR": 356,
    "img": "https://ui-avatars.com/api/?name=Joey+Votto&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Nelson Cruz",
    "HR": 464,
    "img": "https://ui-avatars.com/api/?name=Nelson+Cruz&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Javier Baez",
    "HR": 179,
    "img": "https://ui-avatars.com/api/?name=Javier+Baez&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Manny Machado",
    "HR": 312,
    "img": "https://ui-avatars.com/api/?name=Manny+Machado&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Alex Bregman",
    "HR": 170,
    "img": "https://ui-avatars.com/api/?name=Alex+Bregman&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Jose Abreu",
    "HR": 263,
    "img": "https://ui-avatars.com/api/?name=Jose+Abreu&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Andrew McCutchen",
    "HR": 299,
    "img": "https://ui-avatars.com/api/?name=Andrew+McCutchen&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Christian Yelich",
    "HR": 183,
    "img": "https://ui-avatars.com/api/?name=Christian+Yelich&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Ronald Acu\u00f1a Jr.",
    "HR": 170,
    "img": "https://ui-avatars.com/api/?name=Ronald+Acu\u00f1a+Jr.&background=0D1117&color=fff&size=64"
  },
  {
    "Player": "Vladimir Guerrero Jr.",
    "HR": 130,
    "img": "https://ui-avatars.com/api/?name=Vladimir+Guerrero+Jr.&background=0D1117&color=fff&size=64"
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