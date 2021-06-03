import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';

export default class Minotaur extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 2;
		this.enableLabor = true;
		this.perf = 1;
		this.enablePerf = true;
		this.cost = 4;
		this.ability = "Resilient: requires 2 injuries to be discarded";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678128/Mythic%20Circus/Minotaur.png";
		this.injured = false;
		this.icon = "images/icons/Minotaur Shield.png";

		this.totalLabored = 0;
		this.totalInjuries = 0;
		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		gameKeeper.activePlayer.totalLaborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;

		this.totalLabored++;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;

		this.injured = false;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;

		this.totalOnDeck++;
	}

	injure(){
		
		//if Minotaur hasn't been injured before, it looses it's "resilience"
		if(!this.injured) {

			this.injured = true;
			this.icon = "images/icons/Minotaur Shield - Broken.png";

			//updates shield icon to represent it's been injured
			let card = document.getElementById(this.mark);
			let shieldImg = card.querySelector(".miniDisplayIcon");
			shieldImg.src = this.icon;

			this.totalInjuries++;
			gameKeeper.activePlayer.totalInjuries++;

		} else if(this.injured) { //if Minotaur's been injured before, it's discarded

			//return parameters back to default values
			this.injured = false;
			this.icon = "images/icons/Minotaur Shield.png";

			gameKeeper.activePlayer.moveOnDeckToDiscard(this.mark);

			this.totalInjuries++;
			this.totalInjured++;
			gameKeeper.activePlayer.totalInjuries++;
			gameKeeper.activePlayer.totalInjured++;

		}
	}

	perform() {

		this.injured = false;
		this.icon = "images/icons/Minotaur Shield.png";

		this.totalPerfed++;

	}
}