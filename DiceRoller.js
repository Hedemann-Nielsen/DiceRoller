//hent alle html elementer
let playerOneScore = document.getElementById("playerOneScore");
let playerTwoScore = document.getElementById("playerTwoScore");
let roundNumber = document.getElementById("roundNumber");
let messageContainer = document.getElementById("messageContainer");
let trhowDicesBtn = document.getElementById("trhowDices");
let resetGameBtn = document.getElementById("resetGame");
let dice1 = document.getElementById("dice1");
let dice2 = document.getElementById("dice2");

//variabler til at starte spillet
let playerOneTotaltScore = 0;
let playerTwoTotalScore = 0;
let currentRound = 1;
let isPlayerOne = true;

//sætter rundenummer tekseten ind i elementet fra starten
roundNumber.innerText = ` ${currentRound} ud af 3`;

//variabler der kan opdateres
let randomNumber1 = 0;
let randomNumber2 = 0;
let diceSum = 0;

//spillernes verdier
class Player {
	constructor(playerName) {
		this.playerName = playerName;
		this.totalScore = 0;
		this.isPlayerTurn = false;
	}

	updateScore(roundScore) {
		this.totalScore += roundScore;
	}
}
// opret spillerne
let playerOne = new Player("PlayerOne");
let playerTwo = new Player("PlayerTwo");

//Knap events
trhowDicesBtn.addEventListener("click", rollDices);
resetGameBtn.addEventListener("click", resetGame);

//Kast terningerne
function rollDices() {
	randomNumber1 = Math.floor(Math.random() * 6) + 1;
	randomNumber2 = Math.floor(Math.random() * 6) + 1;

	dice1.src = `./assets/dice${randomNumber1}.png`;
	dice2.src = `./assets/dice${randomNumber2}.png`;
	console.log("terning kastet");

	diceSum = randomNumber1 + randomNumber2;

	if (isPlayerOne) {
		playerOne.updateScore(diceSum);
		updatePlayerScore("PlayerOne", diceSum);
	} else {
		playerTwo.updateScore(diceSum);
		updatePlayerScore("PlayerTwo", diceSum);
		updateRoundNumber();
	}
}

//opdater spillernes point
function updatePlayerScore(player, diceSum) {
	switch (player) {
		case "PlayerOne":
			playerOneScore.innerText = `${playerOne.totalScore} point`;
			messageContainer.innerText = `Spiller 1 modtog ${diceSum} point`;
			isPlayerOne = false;
			break;

		case "PlayerTwo":
			playerTwoScore.innerText = `${playerTwo.totalScore} point`;
			messageContainer.innerText = `Spiller 2 modtog ${diceSum} point`;
			isPlayerOne = true;
			break;

		default:
			console.error("switch - no value matches");
	}
}

//updater runden
function updateRoundNumber() {
	currentRound++;
	if (currentRound <= 3) {
		roundNumber.innerText = ` ${currentRound} ud af 3`;
	} else {
		endGame();
	}
}

//Definer konfetti
function showConfetti() {
	confetti({
		particleCount: 500,
		spread: 100,
		origin: { y: 0.6 },
	});
}

//start spillet forfra
function endGame() {
	if (playerOne.totalScore > playerTwo.totalScore) {
		messageContainer.innerText = "Spiller 1 vinder spillet!";
		messageContainer.style.fontSize = "2em"; // Gør teksten større
		messageContainer.style.fontWeight = "bold"; // Gør teksten fed
		showConfetti();
	} else if (playerTwo.totalScore > playerOne.totalScore) {
		messageContainer.innerText = "Spiller 2 vinder spillet!";
		messageContainer.style.fontSize = "2em"; // Gør teksten større
		messageContainer.style.fontWeight = "bold"; // Gør teksten fed
		showConfetti();
	} else {
		messageContainer.innerText = "Spillet endte uafgjort!";
		messageContainer.style.fontSize = "2em"; // Gør teksten større
		messageContainer.style.fontWeight = "bold"; // Gør teksten fed
	}

	playerOneTotaltScore = 0;
	playerTwoTotalScore = 0;
	playerOneScore.innerText = `0 point`;
	playerTwoScore.innerText = `0 point`;
	dice1.src = `./assets/dice1.png`;
	dice2.src = `./assets/dice1.png`;

	currentRound = 1;
	isPlayerOne = true;
	roundNumber.innerText = ` ${currentRound} ud af 3`;

	trhowDicesBtn.disabled = true;
	trhowDicesBtn.style.backgroundColor = "#d3d3d3"; // Lys grå farve
	trhowDicesBtn.style.color = "#808080"; // Mørk grå farve for tekst
}

//reset spillet
function resetGame() {
	playerOne.totalScore = 0;
	playerTwo.totalScore = 0;
	playerOneScore.innerText = `0 point`;
	playerTwoScore.innerText = `0 point`;
	messageContainer.innerText = `tryk på "Kast terningerne" for at starte`;
	dice1.src = `./assets/dice1.png`;
	dice2.src = `./assets/dice1.png`;

	currentRound = 1;
	isPlayerOne = true;
	roundNumber.innerText = ` ${currentRound} ud af 3`;
	trhowDicesBtn.disabled = false;
	messageContainer.style.fontSize = "20px"; // Gør teksten større
	messageContainer.style.fontWeight = "normal"; // Gør teksten fed
	trhowDicesBtn.style.backgroundColor = "#006ae8"; // Lys grå farve
	trhowDicesBtn.style.color = "aliceblue"; // Mørk grå farve for tekst
}
