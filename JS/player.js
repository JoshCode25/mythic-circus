import gameKeeper from './gameKeeper.js';
import WorkingGnome from './cards/workingGnome.js';
import DaringGnome from './cards/daringGnome.js';
import MischievousGnome from './cards/mischievousGnome.js';
import artist from './artist.js';
import utility from './utility.js';
import gameSetup from './gameSetup.js';

export default class Player { //onStart - creates class constructor for player objects with arrays for each area that can hold cards
	constructor(name) {
		this.name = name;
		this.deck = [];
		this.discard = [];
		this.hand = [];
		this.onDeck = [];
		this.laborArea = [];
		this.laborPoints = 0;
		this.performancePoints = 0;
		this.reputationPoints = 0;
		this.turns = 0;
		this.pendingAttacks = 0;
		this.pendingInjuries = 0;

		this.totalDrawFromDeck = 0;
		this.netDrawFromDeck = 0;
		this.totalDiscard = 0;
		this.totalLaborPoints = 0;
		this.totalPerfPoints = 0;
		this.totalPerformances = 0;
		this.totalAttacks = 0;
		this.totalInjuries = 0;
		this.totalInjured = 0;
	}

	//adds one of each Gnome object to gameKeeper Card list for previews
	addGnomesToCardList() {

		let cardList = gameSetup.cardList;
		let owner = "CardList";

		let listWorkingGnome = new WorkingGnome("WorkingGnome", "ListWorkingGnome", owner);
		let listDaringGnome = new DaringGnome("DaringGnome", "ListDaringGnome", owner);
		let listMischievousGnome = new MischievousGnome("MischievousGnome", "ListMischievousGnome", owner);

		//add gnomes to beginning of cardList
		cardList.unshift(listMischievousGnome);
		cardList.unshift(listDaringGnome);
		cardList.unshift(listWorkingGnome);
	}

	setNetDrawFromDeck() {

		this.netDrawFromDeck = this.totalDrawFromDeck - this.turns*5;
		
	}
	clearHandToDiscard() { //moves all cards from hand array to discard array

		if (this.hand.length > 0) { //checks if there are cards in hand array to move to discard array

			gameKeeper.gameLog(`Discards ${this.hand.length} cards at turn end`);
			this.hand.forEach(function(item) {artist.removeDisplay(item, "activePlayerHandWrapper")}); //removes <div> elements containing card images
			this.hand.forEach(element => this.discard.push(element)); //pushes elements of hand array to discard array
			this.hand.length = 0; //clears hand array by setting length to 0

			gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

		} else { //if there are no cards in hand array, lets console know

			console.log("clearHandToDiscard - No Laborers to discard");
			gameKeeper.gameLog("No Laborers to discard");

		}
	}

	clearLaborToDiscard() { //moves all cards from laborArea array to discard array

		if (this.laborArea.length > 0) { //checks if there are cards in laborArea array to move to discard array

			// console.log("Labor Area: " + this.laborArea.length);

			this.laborArea.forEach(function(item) {artist.removeDisplay(item, "activePlayerLaborWrapper")}); //removes <td> elements containing card images
			this.laborArea.forEach(element => this.discard.push(element)); //pushes elements of laborArea array to discard array
			this.laborArea.length = 0; //clears laborArea array by setting length to 0

			gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

		} else { //if there are no cards in laborArea array, lets console know

			console.log("clearLaborToDiscard - No Laborers to discard");
			gameKeeper.gameLog("No Laborers to discard");

		}
	}

	clearOnDeckToDiscard() { //moves all cards from onDeck array to discard array

		if (this.onDeck.length > 0) { //checks if there are cards in onDeck array to move to discard array

			this.onDeck.forEach(function(item) {artist.removeDisplay(item, "activePlayerOnDeckWrapper")}); //removes <td> elements containing card images
			this.onDeck.forEach(function(element) {

				element.sentToDiscard(); //checks if element needs to be "reset" after leaving onDeck
				this.discard.push(element); //moves element to discard array

			}, this);
			this.onDeck.length = 0; //clears onDeck array by setting length to 0

			gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

		} else { //if there are no cards in onDeck array, lets console know

			console.log("clearOnDeckToDiscard - No On Deck Performers");
			gameKeeper.gameLog("No On Deck Performers");

		}
	}

