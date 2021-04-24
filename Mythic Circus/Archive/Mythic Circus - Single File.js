//@ts-check

class Card { //parent class to pass information to all other cards if needed
	constructor(name,mark) {
		this.name = name;
		this.mark = mark;
	}
	playLabor() {

	}
	playOnDeck() {

	}
	playDiscard() {
		gameKeeper.gameLog(`Discarded ${this.name}`);
	}
	injure(){

	}
	sendDiscard(){

	}
	perform(){
		
	}
}

class WorkingGnome extends Card{ //onStart - sets up Working Gnome card coding class. Each player will have 7 cards created with this class
	constructor(name, mark) {
		super(name, mark);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = "-";
		this.enablePerf = false;
		this.cost = 0;
		this.ability = "Simply a Working Gnome";
		this.image = "images/Working Gnome.png";
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

}

class DaringGnome extends Card{ //onStart - sets up Daring Gnome card coding class. Each player will have 2 cards created with this class
	constructor(name, mark) {
		super(name, mark);
		this.labor = "-";
		this.enableLabor = false;
		this.perf = 1;
		this.enablePerf = true;
		this.cost = 0;
		this.ability = "He's a little off his rocker";
		this.image = "images/Daring Gnome.png";
	}

	playOnDeck() {
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
	}

	getInjured(){ //thought note, will need to be adjusted
		gameKeeper.activePlayer.moveOnDeckToDiscard(this.mark);
	}
}

class MischievousGnome extends Card { //onStart - sets up Mischievous Gnome card coding class. Each player will have 1 card created with this class
	constructor(name, mark) {
		super(name, mark);
		this.labor = "-";
		this.enableLabor = false;
		this.perf = 1;
		this.enablePerf = true;
		this.cost = 0;
		this.ability = "Attack (1)";
		this.image = "images/Mischievous Gnome.png";
	}

	playOnDeck() {
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog(`${this.name} attacks (1)`);
	}

}

class Goblin extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 1;
		this.enablePerf = true;
		this.cost = 2;
		this.ability = "Perf: may Discard (1), then Draw (1)";
		this.image = "images/Goblin.png";
	}
	playLabor(){
		gameKeeper.activePlayer.laborPoints +=this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

	playOnDeck(){
		//adds Perf value and updates display
		gameKeeper.activePlayer.performancePoints += this.perf;
		gameKeeper.updateDisplayCount("activePlayerPerfCount", `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`);

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
				let cardIndex = getIndexByMarkValue(gameKeeper.activePlayer.hand, cardId);
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

				let cardIndex = getIndexByMarkValue(gameKeeper.activePlayer.hand, goblinSelected.mark);
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

class Golem extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = 2;
		this.enableLabor = true;
		this.perf = "-";
		this.enablePerf = false;
		this.cost = 3;
		this.ability = "Draw (1)";
		this.image = "images/Golem.png";
	}

	playLabor(){
		gameKeeper.activePlayer.laborPoints +=this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
		setTimeout(function() {gameKeeper.activePlayer.drawFromDeck(1,'activePlayerDiscardCount', 'activePlayerDeckCount')}, 250);
	}
}

class Werewolf extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 2;
		this.enablePerf = true;
		this.cost = 3;
		this.ability = "Perf: Attack (1)";
		this.image = "images/Werewolf.png";
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog("Attack (1)");
	}
}

class Mermaid extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = "-";
		this.enableLabor = false;
		this.perf = 3;
		this.enablePerf = true;
		this.cost = 3;
		this.ability = "Perf: You may place a card from your discard on top of your deck";
		this.image = "images/Mermaid.png";
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog("Return (1) from Discard to Deck top");
	}
}

class Faun extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 0;
		this.enablePerf = true;
		this.cost = 3;
		this.ability = "Gains +1 Perf for each other active Performer";
		this.image = "images/Faun.png";
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

	playOnDeck(){

		this.perf = gameKeeper.activePlayer.onDeck.length; //playOnDeck() is called before card is added to onDeck array, so use length not length-1
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById(this.mark).querySelector(".miniDisplayPerf").textContent = this.perf.toString();
		gameKeeper.activePlayer.onDeckFaun = true;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog("Discard (1), then Draw (1)");
	}

	perform(){
		
	}
}

class Minotaur extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = 2;
		this.enableLabor = true;
		this.perf = 1;
		this.enablePerf = true;
		this.cost = 4;
		this.ability = "Resilient: requires 2 injuries to be discarded";
		this.image = "images/Minotaur.png";
		this.injured = false;
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog("Resilient");
	}
	injure(){
		
	}
}

class Fairy extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = "-";
		this.enableLabor = false;
		this.perf = 2;
		this.enablePerf = true;
		this.cost = 4;
		this.ability = "Perf: You may play a card from your discard On Stage with a hire cost less than 4";
		this.image = "images/Fairy.png";
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog("Play 1 from discard with hire cost less than 4");
	}
}

class Phoenix extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 4;
		this.enablePerf = true;
		this.cost = 5;
		this.ability = "At the start of your turn, you may discard a card to return Phoenix from your discard to your hand";
		this.image = "images/Phoenix.png";
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog("Discard (1) to return to hand from discard");
	}

	perform(){
		
	}
}

