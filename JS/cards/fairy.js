import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';
import artist from '../artist.js';
import utility from '../utility.js';

export default class Fairy extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = "-";
		this.enableLabor = false;
		this.perf = 2;
		this.enablePerf = true;
		this.cost = 4;
		this.ability = `Perf: You may play a card from your discard On Stage with a hire cost less than ${this.playCostLimit}`;
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678125/Mythic%20Circus/Fairy.png";
		this.playCostLimit = 4;

		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;
	}

	playOnDeck(){

		gameKeeper.activePlayer.performancePoints += this.perf;
		this.totalOnDeck++;

		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints}`;

		if(gameKeeper.activePlayer.discard.length > 0) { //checks if there are cards in discard to choose

			let containerId = "fairyPerfContainer";
			let divClass = "fairyPlaySelect";
			let fairySelected = {}; //container for selected card
			let fairySelectedTest = false; //defaults to not have a card selected
	
			let buttonPlay = document.createElement("button");
			let buttonPass = document.createElement("button");
			buttonPlay.innerText = "Play on Stage";
			buttonPass.innerText = "Pass";
	
			artist.renderArrayMini(gameKeeper.activePlayer.discard, containerId, `Play 1 with Cost < ${this.playCostLimit}`, divClass) //renders selection dialogue
			let fairyContainer = document.getElementById(containerId);
	
			let renderedHeaderEventListener = document.querySelector(".renderArrayContainer .renderedHeader"); //testing event listener
			renderedHeaderEventListener.addEventListener("click", function(){
	
				console.log(fairySelected);
				alert(fairySelected.name);
			
			});
	
			//adds listener to rendered cards to be selected when clicked
			let renderedCards = document.querySelectorAll(`.${divClass}`);
			renderedCards.forEach(function(elem){

				let elemId = elem.id;
				console.log(elemId);
				let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.discard, elemId);
				let card = gameKeeper.activePlayer.discard[cardIndex];
				console.log(card);

				//only adds listeners to cards with cost less than limit & are allowed on Stage
				if(card.cost < this.playCostLimit && card.enablePerf) {
					console.log(elem.cost);
					elem.addEventListener("click", function(){
		
						let cardId = this.id;
						let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.discard, cardId);
						let cardSelected = gameKeeper.activePlayer.discard[cardIndex];
						fairySelected = cardSelected;
						fairySelectedTest = true;
		
						//if a card already has the discard border, remove it and add to clicked card
						if(fairyContainer.querySelector(".greenDiscardBorder")) { 
		
							console.log("Discard border true");
							fairyContainer.querySelector(".greenDiscardBorder").classList.remove("greenDiscardBorder");
							fairyContainer.querySelector(`#${cardId}`).classList.add("greenDiscardBorder");
		
						} else { //add greenDiscardBorder to selected card
		
							console.log("Discard Border false");
							fairyContainer.querySelector(`#${cardId}`).classList.add("greenDiscardBorder");
		
						}
					})
				}
			}, this);
	
			//functionality and appearance of Return button
			buttonPlay.classList.add("button1");
			buttonPlay.addEventListener("click", function(){
	
				 //checks if a card has been selected to play on Stage, if true plays it
				if(fairySelectedTest) {
	
					let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.discard, fairySelected.mark);
					let returnCard = gameKeeper.activePlayer.discard[cardIndex];
					console.log (returnCard);
					console.log(gameKeeper.activePlayer);

					gameKeeper.gameLog(`Plays ${returnCard.name} on Stage`);
					gameKeeper.activePlayer.returnDiscardToOnDeck(cardIndex, 'activePlayerDiscardCount');
	
					let container = document.getElementById(containerId);
					document.getElementById("GameAreaWrapper").removeChild(container);

					gameKeeper.activePlayer.onDeck[gameKeeper.activePlayer.onDeck.length-1].playOnDeck();
	
				}
	
			})
	
			//functionality and appearance of Pass button
			buttonPass.classList.add("button2");
			buttonPass.addEventListener("click", function(){
	
				let container = document.getElementById(containerId);
				document.getElementById("GameAreaWrapper").removeChild(container);
	
			})
	
			//attaches buttons to dialogue window
			fairyContainer.appendChild(buttonPlay);
			fairyContainer.appendChild(buttonPass);

		//if no cards, no option to play
		} else if(gameKeeper.activePlayer.discard.length === 0) {

			gameKeeper.gameLog("No cards in Discard to return to Decktop");

		
		} else {  //error check

			console.log("fairy playOnDeck error");

		}
	
	}

}