	createStartingDeck() { //Creates and fills player.deck with 7 working, 2 daring, and 1 mischievous gnome

		//creates 7 Working Gnomes and puts them into player's Deck array
		for (let i = 0; i < 7; i++) { 

			let card = new WorkingGnome("WorkingGnome", `${this.name}WorkingGnome${i}`, this.name)
			this.deck.push(card);

		}

		//creates 2 Daring Gnomes and puts them into player's Deck array
		for (let i = 0; i < 2; i++) { 

			let card = new DaringGnome("DaringGnome", `${this.name}DaringGnome${i}`, this.name);
			this.deck.push(card);

		}

		//creates 1 Mischievous Gnome and puts it into player's Deck array
		for (let i = 0; i < 1; i++) { 

			let card = new MischievousGnome("MischievousGnome", `${this.name}MischievousGnome${i}`, this.name);
			this.deck.push(card);

		}

	}

	displayPlayerAttributes() { //displays lengths of player arrays for prototyping

		console.log(this.name);
		console.log("Hand: " + this.hand.length);
		gameKeeper.gameLog(`Hand: ${this.hand.length}`);
		console.log("Deck: " + this.deck.length);
		gameKeeper.gameLog(`Deck: ${this.deck.length}`);
		console.log("Discard: " + this.discard.length);
		gameKeeper.gameLog(`Discard: ${this.discard.length}`);
		console.log("Labor: " + this.laborArea.length);
		gameKeeper.gameLog(`Labor: ${this.laborArea.length}`);
		console.log("On Deck: " + this.onDeck.length);
		gameKeeper.gameLog(`On Deck: ${this.onDeck.length}`);
		// console.log(this.deck[0]);

	}

	displayOnDeck() { //displays contents of onDeck array to console

		console.log(this.onDeck);

	}

	displayLaborArea() { //displays contents of laborArea array to console

		console.log(this.laborArea);

	}

	drawFromDeck(drawNumber, idDiscard, idDeck) { //Moves cards from the end of the Deck array to the end of the Hand array "number" of times

		if(drawNumber === 1 && this.deck.length !== 0) {
			gameKeeper.gameLog("Draws 1 card");
		}

		for (let i = 0; i < drawNumber; i++) { //loops through function based on number of cards to draw

			let deck = this.deck;
			let hand = this.hand;
			let discard = this.discard;

			if(deck.length > 0){ //if cards are available in the deck

				//only render hand display if activePlayer draws
				if(this === gameKeeper.activePlayer){
					artist.renderMini(this.deck[this.deck.length - 1], "activePlayerHandWrapper");
				}

				let newCard = deck.pop();
				hand.push(newCard);

				//if deck id is given, display will be updated
				if(idDeck) {

					gameKeeper.updateDisplayCount(idDeck, this.deck.length);

				}

				this.totalDrawFromDeck++;

			} else if(deck.length == 0 && discard.length > 0){ //if discard is available to form a new deck

				this.moveDiscardToDeck(idDiscard, idDeck);
				this.shuffleDrawDeck();

				//only render hand display if activePlayer draws
				if(this === gameKeeper.activePlayer){
					artist.renderMini(this.deck[this.deck.length - 1], "activePlayerHandWrapper");
				}

				let newCard = deck.pop();
				hand.push(newCard);

				//if id's are given, the displays will be updates
				if(idDeck) {

					gameKeeper.updateDisplayCount(idDeck, this.deck.length);

				}
				if(idDiscard) {

					gameKeeper.updateDisplayCount(idDiscard, this.discard.length);

				}	

				this.totalDrawFromDeck++;

			} else if(deck.length == 0 && discard.length == 0){ //if no cards are available in deck or discard

				gameKeeper.gameLog("No cards to draw");
				break;

			} else { //catches unforseen error events

				console.log("drawFromDeck - Error" + i);
				gameKeeper.gameLog(`drawFromDeck - Error ${i}`);
				continue;

			}
		}
	}

	moveCard(fromIndex, fromArray, toArray, toIndex){

		let movingCard = fromArray.splice(fromIndex,1);
		if(typeof toIndex == 'undefined'){
			toIndex = toArray.length;
		}
		toArray.splice(toIndex,0,movingCard);

	}

	moveHandToDiscard(index) { //Moves the last card from Hand array to the end of Discard array

		if (this.hand.length > 0 && this.hand[index] !== undefined) { //checks if there are cards in Hand array to push to laborArea array

			artist.removeDisplay(this.hand[index], "activePlayerHandWrapper");
			this.hand[index].playDiscard();
			this.discard.push(this.hand[index]);
			this.hand.splice(index, 1);

			// this.updateHandCount(idHand);
			gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

			this.totalDiscard++;

			gameKeeper.deselect();

		} else {

			console.log("moveHandToDiscard - No cards in hand");
			gameKeeper.gameLog("No cards to discard");

		}
	}

