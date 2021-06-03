import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';

export default class Werewolf extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 2;
		this.enablePerf = true;
		this.cost = 3;
		this.ability = "Perf: Attack (1)";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678132/Mythic%20Circus/Werewolf.png";
		this.attack = 1;

		this.totalLabored = 0;
		this.totalInjuries = 0;
		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;

		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;

		gameKeeper.addPendingAttack(this.attack, this.name);

		this.totalOnDeck++;
		this.totalAttacks++;
	}
}