class Sphinx extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 3;
		this.enablePerf = true;
		this.cost = 5;
		this.ability = "Perf: you may Draw (2) then discard (2)";
		this.image = "images/Sphinx.png";
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog("Draw (2) then Discard (2)");
	}
}

class Unicorn extends Card {
	constructor(name, mark) {
		super(name, mark);
		this.labor = 1;
		this.enableLabor = true;
		this.perf = 6;
		this.enablePerf = true;
		this.cost = 6;
		this.ability = "Perf: choose another player to discard all active Unicorns";
		this.image = "images/Unicorn.png";
	}

	playLabor() {
		gameKeeper.activePlayer.laborPoints += this.labor;
		document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
	}

	playOnDeck(){
		gameKeeper.activePlayer.performancePoints += this.perf;
		document.getElementById("activePlayerPerfCount").textContent = `Perf: ${gameKeeper.activePlayer.performancePoints.toString()}`;
		gameKeeper.gameLog("Remove other active Unicorns");
	}
}

class player { //onStart - creates class constructor for player objects with arrays for each area that can hold cards
	constructor(name) {
		this.name = name;
		this.deck = [];
		this.discard = [];
		this.hand = [];
		this.onDeck = [];
		this.laborArea = [];
		this.laborPoints = 10;
		this.performancePoints = 0;
		this.reputationPoints = 0;
		this.turns = 0;
		this.injuries = 0;
	}

	activateInjure(cssDescription) { //adds event listeners to elements with given desciption to enable injury onclick

		console.log("activeInjure Start");

		let onDeckDisplay = document.querySelectorAll(cssDescription);

		onDeckDisplay.forEach(function (el) { //adds injure class and "click" event listener to elements with 
			el.classList.add("activeOnDeckInjure");
			console.log(el.id);
			el.onclick = function () { gameKeeper.activePlayer.moveOnDeckToDiscard(el.id) };
			//nest moveOnDeckToDiscard in anonymous function because parameters are required
		});

		console.log(onDeckDisplay);

	}

	clearHandToDiscard() { //moves all cards from hand array to discard array

		if (this.hand.length > 0) { //checks if there are cards in hand array to move to discard array

			gameKeeper.gameLog(`Discards ${this.hand.length} cards at turn end`);
			this.hand.forEach(function(item) {artist.removeDisplay(item, "activePlayerHandWrapper")}); //removes <div> elements containing card images
			this.hand.forEach(element => this.discard.push(element)); //pushes elements of hand array to discard array
			this.hand.length = 0; //clears hand array by setting length to 0

			gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

			console.log("Hand Length: " + this.laborArea.length);
			console.log("Discard Length: " + this.discard.length);

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

			console.log("Labor Area Length: " + this.laborArea.length);
			console.log("Discard Length: " + this.discard.length);

		} else { //if there are no cards in laborArea array, lets console know

			console.log("clearLaborToDiscard - No Laborers to discard");
			gameKeeper.gameLog("No Laborers to discard");

		}
	}

