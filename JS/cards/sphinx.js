import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';
import artist from '../artist.js';
import utility from '../utility.js';

export default class Sphinx extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 3;
		this.enablePerf = true;
		this.cost = 5;
		this.ability = "Perf: you may Draw (2) then discard (2)";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678131/Mythic%20Circus/Sphinx.png";

		this.totalLabored = 0;
		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		gameKeeper.activePlayer.totalLaborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;

		this.totalLabored++;
		gameKeeper.activePlayer.totalLabored++;
	}

	playOnDeck(){

		//adds Perf value and updates display
		gameKeeper.activePlayer.performancePoints += this.perf;

		gameKeeper.updateDisplayCount("activePlayerPerfCount", `Perf: ${gameKeeper.activePlayer.performancePoints}`);

		this.totalOnDeck++;

		let choiceContainerId = "sphinxChoiceContainer";
		let drawAmount = 2;
		let discardAmount = 2;

		//give option to Draw (2), then Discard (2)
		artist.renderChoiceDialogue(choiceContainerId, `Draw ${drawAmount} then Discard ${discardAmount}?`, "Draw", "Pass");

		let choiceContainer = document.getElementById(choiceContainerId);
		let leftButton = choiceContainer.querySelector(".buttonLeft");
		let rightButton = choiceContainer.querySelector(".buttonRight");

		let discardContainerId = "sphinxPerfContainer";
		let discardTitle = `Choose ${discardAmount} to Discard`;
		let divClass = "sphinxDiscardSelect";

		leftButton.addEventListener("click", function(){

			//removes first dialogue window
			document.getElementById("GameAreaWrapper").removeChild(choiceContainer);

			//draws cards as promised
			gameKeeper.activePlayer.drawFromDeck(drawAmount, "activePlayerDiscardCount", "activePlayerDeckCount");

			//renders hand to choose cards to discard
			artist.renderArrayMini(gameKeeper.activePlayer.hand, discardContainerId, discardTitle, divClass, "Discard", "Reset");

			let discardContainer = document.getElementById(discardContainerId);
			let sphinxSelected = []; //container for selected cards
			let sphinxSelectedTest = false; //defaults to not have a enough cards selected

			let discardButton = discardContainer.querySelector(".buttonLeft");
			let resetButton = discardContainer.querySelector(".buttonRight");

			//removes option to close window
			let renderClose = discardContainer.querySelector(".renderClose");
			discardContainer.removeChild(renderClose);

			//enables checking on selected card(s)
			let renderedHeaderEventListener = document.querySelector(".renderArrayContainer .renderedHeader"); 
			renderedHeaderEventListener.addEventListener("click", function(){

				console.log(sphinxSelected);
				alert(sphinxSelected.length);
			
			});

			//adds listener to all rendered cards to be added to discard array when clicked
			let renderedCards = document.querySelectorAll(`.${divClass}`); 
			renderedCards.forEach(function(elem){
				elem.addEventListener("click", function(){

					let cardId = this.id;
					let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.hand, cardId);
					let cardSelected = gameKeeper.activePlayer.hand[cardIndex];
					let discardContainer = document.getElementById(discardContainerId);
				
					console.log(sphinxSelected.length);

					//if sphinxSelected has less than 2 cards in it, add red border to clicked cards
					if(sphinxSelected.length < discardAmount) {

						discardContainer.querySelector(`#${cardId}`).classList.add("redDiscardBorder");

					} else { //render warning near cursor saying 2 cards have already been selected

						gameKeeper.gameLog(`${sphinxSelected.length} cards have already been selected to discard. Reset if you'd like to change them.`);

					}

					//if less than 2 cards have been selected, adds clicked card to selected array
					if(sphinxSelected.length < discardAmount) {

						sphinxSelected.push(cardSelected);
						
						//checks if 2 cards have been selected, then clears to activate discard
						if(sphinxSelected.length === discardAmount) {

							sphinxSelectedTest = true;

						}

					} else if(sphinxSelected.length > discardAmount) { //error check
						console.log("sphinx playOnDeck() error");
					}
					
				})
			})

			discardButton.addEventListener("click", function(){

				//checks if cards to discard have been selected. if true, discards them
				if(sphinxSelectedTest) {

					sphinxSelected.forEach( function(elem) {
						
						console.log("sphinxSelected forEach Discarding");
						let cardId = elem.mark;
						let cardIndex = gameKeeper.activePlayer.hand.findIndex(elem => elem.mark === cardId);
						console.log(cardIndex);
						gameKeeper.activePlayer.moveHandToDiscard(cardIndex);

					})

					document.getElementById("GameAreaWrapper").removeChild(discardContainer);

				}

			})

			resetButton.addEventListener("click", function(){

				//clears sphinxSelected array
				if(sphinxSelected.length > 0) {

					console.log(`sphinx length1 ${sphinxSelected.length}`);
					sphinxSelected.length = 0;
					console.log(`sphinx length2 ${sphinxSelected.length}`);
				}

				//removes red borders in sphinx container
				if(discardContainer.querySelectorAll(".redDiscardBorder")) {

					let discardBorders = discardContainer.querySelectorAll(".redDiscardBorder");

					discardBorders.forEach(function(elem){

						elem.classList.remove("redDiscardBorder");

					})

				}
			})

		})
	
		//removes container if decided to pass
		rightButton.addEventListener("click", function() {

			document.getElementById("GameAreaWrapper").removeChild(choiceContainer);

		})
	}
}