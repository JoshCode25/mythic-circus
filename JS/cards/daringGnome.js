import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';

export default class DaringGnome extends Card{ //onStart - sets up Daring Gnome card coding class. Each player will have 2 cards created with this class
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = "-";
		this.enableLabor = false;
		this.perf = 1;
		this.enablePerf = true;
		this.cost = 0;
		this.ability = "He's a little off his rocker";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678073/Mythic%20Circus/Daring%20Gnome.png";

		this.totalLabored = 0;
		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;
	}

}
