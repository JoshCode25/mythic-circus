import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';

export default class WorkingGnome extends Card{ //onStart - sets up Working Gnome card coding class. Each player will have 7 cards created with this class
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = "-";
		this.enablePerf = false;
		this.cost = 0;
		this.ability = "Simply a Working Gnome";
		this.image = "images/Working Gnome.png";

		this.totalLabored = 0;
		
	}

	// playLabor() {
	// 	gameKeeper.activePlayer.laborPoints += this.labor;
	// 	gameKeeper.activePlayer.totalLaborPoints += this.labor;
	// 	document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints}`;

	// 	this.totalLabored++;
	// }

}