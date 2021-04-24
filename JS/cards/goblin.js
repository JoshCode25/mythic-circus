import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';
import artist from '../artist.js';
import utility from '../utility.js';

export default class Goblin extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 1;
		this.enablePerf = true;
		this.cost = 2;
		this.ability = "Perf: may Discard (1), then Draw (1)";
		this.image = "images/Goblin.png";

		this.totalLabored = 0;
		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;

	}
	playLabor(){
		gameKeeper.activePlayer.laborPoints +=this.labor;
		gameKeeper.activePlayer.totalLaborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints}`;

		this.totalLabored++;
	}

	playOnDeck(){
		//adds Perf value and updates display
		gameKeeper.activePlayer.performancePoints += this.perf;

		gameKeeper.updateDisplayCount("activePlayerPerfCount", `Perf: ${gameKeeper.activePlayer.performancePoints}`);

		this.totalOnDeck++;

		if(gameKeeper.activePlayer.hand.length > 0) {
			//Discard (1) to Draw (1)
			let containerId = "goblinPerfContainer";
			let divClass = "goblinDiscardSelect";
			let goblinSelected = {}; //container for selected card
			let goblinSelectedTest = false; //defaults to not have a card selected

			let buttonDiscard = document.createElement("button");
			let buttonPass = document.createElement("button");
			buttonDiscard.innerText = "Discard (1)";
			buttonPass.innerText = "Pass";

			artist.renderArrayMini(gameKeeper.activePlayer.hand, containerId, "Discard (1) to Draw (1)?", divClass) //renders selection dialogue
			let goblinContainer = document.getElementById(containerId);

			let renderedHeaderEventListener = document.querySelector(".renderArrayContainer .renderedHeader"); //testing event listener
			renderedHeaderEventListener.addEventListener("click", function(){

				console.log(goblinSelected);
				alert(goblinSelected.name);
			
			});

			let renderedCards = document.querySelectorAll(`.${divClass}`); //adds listener to all rendered cards to be selected when clicked
			renderedCards.forEach(function(elem){
				elem.addEventListener("click", function(){

					let cardId = this.id;
					let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.hand, cardId);
					let cardSelected = gameKeeper.activePlayer.hand[cardIndex];
					goblinSelected = cardSelected;
					goblinSelectedTest = true;

					if(goblinContainer.querySelector(".redDiscardBorder")) { //if a card already has the discard border, remove it and add to clicked card

						console.log("Discard border true");
						goblinContainer.querySelector(".redDiscardBorder").classList.remove("redDiscardBorder");
						goblinContainer.querySelector(`#${cardId}`).classList.add("redDiscardBorder");

					} else { //add redDiscardBorder to selected card

						console.log("Discard Border false");
						goblinContainer.querySelector(`#${cardId}`).classList.add("redDiscardBorder");

					}
				})
			})

			//functionality and appearance of Discard button
			buttonDiscard.classList.add("button1");
			buttonDiscard.addEventListener("click", function(){

				if(goblinSelectedTest) { //checks if a card to discard had been selected, if true discards selected card and draws 1

					let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.hand, goblinSelected.mark);
					gameKeeper.activePlayer.moveHandToDiscard(cardIndex);
					gameKeeper.activePlayer.drawFromDeck(1, "activePlayerDiscardCount", "activePlayerDeckCount");

					let container = document.getElementById(containerId);
					document.getElementById("GameAreaWrapper").removeChild(container);

				}

			})

			//functionality and appearance of Pass button
			buttonPass.classList.add("button2");
			buttonPass.addEventListener("click", function(){

				let container = document.getElementById(containerId);
				document.getElementById("GameAreaWrapper").removeChild(container);

			})

			//attaches buttons to dialogue window
			goblinContainer.appendChild(buttonDiscard);
			goblinContainer.appendChild(buttonPass);
		}
	}
}
