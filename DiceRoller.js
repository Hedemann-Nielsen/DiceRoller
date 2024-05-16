// hent alle html elementer
let roundNumber = document.getElementById("roundNumber");
let messageContainer = document.getElementById("messageContainer");
let throwDicesBtn = document.getElementById("throwDices");
let resetGameBtn = document.getElementById("resetGame");
let addPlayerBtn = document.getElementById("addPlayer");
let resetPlayersBtn = document.getElementById("resetPlayers");
let playerNameInput = document.getElementById("playerName");
let playersContainer = document.getElementById("playersContainer");
let dice1 = document.getElementById("dice1");
let dice2 = document.getElementById("dice2");

// variabler til at starte spillet
let players = [];
let currentRound = 1;
let currentPlayerIndex = 0;

// sætter rundenummer tekseten ind i elementet fra starten
roundNumber.innerText = ` ${currentRound} ud af 3`;

// variabler der kan opdateres
let randomNumber1 = 0;
let randomNumber2 = 0;
let diceSum = 0;

// spillernes værdier
class Player {
	constructor(playerName) {
		this.playerName = playerName;
		this.totalScore = 0;
		this.element = document.createElement("div");
		this.element.className = "flexContainer";
		this.scoreElement = document.createElement("p");
		this.updateScoreElement();
		this.element.innerHTML = `<p>${this.playerName} har:</p>`;
		this.element.appendChild(this.scoreElement);
		playersContainer.appendChild(this.element);
	}

	updateScore(roundScore) {
		this.totalScore += roundScore;
		this.updateScoreElement();
	}

	updateScoreElement() {
		this.scoreElement.innerText = `${this.totalScore} point`;
	}

	remove() {
		playersContainer.removeChild(this.element);
	}
}

// Knap events
throwDicesBtn.addEventListener("click", rollDices);
resetGameBtn.addEventListener("click", resetGame);
addPlayerBtn.addEventListener("click", addPlayer);
resetPlayersBtn.addEventListener("click", resetPlayers);
playerNameInput.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		addPlayer();
	}
});

// Tilføj spiller
function addPlayer() {
	const playerName = playerNameInput.value.trim();
	if (playerName) {
		players.push(new Player(playerName));
		playerNameInput.value = "";
	}
}

// Nulstil spillere
function resetPlayers() {
	players.forEach((player) => player.remove());
	players = [];
	resetGame();
}

// Kast terningerne
function rollDices() {
	if (players.length < 2) {
		messageContainer.innerText =
			"Tilføj mindst 2 spillere for at starte spillet";
		return;
	}

	randomNumber1 = Math.ceil(Math.random() * 6);
	randomNumber2 = Math.ceil(Math.random() * 6);
	dice1.src = `./assets/dice${randomNumber1}.png`;
	dice2.src = `./assets/dice${randomNumber2}.png`;
	console.log("terning kastet");

	diceSum = randomNumber1 + randomNumber2;

	let currentPlayer = players[currentPlayerIndex];
	currentPlayer.updateScore(diceSum);
	messageContainer.innerText = `${currentPlayer.playerName} modtog ${diceSum} point`;

	currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

	if (currentPlayerIndex === 0) {
		updateRoundNumber();
	}

	throwDicesBtn.innerText = `${players[currentPlayerIndex].playerName} - kaster terningen`;
}

// updater runden
function updateRoundNumber() {
	currentRound++;
	if (currentRound <= 3) {
		roundNumber.innerText = ` ${currentRound} ud af 3`;
	} else {
		endGame();
	}
}

// Definer konfetti
function showConfetti() {
	confetti({
		particleCount: 500,
		spread: 100,
		origin: { y: 0.6 },
	});
}

// start spillet forfra
function endGame() {
	let winner = players.reduce((prev, current) =>
		prev.totalScore > current.totalScore ? prev : current
	);
	messageContainer.innerText = `${winner.playerName} vinder spillet!`;
	messageContainer.style.fontSize = "2em"; // Gør teksten større
	messageContainer.style.fontWeight = "bold"; // Gør teksten fed
	showConfetti();

	throwDicesBtn.disabled = true;
	throwDicesBtn.style.backgroundColor = "#d3d3d3"; // Lys grå farve
	throwDicesBtn.style.color = "#808080"; // Mørk grå farve for tekst
}

// reset spillet
function resetGame() {
	players.forEach((player) => (player.totalScore = 0));
	players.forEach((player) => player.updateScoreElement());
	messageContainer.innerText = `Tryk på "Kast terningerne" for at starte`;
	dice1.src = `./assets/dice1.png`;
	dice2.src = `./assets/dice1.png`;

	currentRound = 1;
	currentPlayerIndex = 0;
	roundNumber.innerText = ` ${currentRound} ud af 3`;
	throwDicesBtn.disabled = false;
	messageContainer.style.fontSize = "20px"; // Gør teksten større
	messageContainer.style.fontWeight = "normal"; // Gør teksten fed
	throwDicesBtn.style.backgroundColor = "#006ae8"; // Lys grå farve
	throwDicesBtn.style.color = "aliceblue"; // Mørk grå farve for tekst

	if (players.length > 0) {
		throwDicesBtn.innerText = `${players[currentPlayerIndex].playerName} - kaster terningen`;
	}
}
