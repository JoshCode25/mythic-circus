import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';
import artist from '../artist.js';
import utility from '../utility.js';
import gameSetup from '../gameSetup.js';

export default class Mermaid extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = "-";
		this.enableLabor = false;
		this.perf = 3;
		this.enablePerf = true;
		this.cost = 3;
		this.ability = "Perf: You may place a card from your discard on top of your deck";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678132/Mythic%20Circus/Mermaid.png";

		this.totalInjured = 0;
		this.totalOnDeck = 0;
		this.totalPerfed = 0;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints}`;

		this.totalOnDeck++;
		
		if(gameKeeper.activePlayer.discard.length > 0) { //checks if there are cards in discard to choose

			//Discard (1) to Draw (1)
			let containerId = "mermaidPerfContainer";
			let divClass = "mermaidReturnSelect";
			let mermaidSelected = {}; //container for selected card
			let mermaidSelectedTest = false; //defaults to not have a card selected
	
			let buttonReturn = document.createElement("button");
			let buttonPass = document.createElement("button");
			buttonReturn.innerText = "Place on Decktop";
			buttonPass.innerText = "Pass";
			console.log(gameKeeper.activePlayer.discard);
			artist.renderArrayMini(gameKeeper.activePlayer.discard, containerId, "Return (1) to Decktop?", divClass) //renders selection dialogue
			let mermaidContainer = document.getElementById(containerId);
	
			let renderedHeaderEventListener = document.querySelector(".renderArrayContainer .renderedHeader"); //testing event listener
			renderedHeaderEventListener.addEventListener("click", function(){
	
				console.log(mermaidSelected);
				alert(mermaidSelected.name);
			
			});
	
			//adds listener to all rendered cards to be selected when clicked
			let renderedCards = document.querySelectorAll(`.${divClass}`);
			renderedCards.forEach(function(elem){
				elem.addEventListener("click", function(){
	
					let cardId = this.id;
					let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.discard, cardId);
					let cardSelected = gameKeeper.activePlayer.discard[cardIndex];
					mermaidSelected = cardSelected;
					mermaidSelectedTest = true;
	
					//if a card already has the discard border, remove it and add to clicked card
					if(mermaidContainer.querySelector(".greenDiscardBorder")) { 
	
						console.log("Discard border true");
						mermaidContainer.querySelector(".greenDiscardBorder").classList.remove("greenDiscardBorder");
						mermaidContainer.querySelector(`#${cardId}`).classList.add("greenDiscardBorder");
	
					} else { //add greenDiscardBorder to selected card
	
						console.log("Discard Border false");
						mermaidContainer.querySelector(`#${cardId}`).classList.add("greenDiscardBorder");
	
					}
				})
			})
	
			//functionality and appearance of Return button
			buttonReturn.classList.add("button1");
			buttonReturn.addEventListener("click", function(){
	
				 //checks if a card has been selected to return to decktop, if true, returns it
				if(mermaidSelectedTest) {
	
					let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.discard, mermaidSelected.mark);
					let returnCard = gameKeeper.activePlayer.discard[cardIndex];
					console.log (returnCard);
					gameKeeper.gameLog(`Return ${returnCard.name} to top of Deck`);
					gameKeeper.activePlayer.returnDiscardToDeck(cardIndex, 'activePlayerDiscardCount', 'activePlayerDeckCount');
	
					let container = document.getElementById(containerId);
					document.getElementById("GameAreaWrapper").removeChild(container);

					console.log(gameKeeper.activePlayer.deck[gameKeeper.activePlayer.deck.length-1]);
	
				}
	
			})
	
			//functionality and appearance of Pass button
			buttonPass.classList.add("button2");
			buttonPass.addEventListener("click", function(){
	
				let container = document.getElementById(containerId);
				document.getElementById("GameAreaWrapper").removeChild(container);
	
			})
	
			//attaches buttons to dialogue window
			mermaidContainer.appendChild(buttonReturn);
			mermaidContainer.appendChild(buttonPass);

		} else if(gameKeeper.activePlayer.discard.length === 0) { //if no cards, no option to draw

			gameKeeper.gameLog("No cards in Discard to return to Decktop");

		} else { //error check

			console.log("mermaid playOnDeck error");

		}
	
	}

	// perfCount() {

	// 	let ownerIndex = utility.getIndexByNameValue(gameSetup.players, this.owner);
	// 	let owner = gameSetup.players[ownerIndex];

	// 	if(gameKeeper.activePlayer == owner) {

	// 		gameKeeper.activePlayer.performancePoints += this.perf;

	// 	} else {

	// 		owner.performancePoints += this.perf;

	// 	}
	// }
}