	clearOnDeckToDiscard() { //moves all cards from onDeck array to discard array

		if (this.onDeck.length > 0) { //checks if there are cards in onDeck array to move to discard array

			console.log("On Deck Length: " + this.onDeck.length);

			this.onDeck.forEach(function(item) {artist.removeDisplay(item, "activePlayerOnDeckWrapper")}); //removes <td> elements containing card images
			this.onDeck.forEach(element => this.discard.push(element)); //pushes elements of onDeck array to discard array
			this.onDeck.length = 0; //clears onDeck array by setting length to 0

			gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);


			console.log("Labor Area Length: " + this.onDeck.length);
			console.log("Discard Length: " + this.discard.length);

		} else { //if there are no cards in onDeck array, lets console know

			console.log("clearOnDeckToDiscard - No On Deck Performers");
			gameKeeper.gameLog("No On Deck Performers");

		}
	}

	createStartingDeck() { //Creates and fills player.deck with 7 working, 2 daring, and 1 mischievous gnome

		for (let i = 0; i < 7; i++) { //creates 7 Working Gnomes and puts them into player's Deck array

			let card = new WorkingGnome("WorkingGnome", `${this.name}WorkingGnome${i}`)
			this.deck.push(card);

		}

		for (let i = 0; i < 2; i++) { //creates 2 Daring Gnomes and puts them into player's Deck array

			let card = new DaringGnome("DaringGnome", `${this.name}DaringGnome${i}`)
			this.deck.push(card);

		}

		for (let i = 0; i < 1; i++) { //creates 1 Mischievous Gnome and puts it into player's Deck array

			let card = new MischievousGnome("MischievousGnome", `${this.name}MischievousGnome${i}`)
			this.deck.push(card);

		}
		console.log(this.deck);
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

				artist.renderMini(this.deck[this.deck.length - 1], "activePlayerHandWrapper");
				let newCard = deck.pop();
				hand.push(newCard);

				gameKeeper.updateDisplayCount(idDeck, this.deck.length);

			} else if(deck.length == 0 && discard.length > 0){ //if discard is available to form a new deck

				this.moveDiscardToDeck(idDiscard, idDeck);
				this.shuffleDrawDeck();

				artist.renderMini(this.deck[this.deck.length - 1], "activePlayerHandWrapper");
				let newCard = deck.pop();
				hand.push(newCard);

				gameKeeper.updateDisplayCount(idDeck, this.deck.length);
				gameKeeper.updateDisplayCount(idDiscard, this.discard.length);

			} else if(deck.length == 0 && discard.length == 0){ //if no cards are available in deck or discard

				console.log("drawFromDeck - no cards to draw");
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

			console.log("Hand: " + this.hand.length);
			console.log("Discard: " + this.discard.length);

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

			console.log("Hand: " + this.hand.length);
			console.log("Labor Area: " + this.laborArea.length);
			gameKeeper.gameLog(`${this.laborArea[this.laborArea.length-1].name} sent to Labor`);

			gameKeeper.deselect();

		} else {

			console.log("moveHandToLabor - No cards in hand");
			gameKeeper.gameLog("No cards to play");

		}
	}

	moveHandToOnDeck(index, idHand, idOnDeck) { //moves a card from a player's Hand array based on "index" to onDeck array

		// let onDeckTable = document.getElementById("activePlayerOnDeckTable");
		// console.log("On Deck Table:");
		// console.log(onDeckTable);

		if(this.hand.length > 0 && this.hand[index] !== undefined) { //checks if there are cards in Hand array to push to onDeck array

			artist.removeDisplay(this.hand[index], "activePlayerHandWrapper");
			artist.renderMini(this.hand[index], "activePlayerOnDeckWrapper");
			let card = this.hand[index];
			this.onDeck.push(this.hand[index]);
			this.hand.splice(index, 1);

			card.playOnDeck();

			console.log("Hand: " + this.hand.length);
			console.log("On Deck: " + this.onDeck.length);
			gameKeeper.gameLog(`${this.onDeck[this.onDeck.length-1].name} sent On Deck`);

			gameKeeper.deselect();

		}else {

			console.log("moveHandToOnDeck - No cards in hand");
			gameKeeper.gameLog("No Cards in hand");

		}
	}

	moveOnDeckToDiscard(tdId) { //moves card from onDeck array to discard array based on "index"

		if(this.onDeck.length > 0) { //checks if there are cards in the onDeck array

			console.log("tdId: " + tdId);
			console.log(this.onDeck);

			let index = getIndexByMarkValue(this.onDeck, tdId); //returns -1 if tdId cannot be found in player's onDeck array
			console.log("index: " + index);
			// let markTest = this.onDeck[index];
			// console.log("mark: " + markTest.mark);

			if(tdId === 0) {

				artist.removeDisplay(this.onDeck[0], "activePlayerOnDeckWrapper"); //remove td from DOM
				this.discard.push(this.onDeck[0]); //remove card from onDeck array
				this.onDeck.splice(0, 1);

				gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

			} else if(index !== -1) { //if tdId is found in player array, remove that card from array and td from DOM

				artist.removeDisplay(this.onDeck[index], "activePlayerOnDeckWrapper"); //remove td from DOM
				this.discard.push(this.onDeck[index]); //remove card from onDeck array
				this.onDeck.splice(index, 1);

				gameKeeper.updateDisplayCount('activePlayerDiscardCount', this.discard.length);

				console.log("On Deck: " + this.onDeck.length);
				gameKeeper.gameLog(`On Deck: ${this.onDeck.length}`);
				console.log("Discard: " + this.discard.length);
				gameKeeper.gameLog(`Discard: ${this.discard.length}`);

			} else {

				console.log("moveOnDeckToDiscard Error - Card not found");
				gameKeeper.gameLog("Card not found");

			}


		}else { //if onDeck array is empty, no cards are moved to discard array

			console.log("moveOnDeckToDiscard - No Card to Move");
			gameKeeper.gameLog("No Card to Move");
			
		}
	}

	moveDiscardToDeck(idDiscard, idDeck) { //return cards in discard pile to draw deck

		//pushes last card of Discard array into Deck array. Loops through based on Discard array length
		for (let i = this.discard.length; i > 0; i--) {

			this.deck.push(this.discard.pop());

			console.log("Deck: " + this.deck.length);
			console.log("Discard: " + this.discard.length);
		}
		
		gameKeeper.updateDisplayCount(idDeck, this.deck.length);
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
		console.log(this.deck); //displays deck after shuffling to check the order has been randomized

	}

}

//ON START:
const gKHandSelectListener = function() {
	gameKeeper.updateSelectedIndex(this.id);
}