	moveHandToLabor(index) { //moves a card from player's Hand array based on "index" to laborArea array

		if (this.hand.length > 0 && this.hand[index] !== undefined) { //checks if there are cards in Hand array to push to laborArea array

			artist.removeDisplay(this.hand[index], "activePlayerHandWrapper");
			artist.renderMini(this.hand[index], "activePlayerLaborWrapper");
			this.hand[index].playLabor();
			this.laborArea.push(this.hand[index]);
			this.hand.splice(index, 1);

			gameKeeper.gameLog(`${this.laborArea[this.laborArea.length-1].name} sent to Labor`);

			gameKeeper.deselect();

		} else {

			console.log("moveHandToLabor - No cards in hand");
			gameKeeper.gameLog("No cards to play");

		}
	}

	moveHandToOnDeck(index, idHand, idOnDeck) { //moves a card from a player's Hand array based on "index" to onDeck array

		if(this.hand.length > 0 && this.hand[index] !== undefined) { //checks if there are cards in Hand array to push to onDeck array

			artist.removeDisplay(this.hand[index], "activePlayerHandWrapper");
			artist.renderMini(this.hand[index], "activePlayerOnDeckWrapper");
			let card = this.hand[index];
			this.onDeck.push(this.hand[index]);
			this.hand.splice(index, 1);

			card.playOnDeck();

			gameKeeper.gameLog(`${this.onDeck[this.onDeck.length-1].name} sent On Deck`);

			gameKeeper.deselect();

		}else {

			gameKeeper.gameLog("No Cards in hand");

		}
	}

	moveOnDeckToDiscard(divId) { //moves card from onDeck array to discard array based on "index"

		if(this.onDeck.length > 0) { //checks if there are cards in the onDeck array

			let index = utility.getIndexByMarkValue(this.onDeck, divId); //returns -1 if tdId cannot be found in player's onDeck array

			if(divId === 0) {

				artist.removeDisplay(this.onDeck[0], "activePlayerOnDeckWrapper"); //remove td from DOM
				this.discard.push(this.onDeck[0]); //remove card from onDeck array
				this.onDeck.splice(0, 1);

				gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

			} else if(index !== -1) { //if tdId is found in player array, remove that card from array and td from DOM

				artist.removeDisplay(this.onDeck[index], "activePlayerOnDeckWrapper"); //remove td from DOM
				this.discard.push(this.onDeck[index]); //remove card from onDeck array
				this.onDeck.splice(index, 1);

				gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

				gameKeeper.gameLog(`On Deck: ${this.onDeck.length}`);
				gameKeeper.gameLog(`Discard: ${this.discard.length}`);

			} else {

				console.log("moveOnDeckToDiscard Error - Card not found");
				gameKeeper.gameLog("Card not found");

			}


		}else { //if onDeck array is empty, no cards are moved to discard array

			gameKeeper.gameLog("No Card to Move");
			
		}
	}

	moveDiscardToDeck(idDiscard, idDeck) { //return cards in discard pile to draw deck

		//pushes last card of Discard array into Deck array. Loops through based on Discard array length
		for (let i = this.discard.length; i > 0; i--) {

			this.deck.push(this.discard.pop());

		}
		
		if(idDeck) {

			gameKeeper.updateDisplayCount(idDeck, this.deck.length);

		}
		if(idDiscard) {

			gameKeeper.updateDisplayCount(idDiscard, this.discard.length);

		}	
	}

	// returns card of discard array to top of deck array based on index
	returnDiscardToDeck(index, idDiscard, idDeck) {

		this.deck.push(this.discard[index]);
		this.discard.splice(index, 1);

		gameKeeper.updateDisplayCount(idDeck, this.deck.length);
		gameKeeper.updateDisplayCount(idDiscard, this.discard.length);

	}

	//returns card of discard array to onDeck array based on index
	returnDiscardToOnDeck(index, idDiscard) {

		artist.renderMini(this.discard[index], "activePlayerOnDeckWrapper");
		this.onDeck.push(this.discard[index]);
		this.discard.splice(index, 1);

		gameKeeper.updateDisplayCount(idDiscard, this.discard.length);

	}

	//returns card of discard array to hand array based on index
	moveDiscardToHand(index, idDiscard) {

		artist.renderMini(this.discard[index], "activePlayerHandWrapper");
		this.hand.push(this.discard[index]);
		this.discard.splice(index, 1);

		gameKeeper.updateDisplayCount(idDiscard, this.discard.length);

	}

	//FIX - starting decks are randomized in the same order
	shuffleDrawDeck() { //randomizes cards in draw deck
		for(let num = 0; num < 500; num++){

			for (let i = this.deck.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * i);
				const temp = this.deck[i];
				this.deck[i] = this.deck[j];
				this.deck[j] = temp;
			}
		}

	}

}