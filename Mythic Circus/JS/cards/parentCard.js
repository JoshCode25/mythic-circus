import gameKeeper from '../gameKeeper.js';
import gameSetup from '../gameSetup.js';
import utility from '../utility.js';

export default class Card { //parent class to pass information to all other cards if needed
	constructor(name,mark, owner) {
		this.name = name;
		this.mark = mark;
		this.owner = owner;

		this.totalLabored = 0;
		this.totalInjuries = 0;
		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;
	}

	playLabor() {

		gameKeeper.activePlayer.laborPoints += this.labor;
		gameKeeper.activePlayer.totalLaborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints}`;

		this.totalLabored++;

	}

	playOnDeck() {

		gameKeeper.activePlayer.performancePoints += this.perf;

		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints}`;

		this.totalOnDeck++;
		
	}

	playDiscard() {
		gameKeeper.gameLog(`Discarded ${this.name}`);
	}

	injure(){

		gameKeeper.activePlayer.moveOnDeckToDiscard(this.mark);

		this.totalInjured++;
		gameKeeper.activePlayer.totalInjuries++;
		gameKeeper.activePlayer.totalInjured++;
	}

	discarded(){

	}

	sentToDiscard(){

	}

	perform(){

		this.totalPerfed++;

	}

	perfCount() {

		let ownerIndex = utility.getIndexByNameValue(gameSetup.players, this.owner);
		let owner = gameSetup.players[ownerIndex];

		if(gameKeeper.activePlayer == owner) {

			gameKeeper.activePlayer.performancePoints += this.perf;

		} else {

			owner.performancePoints += this.perf;
			
		}
	}

}