const gameKeeper = {

	selectedIndex: -1,
	selectedCard: {},
	messageLog: [],

	numberOfPlayers: 0,
	activePlayer: {},
	activePlayerIndex: 0,
	players: [],

	hireSlots: [],
	turnPhase: 'Start',

	pointCap: 10,
	lastRound: false,

	mediocre: 6,
	mediocreReward: 1,
	memorable: 11,
	memorableReward: 2,
	stellar: 16,
	stellarReward: 3,
	instantClassic: 21,
	instantClassicReward: 4,

	beginPerformPhase() {

		gameKeeper.turnPhase = 'Perform';
		gameKeeper.gameLog(`Begin ${gameKeeper.turnPhase} Phase`);

		let perfRequestContainer = document.createElement("div");
		let perfRequestFragment = document.createDocumentFragment();
		let gameAreaWrapper = document.getElementById("GameAreaWrapper");

		perfRequestContainer.id = "perfRequestContainer";
		perfRequestContainer.classList.add("requestContainer");

		let perfButton = document.createElement("button");
		perfButton.type = "button";
		perfButton.classList.add("perfButton");
		perfButton.innerText = "Perform";
		perfButton.addEventListener("click", gameKeeper.perform);

		let passButton = document.createElement("button");
		passButton.type = "button";
		passButton.classList.add("passButton");
		passButton.innerText = "Pass";
		passButton.addEventListener("click", gameKeeper.endPerformPhase);

		perfRequestContainer.appendChild(perfButton);
		perfRequestContainer.appendChild(passButton);
		perfRequestFragment.appendChild(perfRequestContainer);
		gameAreaWrapper.appendChild(perfRequestFragment);

		let endPhaseClick = document.getElementById("activeTurnPhasePlay");
		endPhaseClick.addEventListener("click", gameKeeper.endPerformPhase);

	},

	endPerformPhase() {

		if(document.getElementById("perfRequestContainer")) {
			let perfRequestContainer = document.getElementById("perfRequestContainer");
			let gameAreaWrapper = document.getElementById("GameAreaWrapper");

			gameAreaWrapper.removeChild(perfRequestContainer);
		}

		let endPhaseClick = document.getElementById("activeTurnPhasePlay");
		endPhaseClick.removeEventListener("click", gameKeeper.endPerformPhase);


		gameKeeper.beginPlayPhase();


	},

	beginPlayPhase() {

		gameKeeper.turnPhase = 'Play';
		gameKeeper.gameLog(`Begin ${gameKeeper.turnPhase} Phase`);

		for(let i = 0; i < gameKeeper.activePlayer.hand.length; i++) {
			let cardMark = gameKeeper.activePlayer.hand[i].mark;
			let activeDiv = document.getElementById(cardMark);
			activeDiv.addEventListener("click", gKHandSelectListener);
		}

		let endPhaseClick = document.getElementById("activeTurnPhaseHire");
		endPhaseClick.addEventListener("click", gameKeeper.endPlayPhase);

	},

	endPlayPhase(){

		gameKeeper.turnPhase = 'End Play';

		for(let i = 0; i < gameKeeper.activePlayer.hand.length; i++) {
			let cardMark = gameKeeper.activePlayer.hand[i].mark;
			let activeDiv = document.getElementById(cardMark);
			activeDiv.removeEventListener("click", gKHandSelectListener);
		}

		let endPhaseClick = document.getElementById("activeTurnPhaseHire");
		endPhaseClick.removeEventListener("click", gameKeeper.endPlayPhase);

		gameKeeper.beginHirePhase();
		
	},

	beginHirePhase(){

		gameKeeper.turnPhase = 'Hire';
		gameKeeper.gameLog(`Begin ${gameKeeper.turnPhase} Phase`);

		let endPhaseClick = document.getElementById("activeTurnPhaseEnd");
		endPhaseClick.addEventListener("click", gameKeeper.endHirePhase);	

		let hireSlots = document.querySelectorAll(".hireSlotWrapper");

		hireSlots.forEach(function(el) {el.addEventListener("click", gameKeeper.hire);});

	},

	endHirePhase(){

		gameKeeper.turnPhase = 'End Hire';

		let endPhaseClick = document.getElementById("activeTurnPhaseEnd");
		endPhaseClick.removeEventListener("click", gameKeeper.endHirePhase);	
	
		gameKeeper.beginEndPhase();

	},

	beginEndPhase(){

		gameKeeper.turnPhase = 'End';

		gameKeeper.activePlayer.clearLaborToDiscard();
		gameKeeper.activePlayer.clearHandToDiscard();
		gameKeeper.activePlayer.laborPoints = 0;
		document.getElementById("activePlayerLaborCount").innerText = `Labor: ${gameKeeper.activePlayer.laborPoints}`; //updates laborPoints display to 0
		gameKeeper.activePlayer.drawFromDeck(5, "activePlayerDiscardCount", "activePlayerDeckCount");

		gameKeeper.endTurn();

	},

	endTurn(){

		//change activePlayer
		gameKeeper.beginPerformPhase();

	},

	gameLog(message) {

		let logWrapper = document.getElementById('gameLogWrapper');
		let newMessage = document.createElement('p');

		newMessage.textContent = `${gameKeeper.activePlayer.name} : ${message}`;
		newMessage.classList.add('logMessage');
		newMessage.id = `messageLog#${gameKeeper.messageLog.length}`;
		gameKeeper.messageLog.push(message);

		logWrapper.appendChild(newMessage);
		logWrapper.scrollTop = logWrapper.scrollHeight - logWrapper.clientHeight; //Scrolls to the bottom after adding a new element

	},
	
	updateSelectedIndex(targetId) {

		console.log(`targetId: ${targetId}`)

		let selectedDisplay = document.getElementById(targetId);

		gameKeeper.selectedIndex = getIndexByMarkValue(gameKeeper.activePlayer.hand, targetId);
		gameKeeper.selectedCard = gameKeeper.activePlayer.hand[gameKeeper.selectedIndex];

		selectedDisplay.classList.add("selected");

		if(!document.getElementById("gameAreaCoverGridBox")) {
			let gridCoverBox = document.createElement("div");
			gridCoverBox.id = "gameAreaCoverGridBox";
			gridCoverBox.addEventListener("click", gameKeeper.deselect);
			document.getElementById("GameAreaWrapper").appendChild(gridCoverBox);
		}

		if(gameKeeper.selectedCard.enableLabor) { //checks if selectedCard is allowed to labor and enables
			gameKeeper.enablePlayLabor();
		}
		if(gameKeeper.selectedCard.enablePerf) { //checks if selectedCard is allowed ondeck and enables
			gameKeeper.enablePlayOnDeck();
		}

		console.log("Test gameAreaCoverGridBox");
		console.log(!document.getElementById("gameAreaCoverGridBox"));

		gameKeeper.enableDiscard();

		console.log(`selected index: ${gameKeeper.selectedIndex}`);
		console.log(gameKeeper.selectedCard);

	},
	
	deselect(){

		let gridCoverBox = document.getElementById("gameAreaCoverGridBox");
		let gameAreaWrapper = document.getElementById("GameAreaWrapper");

		if(document.querySelector(".selected")) { //checks for and removes .selected class from previously selected element

			document.querySelector(".selected").classList.remove("selected");

		}

		if(gameAreaWrapper.contains(gridCoverBox)) { //checks for and removes cover box

			gameAreaWrapper.removeChild(gridCoverBox);
			
		}

		if(document.getElementById("laborPlayBox")) { //checks for and removes Labor click to play box
			let laborGridBox = document.getElementById("activePlayerLaborGridBox");
			let laborPlayBox = document.getElementById("laborPlayBox");

			laborGridBox.removeChild(laborPlayBox);
		}

		if(document.getElementById("onDeckPlayBox")) { //checks for and removes On Deck click to play box
			let onDeckGridBox = document.getElementById("activePlayerOnDeckGridBox");
			let onDeckPlayBox = document.getElementById("onDeckPlayBox");

			onDeckGridBox.removeChild(onDeckPlayBox);
		}

		if(document.getElementById("discardPlayBox")) { //checks for and removes discard click to play box
			let discardGridBox = document.getElementById("activePlayerDiscardGridBox");
			let discardPlayBox = document.getElementById("discardPlayBox");

			discardGridBox.removeChild(discardPlayBox);
		}

		gameKeeper.selectedCard = {}; //resets selectedCard to an empty object
		gameKeeper.selectedIndex = -1; //resets selectedIndex to -1

		console.log("deselect end");

	},

	enablePlayLabor(){

		if(!document.getElementById("laborPlayBox")){
			let laborGridBox = document.getElementById("activePlayerLaborGridBox");
			let laborPlayBox = document.createElement("div");

			laborPlayBox.id = "laborPlayBox";
			laborPlayBox.classList.add("gridBox", "activePlayClick");
			laborPlayBox.addEventListener("click", function(){gameKeeper.activePlayer.moveHandToLabor(gameKeeper.selectedIndex)});

			laborGridBox.appendChild(laborPlayBox);
		}

	},

	enablePlayOnDeck(){

		if(!document.getElementById("onDeckPlayBox")){
			let onDeckGridBox = document.getElementById("activePlayerOnDeckGridBox");
			let onDeckPlayBox = document.createElement("div");

			onDeckPlayBox.id = "onDeckPlayBox";
			onDeckPlayBox.classList.add("gridBox", "activePlayClick");
			onDeckPlayBox.addEventListener("click", function(){gameKeeper.activePlayer.moveHandToOnDeck(gameKeeper.selectedIndex)});

			onDeckGridBox.appendChild(onDeckPlayBox);
		}

	},

	enableDiscard(){

		if(!document.getElementById("discardPlayBox")){
			let discardGridBox = document.getElementById("activePlayerDiscardGridBox");
			let discardPlayBox = document.createElement("div");

			discardPlayBox.id = "discardPlayBox";
			discardPlayBox.classList.add("gridBox", "activePlayClick");
			discardPlayBox.addEventListener("click", function(){gameKeeper.activePlayer.moveHandToDiscard(gameKeeper.selectedIndex)});

			discardGridBox.appendChild(discardPlayBox);
		}

	},

	displayAttributes(){

		console.log(gameKeeper);

	},

	changeActivePlayer(index){

		if(index) { //if an index is given for a specific player, show that player

			gameKeeper.activePlayerIndex = index;
			gameKeeper.activePlayer = gameKeeper.players[index];

		} else { //otherwise advance to the next player's turn

			if(gameKeeper.activePlayerIndex < gameKeeper.players.length - 1) {

				gameKeeper.activePlayerIndex++;
				gameKeeper.activePlayer = gameKeeper.players[gameKeeper.activePlayerIndex];

			}else if(gameKeeper.activePlayerIndex === gameKeeper.players.length -1) {

				gameKeeper.activePlayerIndex = 0;
				gameKeeper.activePlayer = gameKeeper.players[0];

			}else {

				console.log("changeActivePlayer - Error");

			}
		}

	},

	perform() {

		let performingPlayer = gameKeeper.activePlayer;
		let ondeck = performingPlayer.onDeck;

		ondeck.forEach(element => {
			element.perform();
		});

		if(performingPlayer.performancePoints < gameKeeper.mediocre) {

			gameKeeper.gameLog(`${performingPlayer.performancePoints} is unacceptable: 0 VP`);

		} else if(performingPlayer.performancePoints < gameKeeper.memorable) {

			performingPlayer.reputationPoints += gameKeeper.mediocreReward;

			gameKeeper.gameLog(`${performingPlayer.performancePoints} is mediocre: ${gameKeeper.mediocreReward} VP`);

		} else if(performingPlayer.performancePoints < gameKeeper.stellar) {

			performingPlayer.reputationPoints += gameKeeper.memorableReward;

			gameKeeper.gameLog(`${performingPlayer.performancePoints} is memorable: ${gameKeeper.memorableReward} VP`);

		} else if(performingPlayer.performancePoints < gameKeeper.instantClassic) {

			performingPlayer.reputationPoints += gameKeeper.stellarReward;

			gameKeeper.gameLog(`${performingPlayer.performancePoints} is stellar: ${gameKeeper.stellarReward} VP`);

		} else if( performingPlayer.performancePoints >= gameKeeper.instantClassic) {

			performingPlayer.reputationPoints += gameKeeper.instantClassicReward;

			gameKeeper.gameLog(`${performingPlayer.performancePoints} is an Instant Classic! ${gameKeeper.instantClassicReward} VP`);

		} else {

			console.log("gameKeeper.perform() - Error");
		}

		document.getElementById("activePlayerVPCount").innerText = `VP ${performingPlayer.reputationPoints}`;
		performingPlayer.clearOnDeckToDiscard();
		performingPlayer.performancePoints = 0;
		document.getElementById("activePlayerPerfCount").innerText = `Perf: ${performingPlayer.performancePoints}`;

		if(gameKeeper.lastRound === false) {

			if(performingPlayer.reputationPoints === gameKeeper.pointCap) {

				gameKeeper.lastRoud = true;

				gameKeeper.gameLog(`${performingPlayer.name} has reached the point cap. This will be the last round`);

			} else if(performingPlayer.reputationPoints > gameKeeper.pointCap) {

				gameKeeper.lastRound = true;

				gameKeeper.gameLog(`${performingPlayer.name} has exceeded the point cap! This will be the last round`);
			}
		}

		gameKeeper.endPerformPhase();

	},

	hire() {

		if(gameKeeper.turnPhase === "Hire") {

			let slotId = this.id;
			let index = slotId.slice(-1);
			let hireSlot = gameKeeper.hireSlots[index];
			let hireCost = hireSlot[0].cost;

			if(gameKeeper.activePlayer.laborPoints >= hireCost) {

				gameKeeper.activePlayer.laborPoints -= hireCost;
				document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
				let hireCard = hireSlot.pop();
				gameKeeper.activePlayer.discard.push(hireCard);
				document.getElementById(`hireSlot${index}Amount`).textContent = hireSlot.length;
				gameKeeper.updateDisplayCount("activePlayerDiscardCount", gameKeeper.activePlayer.discard.length);

				gameKeeper.gameLog(`Hired ${hireCard.name}`);

			} else if(gameKeeper.activePlayer.laborPoints < hireCost) {

				let hireName = hireSlot[0].name;
				gameKeeper.gameLog(`You need ${hireCost} Labor to hire ${hireName}`);

			} else {
				console.log("gameKeeper.hire() - error");
			}
		} else {

		}

	},

	createHireSlots() { //will need to populate gameKeeper.hireSlots with arrays of objects

		gameKeeper.populateHireSlots();
		let hireContainer = document.getElementById("hireContainer");
		hireContainer.textContent = ""; //clears sample text before card slots are made
		let hireFragment = document.createDocumentFragment();
		let slotLength = gameKeeper.hireSlots.length;
		let amount = gameKeeper.hireSlots[0].length;

		for (let i = slotLength-1; i > -1; i--) { //loops through gameKeeper.hireSlots to create hire slots

			let card = gameKeeper.hireSlots[i][0];

			let hireImg = document.createElement("img");
			hireImg.classList.add("miniDisplayImg");
			hireImg.id = card.name;
			hireImg.src = card.image;
			hireImg.alt = card.name;
			// hireImg.addEventListener("mouseover", displayCard);
	
			let divHire = document.createElement("div");
			divHire.id = `hireSlot${i}`;
			divHire.classList.add("hireSlotWrapper");
	
			let miniName = document.createElement("p"); //creates <p> element to house name from card
			miniName.classList.add("miniDisplayName");
			miniName.innerText = card.name;
	
			let miniCost = document.createElement("p"); //creates <p> element to house cost value from card
			miniCost.classList.add("miniDisplayCost");
			miniCost.textContent = card.cost.toString();
	
			let miniPerf = document.createElement("p"); //creates <p> element to house perf value from card
			miniPerf.classList.add("miniDisplayPerf");
			miniPerf.innerText = card.perf.toString();
	
			let miniLabor = document.createElement("p"); //creates <p> element to house labor value from card
			miniLabor.classList.add("miniDisplayLabor");
			miniLabor.innerText = card.labor.toString();

			let hireAmount = document.createElement("p");
			hireAmount.id = `hireSlot${i}Amount`;
			hireAmount.classList.add("hireAmount");
			hireAmount.innerText = amount.toString();
	
			divHire.appendChild(hireImg);
			divHire.appendChild(miniName);
			divHire.appendChild(miniCost);
			divHire.appendChild(miniLabor);
			divHire.appendChild(miniPerf);
			divHire.appendChild(hireAmount);
			hireFragment.appendChild(divHire);

		}

		hireContainer.appendChild(hireFragment);

	},

	populateHireSlots() {

		let playerNumber = gameKeeper.numberOfPlayers;
		let hireSlots = gameKeeper.hireSlots;
		let cardCount = playerNumber*3-1;

		let hireSlot0 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Goblin("Goblin", `goblin${i}`);
			hireSlot0.push(card);
		}
		hireSlots.push(hireSlot0);

		let hireSlot1 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Golem("Golem", `golem${i}`);
			hireSlot1.push(card);
		}
		hireSlots.push(hireSlot1);

		let hireSlot2 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Werewolf("Werewolf", `werewolf${i}`);
			hireSlot2.push(card);
		}
		hireSlots.push(hireSlot2);

		let hireSlot3 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Faun("Faun", `faun${i}`);
			hireSlot3.push(card);
		}
		hireSlots.push(hireSlot3);

		let hireSlot4 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Mermaid("Mermaid", `mermaid${i}`);
			hireSlot4.push(card);
		}
		hireSlots.push(hireSlot4);

		let hireSlot5 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Fairy("Fairy", `fairy${i}`);
			hireSlot5.push(card);
		}
		hireSlots.push(hireSlot5);

		let hireSlot6 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Minotaur("Minotaur", `minotaur${i}`);
			hireSlot6.push(card);
		}
		hireSlots.push(hireSlot6);

		let hireSlot7 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Phoenix("Phoenix", `phoenix${i}`);
			hireSlot7.push(card);
		}
		hireSlots.push(hireSlot7);

		let hireSlot8 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Sphinx("Sphinx", `sphinx${i}`);
			hireSlot8.push(card);
		}
		hireSlots.push(hireSlot8);

		let hireSlot9 = [];
		for(let i = 0; i < cardCount; i++) {

			let card = new Unicorn("Unicorn", `unicorn${i}`);
			hireSlot9.push(card);
		}
		hireSlots.push(hireSlot9);

	},

	updateDisplayCount(id, value){ //updates given element's value to that given

		if(isNaN(value)) {

		let displayCount = value.toString();
		document.getElementById(id).innerText = displayCount;

		} else if(!isNaN(value)) {

			document.getElementById(id).innerText = value;

		} else {

			console.log("updateDisplayCount - Error");
		
		}

		if(id === "activePlayerDiscardCount") { //if the discard count is updated, it updates the picture to what was just discarded

			if(gameKeeper.activePlayer.discard.length > 0){

				let discardImg = document.getElementById("activePlayerDiscardImg");
				let topCard = gameKeeper.activePlayer.discard[gameKeeper.activePlayer.discard.length-1];

				discardImg.setAttribute("src", topCard.image);

			} else {
				document.getElementById("activePlayerDiscardImg").setAttribute("src", "");
			}

		}

	}

}

