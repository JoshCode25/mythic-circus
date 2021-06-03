import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';

export default class MischievousGnome extends Card { //onStart - sets up Mischievous Gnome card coding class. Each player will have 1 card created with this class
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = "-";
		this.enableLabor = false;
		this.perf = 1;
		this.enablePerf = true;
		this.cost = 0;
		this.ability = "Attack (1)";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678128/Mythic%20Circus/Mischevious%20Gnome.png";
		this.attack = 1;

		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;

	}

	playOnDeck() {
		gameKeeper.activePlayer.performancePoints += this.perf;

		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;

		gameKeeper.addPendingAttack(this.attack, this.name);

		this.totalOnDeck++;
		this.totalAttacks++;
	}

}