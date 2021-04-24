import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';
import utility from '../utility.js';
import gameSetup from '../gameSetup.js';

export default class Faun extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 0;
		this.enablePerf = true;
		this.cost = 3;
		this.ability = "Gains +1 Perf for each other active Performer";
		this.image = "images/Faun.png";
	}

	sentToDiscard() {

		this.perf = 0;

	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints}`;
	}

	playOnDeck(){

		this.perf = gameKeeper.activePlayer.onDeck.length-1; //playOnDeck() is called after card is added to onDeck array, so use length-1
		gameKeeper.activePlayer.performancePoints += this.perf;
		
		document.getElementById(this.mark).querySelector(".miniDisplayPerf").textContent = this.perf.toString();
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints}`;

	}

	perfCount() {

		let ownerIndex = utility.getIndexByNameValue(gameSetup.players, this.owner);
		let owner = gameSetup.players[ownerIndex];
		this.perf = owner.onDeck.length-1; //uses length-1 because Faun is already in onDeck array
		document.getElementById(this.mark).querySelector(".miniDisplayPerf").textContent = this.perf.toString(); //update perf display value

		if(gameKeeper.activePlayer == owner) {

			console.log(`${this.name} owner: ${this.owner} is the activePlayer`);
			gameKeeper.activePlayer.performancePoints += this.perf;

		} else {

			console.log(`${this.name} owner: ${this.owner} is not the activePlayer`);
			owner.performancePoints += this.perf;
			
		}

	}
}