var player1 = new player("player1");
player1.createStartingDeck();
player1.shuffleDrawDeck();
console.log(player1.name);

var player2 = new player("player2");
player2.createStartingDeck();
player2.shuffleDrawDeck();
console.log(player2.name);

gameKeeper.numberOfPlayers = 2; //Defines how many players are playing the game
gameKeeper.activePlayerIndex = 0;
gameKeeper.activePlayer = player1;
gameKeeper.createHireSlots();

gameKeeper.gameLog('Welcome to Mythic Circus!');

const goblin = new Goblin("Goblin", "SampleGoblin1");
gameKeeper.activePlayer.deck.push(goblin);
const golem = new Golem("Golem", "SampleGolem1");
gameKeeper.activePlayer.deck.push(golem);
// const faun = new Faun("Faun", "SampleFaun1");
// gameKeeper.activePlayer.deck.push(faun);
// const sphinx = new Sphinx("Sphinx", "SampleSphinx1");
// gameKeeper.activePlayer.deck.push(sphinx);

// function changeActivePlayer() {

// 	if (activePlayer === player1) {

// 		activePlayer = player2;

// 	} else if (activePlayer === player2) {

// 		activePlayer = player1;

// 	} else {

// 		console.log("Edge case, check changeActivePlayer function");

// 	}

