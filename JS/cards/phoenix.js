import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';
import artist from '../artist.js';
import utility from '../utility.js';

export default class Phoenix extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 4;
		this.enablePerf = true;
		this.cost = 5;
		this.ability = "At the start of your turn, you may discard a card to return Phoenix from your discard to your hand";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678132/Mythic%20Circus/Phoenix.png";

		this.totalLabored = 0;
		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;

	}

	rise() {

		if(gameKeeper.activePlayer.discard.some(elem => elem.name === "Phoenix")) {

			let activeDiscard = gameKeeper.activePlayer.discard;
			let phoenixCount = 0;
			let indexHolder = [];

			//look through cards in discard and save indexes of phoenix
			activeDiscard.forEach(function(elem, index) {

				if(elem.name === "Phoenix") {
					phoenixCount++
					indexHolder.push(index);
				}

				console.log(indexHolder);
				return indexHolder;
			});

			let handContainerId = "phoenixRiseContainer";
			let title = `Discard up to ${phoenixCount} to return that many Phoenix to hand`;
			let divClass = "phoenixDiscardSelect";
			let leftButtonText = "Return";
			let rightButtonText = "Reset";

			artist.renderArrayMini(gameKeeper.activePlayer.hand, handContainerId, title, divClass, leftButtonText, rightButtonText);

			let handContainer = document.getElementById(handContainerId);
			let phoenixSelected = []; //container for selected cards
			let phoenixSelectedTest = false; //defaults to not have a enough cards selected

			let discardButton = handContainer.querySelector(".buttonLeft");
			let resetButton = handContainer.querySelector(".buttonRight");

			//enables checking on selected card(s)
			let renderedHeaderEventListener = document.querySelector(".renderArrayContainer .renderedHeader"); 
			renderedHeaderEventListener.addEventListener("click", function(){

				console.log(phoenixSelected);
				alert(phoenixSelected.length);
			
			});

			//adds listener to all rendered cards to be added to discard array when clicked
			let renderedCards = document.querySelectorAll(`.${divClass}`); 
			renderedCards.forEach(function(elem){
				elem.addEventListener("click", function(){

					let cardId = this.id;
					let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.hand, cardId);
					let cardSelected = gameKeeper.activePlayer.hand[cardIndex];
				
					console.log(phoenixSelected.length);

					//if phoenixSelected has less than number of Phoenix in discard in it, add red border to clicked cards
					if(phoenixSelected.length < phoenixCount) {

						handContainer.querySelector(`#${cardId}`).classList.add("redDiscardBorder");

					} else { //render warning near cursor saying 2 cards have already been selected

						gameKeeper.gameLog(`${phoenixSelected.length} cards have already been selected to discard. Reset if you'd like to change them.`);

					}

						//if cards up to number of Phoenix's in discard have been selected, adds clicked card to selected array
						if(phoenixSelected.length < phoenixCount && !phoenixSelected.some(elem => elem.mark === cardSelected.mark)) {

							phoenixSelected.push(cardSelected);
							phoenixSelectedTest = true;

						} else if(phoenixSelected.length > phoenixCount) { //error check
							console.log("phoenix playOnDeck() error");
						}
						
					})
				})

				discardButton.addEventListener("click", function(){

					//checks if cards to discard have been selected. if true, discards them
					if(phoenixSelectedTest) {

						phoenixSelected.forEach( function(elem) {
							
							console.log("phoenixSelected forEach Discarding");
							let cardId = elem.mark;
							let cardIndex = gameKeeper.activePlayer.hand.findIndex(elem => elem.mark === cardId);
							console.log(cardIndex);
							gameKeeper.activePlayer.moveHandToDiscard(cardIndex);

						})

						//returns phoenix to hand based on number of cards discarded
						for(let i = phoenixSelected.length; i > 0; i--) {

							console.log("phoenixSelected forEach Returning");

							let cardIndex = gameKeeper.activePlayer.discard.findIndex(elem => elem.name === "Phoenix");
							console.log(cardIndex);
							gameKeeper.activePlayer.moveDiscardToHand(cardIndex, "activePlayerDiscardCount");

						}

						document.getElementById("GameAreaWrapper").removeChild(handContainer);

					}

				})

				resetButton.addEventListener("click", function(){

					//clears phoenixSelected array
					if(phoenixSelected.length > 0) {

						console.log(`phoenix length1 ${phoenixSelected.length}`);
						phoenixSelected.length = 0;
						console.log(`phoenix length2 ${phoenixSelected.length}`);
					}

					//removes red borders in phoenix container
					if(handContainer.querySelectorAll(".redDiscardBorder")) {

						let discardBorders = handContainer.querySelectorAll(".redDiscardBorder");

						discardBorders.forEach(function(elem){

							elem.classList.remove("redDiscardBorder");

						})

					}
				})
		
	
		}
	}

}