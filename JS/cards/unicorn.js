import Card from './parentCard.js';
import gameKeeper from '../gameKeeper.js';
import artist from '../artist.js';
import gameSetup from '../gameSetup.js';
import utility from '../utility.js';

export default class Unicorn extends Card {
	constructor(name, mark, owner) {
		super(name, mark, owner);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 6;
		this.enablePerf = true;
		this.cost = 6;
		this.ability = "Perf: choose another player to discard all active Unicorns";
		this.image = "https://res.cloudinary.com/joshcode25/image/upload/v1622678131/Mythic%20Circus/Unicorn.png";
	}

	playOnDeck(){

		//add and update activePlayer's performancePoints
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints}`;
		this.totalOnDeck++;

		//select another player to discard all active Unicorns
		let containerId = "unicornChoiceContainer";
		let title = "Choose a Player to Discard All Active Unicorns";

		//create dialogue box
		artist.renderChoiceDialogue(containerId, title, "Accept");

		let unicornContainer = document.getElementById(containerId);
		let leftButton = unicornContainer.querySelector(".buttonLeft");
		let playerContainerFrag = document.createDocumentFragment();
		let players = gameSetup.players;
		let elemSummaryClass = "unicornPlayerOption"; //class given to rendered player summary div's for selection

		//cycles through each nonactive player to add to select dialogue
		players.forEach(function(elem) {

			if(elem.name !== gameKeeper.activePlayer.name) {

				let elemSummaryContainer = document.createElement("div");
				let elemSummaryId = `${elem.name}UnicornSummary`;
				elemSummaryContainer.id = elemSummaryId;
				elemSummaryContainer.classList.add(elemSummaryClass);

				console.log(elemSummaryContainer);

				artist.renderMiniPlayerSummary(elem, elemSummaryContainer);

				//if a player has a Unicorn on deck, highlights onDeck text as green
				if(elem.onDeck.some(elem => elem.name === "Unicorn")) {

					let onDeckText = elemSummaryContainer.querySelector(".summaryOnDeck");
					onDeckText.classList.add("greenFont");

				}

				//attaches nonactive players to fragment
				playerContainerFrag.appendChild(elemSummaryContainer);
			}
		})

		//create a flexbox element to house nonactive players for selection
		let unicornFlexContainer = document.createElement("div");
		unicornFlexContainer.classList.add("displayFlexColumn");
		unicornFlexContainer.appendChild(playerContainerFrag);
		unicornContainer.appendChild(unicornFlexContainer);

		//houses for unicorn selection
		let unicornSelected = {};
		let unicornSelectedTest = false;

		//adds listener to rendered players to be selected when clicked
		let renderedPlayers = document.querySelectorAll(`.${elemSummaryClass}`);
		renderedPlayers.forEach(function(elem){

			elem.addEventListener("click", function(){

				//slices player name from container div id
				let playerId = this.id.slice(0, 7);
				console.log(playerId);
				let playerIndex = utility.getIndexByNameValue(players, playerId);
				unicornSelected = players[playerIndex];
				unicornSelectedTest = true;

				console.log(unicornSelected);

				//if a card already has the discard border, remove it and add to clicked card
				if(unicornContainer.querySelector(".redDiscardBorder")) { 

					console.log("Discard border true");
					unicornContainer.querySelector(".redDiscardBorder").classList.remove("redDiscardBorder");
					unicornContainer.querySelector(`#${this.id}`).classList.add("redDiscardBorder");

				} else { //add redDiscardBorder to selected card

					console.log("Discard Border false");
					unicornContainer.querySelector(`#${this.id}`).classList.add("redDiscardBorder");

				}
			})
			
		}, this);

		//functionality to force selected player to discard all active Unicorns
		leftButton.addEventListener("click", function(){

			//if a player has been selected, move all their active Unicorns to discard
			if(unicornSelectedTest) {

				let selectedOnDeck = unicornSelected.onDeck;

				selectedOnDeck.forEach(function(elem, index) {

					if(elem.name === "Unicorn") {

						unicornSelected.moveCard(index, selectedOnDeck, unicornSelected.discard);

					}
				})

				//removes dialogue window and refreshes nonactivePlayer slots
				let gameArea = document.getElementById("GameAreaWrapper");
				gameArea.removeChild(unicornContainer);
				gameKeeper.createNonActivePlayerSlots();
			}
		})

	}
}