// 	console.log("Active Player: " + activePlayer.name);
// 	activePlayer.updateDiscardCount("activePlayerDiscard");
// 	activePlayer.updateDeckCount("activePlayerDeck");
// 	document.getElementById("activePlayerHeader").textContent = activePlayer.name;

// }


const artist = {

	renderMini(card, parentId, divClass) {

		let miniParent = document.getElementById(parentId);
		let miniFragment = document.createDocumentFragment();

		let miniDiv = document.createElement("div");
		miniDiv.classList.add("activeMiniWrapper");
		if(divClass) { //gives option to add unique class to rendered cards to later selection
			miniDiv.classList.add(divClass);
		}
		miniDiv.id = card.mark;

		let miniImg = document.createElement("img");
		miniImg.classList.add("miniDisplayImg");
		miniImg.src = card.image;
		miniImg.alt = card.name;

		let miniPerf = document.createElement("p");
		miniPerf.classList.add("miniDisplayPerf");
		miniPerf.innerText = card.perf;

		let miniLabor = document.createElement("p");
		miniLabor.classList.add("miniDisplayLabor");
		miniLabor.innerText = card.labor;

		//checks and adds cost icon if applicable
		if(card.cost !== 0) {

			let miniCost = document.createElement("p");
			miniCost.classList.add("miniDisplayCost");
			miniCost.innerText = card.cost;
			miniDiv.appendChild(miniCost);

		}

		//checks and adds click select listener if going to hand during play phase
		if(gameKeeper.turnPhase === "Play" && parentId === "activePlayerHandWrapper") {
			miniDiv.addEventListener("click", gKHandSelectListener);
		}

		miniFragment.appendChild(miniDiv);
		miniDiv.appendChild(miniImg);
		miniDiv.appendChild(miniLabor);
		miniDiv.appendChild(miniPerf);
		miniParent.appendChild(miniDiv);

	},

	removeDisplay(card, containerId) {

		let displayContainer = document.getElementById(containerId);
		let cardMark = String(card.mark);
		let displayDiv = document.getElementById(cardMark);

		console.log("card.mark: " + card.mark);
		console.log(displayDiv);

		displayContainer.removeChild(displayDiv);

	},

	renderFull(card, parentId) {

		let fullParent = document.getElementById(parentId);
		let fullFragment = document.createDocumentFragment();

		let fullDiv = document.createElement("div");
		fullDiv.classList.add("fullWrapper");
		fullDiv.id = card.mark;

		let fullImg = document.createElement("img");
		fullImg.classList.add("fullDisplayImg");
		fullImg.src = card.image;
		fullImg.alt = card.name;

		let fullName = document.createElement("p");
		fullName.classList.add("fullDisplayName");
		fullName.innerText = card.name;

		let fullPerf = document.createElement("p");
		fullPerf.classList.add("fullDisplayPerf");
		fullPerf.innerText = card.perf;

		let fullLabor = document.createElement("p");
		fullLabor.classList.add("fullDisplayLabor");
		fullLabor.innerText = card.labor;

		let fullAbility = document.createElement("p");
		fullAbility.classList.add("fullDisplayAbility");
		fullAbility.innerText = card.ability;

		//checks and adds cost icon if applicable
		if(card.cost !== 0) {

			let fullCost = document.createElement("p");
			fullCost.classList.add("fullDisplayCost");
			fullCost.innerText = card.cost;
			fullDiv.appendChild(fullCost);
		
		}

		fullFragment.appendChild(fullDiv);
		fullDiv.appendChild(fullName);
		fullDiv.appendChild(fullImg);
		fullDiv.appendChild(fullLabor);
		fullDiv.appendChild(fullPerf);
		fullDiv.appendChild(fullAbility);
		fullParent.appendChild(fullDiv);

	},

	renderFullPreview(card) {

		if(!document.getElementById("fullPreviewContainer")){

			let fullPreview = document.createElement("div");
			let fullPreviewContainer = document.getElementById("GameAreaWrapper");

			fullPreview.id = "fullPreviewContainer";

			fullPreviewContainer.appendChild(fullPreview);
			artist.renderFull(card, "fullPreviewContainer");

		} else if(document.getElementById("fullPreviewContainer")) {

			artist.removeDisplay(card, "GameAreaWrapper");

		} else {
			console.log("artist.renderFullPreview - Error");
		}

	},

	renderArrayMini(array, containerId, title, divClass) {

		if(!document.getElementById(containerId)) {

			let renderedArray = array;
			let renderContainer = document.createElement("div");
			let renderFlex = document.createElement("div");
			let renderParent = document.getElementById("GameAreaWrapper");
			let renderClose = document.createElement("div");
			let renderTitle = document.createElement("p");
			let renderArrayFrag = document.createDocumentFragment();

			renderTitle.textContent = title;
			renderTitle.classList.add("renderedHeader");

			renderContainer.id = containerId;
			renderFlex.id = "renderArrayFlexContainer";
			renderContainer.classList.add("renderArrayContainer")
			renderArrayFrag.appendChild(renderContainer);
			renderContainer.appendChild(renderTitle);
			renderContainer.appendChild(renderClose);
			renderContainer.appendChild(renderFlex);
			renderParent.appendChild(renderArrayFrag);

			if(divClass) { //checks if a unique class was given to add to rendered mini's

				renderedArray.forEach(function(el){artist.renderMini(el, "renderArrayFlexContainer", divClass)});

			} else {

				renderedArray.forEach(function(el){artist.renderMini(el, "renderArrayFlexContainer")});

			}

			renderClose.classList.add("renderClose");
			renderClose.textContent = "X";
			renderClose.addEventListener("click", function(){
				renderParent.removeChild(renderContainer);
			})

		}
	
	}
}

