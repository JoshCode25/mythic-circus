import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';

export default class Golem extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 2;
		this.enableLabor = true;
		this.perf = "-";
		this.enablePerf = false;
		this.cost = 3;
		this.ability = "Draw (1)";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678133/Mythic%20Circus/Golem.png";

		this.totalLabored = 0;
	}

	playLabor(){

		gameKeeper.activePlayer.laborPoints += this.labor;
		gameKeeper.activePlayer.totalLaborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
		setTimeout(function() 
			{gameKeeper.activePlayer.drawFromDeck.call(
				gameKeeper.activePlayer, 1,'activePlayerDiscardCount', 'activePlayerDeckCount')
			}, 250
		);
		
		this.totalLabored++;
	}
}