function defineCardImage(e) { //onStart - add "images/" before and ".png" after card names to define cardImages source paths
	let cardImagePath = "images/" + e + ".png";
	return cardImagePath;
}

function getIndexByMarkValue(arr, value) { //finds index of item in given array based on given Mark value

	console.log("start getIndexByMarkValue");

	for (let i = 0; i < arr.length; i++) { //loops through given array comparing mark values to given value

		if (arr[i].mark === value) return i;

	}

	console.log("getIndexByMarkValue - value not found");
	return -1; //if the value isn't found, returns -1

}

// function displayCard() { //changes values of displayed card when mouse hovers over small image
// 	let index = cardName.indexOf(this.alt); //'this' refers to object that triggers the event (target or currentTarget)
// 	document.getElementById("displayCardName").textContent = cardName[index];
// 	document.getElementById("displayCardCost").textContent = "Hire: " + cardCost[index];
// 	document.getElementById("displayCardImage").src = cardImage[index];
// 	document.getElementById("displayCardAbility").textContent = cardAbility[index];
// 	document.getElementById("displayCardLabor").textContent = "Labor: " + cardLabor[index];
// 	document.getElementById("displayCardPerf").textContent = "Performance: " + cardPerf[index];

// 	// console.log(e);
// 	// console.log(this.id);
// 	// console.log(index);
// }
