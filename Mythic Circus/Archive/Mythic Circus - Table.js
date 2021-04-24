
//const cardProperties = ["Name", "Labor", "Perf", "Cost", "Ability"]; //Beginning of making program flexible by creating arrays based on 1 input array
const cardName = ["Working Gnome", "Daring Gnome", "Mischievous Gnome", 
				"Goblin", "Golem", "Werewolf", "Mermaid", "Faun", "Minotaur", "Fairy", "Phoenix", "Sphinx", "Unicorn"];
const cardLabor = [1, "-", "-", 1, 2, 0, "-", 1, 2, "-", 1, 1, 1];
const cardPerf = ["-",1,1,1,"-",2,3,0,1,2,4,3,6];
const cardCost = [0,0,0,2,3,3,3,3,4,4,5,5,6];
const cardAbility = ["Simply a Working Gnome","Simply a Daring Gnome","Attack (1)","Perf: Discard (1), then Draw (1)", "Draw (1)", "Attack (1)", "Perf: you may place 1 card from your Discard on top of your Deck", "Gains +1 Perf for each other Active Performer",
				"Resilient: it takes 2 injuries to cause Mintaur to be discarded", "Perf: you may play a card from your discard to On Deck with hire cost less than 4", 
				"Before performing, you may discard a card to return Phoenix from your discard to your hand", "Perf: You may Draw (2), then Discard (2)", 
				"Choose 1 player to discard all his/her active Unicorns"];
const cardImage = cardName.map(defineCardImage); //generates image path array from cardName array

var numberOfPlayers = 2; //Defines how many players are playing the game

class player{ //onStart - creates class constructor for player objects with arrays for each area that can hold cards
	constructor(name){
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
	}

	createStartingDeck(){ //FIX - May need to fix. Objects have same names
		
		for(let i = 0; i < 7; i++){ //creates 7 Working Gnomes and puts them into player's Deck array
			
			let index = 0;
			let workingName = this.name + "WorkingGnome" + i;
			// console.log(workingName);
//FIX - may need to fix. All working gnome objects have the same name "workingGnome"
			window[workingName] = new workingGnome(
									cardName[index], 
									cardLabor[index], 
									cardPerf[index], 
									cardCost[index], 
									cardAbility[index], 
									cardImage[index], 
									workingName);

			this.deck.push(window[workingName]);

		}

		for(let i = 0; i < 2; i++){ //creates 2 Daring Gnomes and puts them into player's Deck array

			let index = 1;
			let daringName = this.name + "DaringGnome" +i;
			// console.log(daringName);
			window[daringName] = new daringGnome(
									cardName[index], 
									cardLabor[index], 
									cardPerf[index], 
									cardCost[index], 
									cardAbility[index], 
									cardImage[index], 
									daringName);

			this.deck.push(window[daringName]);
		}

		for(let i = 0; i < 1; i++){ //creates 1 Mischievous Gnome and puts it into player's Deck array

			let index = 2;
			let mischievousName = this.name + "MischievousGnome" +i;
			// console.log(mischievousName);
			window[mischievousName] = new mischievousGnome(cardName[index], cardLabor[index], cardPerf[index], cardCost[index], cardAbility[index], cardImage[index], mischievousName);
			this.deck.push(window[mischievousName]);
		}
		console.log(this.deck);
	}

	//FIX - won't show all 10 cards in hand. Has the final card remain on the deck
	drawFromDeck(number, idDeck, idHand, idDiscard){ //Moves cards from the end of the Deck array to the end of the Hand array "number" of times
		
		for(let i=0;i<number; i++){ //loops through function based on number of cards to draw

			if(this.deck.length == 0 && this.discard.length !== 0){ //if deck runs out, checks to see if there's a discard to shuffle

				this.returnDiscardToDeck(idDiscard, idDeck);
				// console.log(this.deck);
				this.shuffleDrawDeck();
				console.log(this.deck);

				if(this.deck.length !== 0){

					addActiveDisplayHand(this.deck[this.deck.length-1]);
					this.hand.push(this.deck[this.deck.length-1]);
					this.deck.pop();

					this.updateDeckCount(idDeck);
					this.updateHandCount(idHand);
					// console.log(this.deck.length);
					console.log("Hand: " + this.hand.length);

				} else{
					console.log("Hand: " + this.deck.length);
					console.log("Hand: " + this.hand.length);

					continue;
				}

			} else if(this.deck.length !== 0){ //if cards in deck are available, draw a card

				addActiveDisplayHand(this.deck[this.deck.length-1]);
				this.hand.push(this.deck[this.deck.length-1]);
				this.deck.pop();

				this.updateDeckCount(idDeck);
				this.updateHandCount(idHand);
				// document.getElementById("activePlayerDeck").innerHTML = "Deck: " + this.deck.length;

				// console.log(this.deck.length);
				console.log("Hand: " + this.hand.length);
				
			} else{ //if deck and discard run out, no cards available

				console.log("Sorry no card for you");
				break;
	
			}
		}
	}

	moveHandToDiscard(index, idHand, idDiscard){ //Moves the last card from Hand array to the end of Discard array

		if(this.hand.length > 0 && this.hand[index] !== undefined){ //checks if there are cards in Hand array to push to laborArea array

			removeActiveDisplayHand(this.hand[index]);
			this.discard.push(this.hand[index]);
			this.hand.splice(index, 1);

			this.updateHandCount(idHand);
			this.updateDiscardCount(idDiscard);

			console.log("Hand: " + this.hand.length);
			console.log("Discard: " + this.discard.length);

		} else {
			
			console.log("moveHandToDiscard - No cards in hand");

		}
	}

	returnDiscardToDeck(idDiscard, idDeck){ //return cards in discard pile to draw deck

		//pushes last card of Discard array into Deck array. Loops through based on Discard array length
		for(let i = this.discard.length; i > 0; i--){ 

			this.deck.push(this.discard[this.discard.length-1]);
			this.discard.pop(); 

			this.updateDiscardCount(idDiscard);
			this.updateDeckCount(idDeck);

			// document.getElementById("activePlayerDeck").innerHTML = "Deck: " + this.deck.length;
			// document.getElementById("activePlayerDiscard").innerHTML = "Discard: " + this.discard.length;

			console.log("Deck: " + this.deck.length);
			console.log("Discard: " + this.discard.length);
		}

		//Attempt at forEach() simplification to return discard to draw deck
		//  this.discard.forEach(function(){
		// 	this.deck.push(this.discard[this.discard.length-1]);
		// 	this.discard.pop();

		// 	console.log("Deck: " + this.deck.length);
		// 	console.log("Discard: " + this.discard.length);
		// })

	}

	//FIX - starting decks are randomized in the same order
	shuffleDrawDeck(){ //randomizes cards in draw deck

		for(let i = this.deck.length -1; i > 0; i--){
			const j = Math.floor(Math.random() * i);
			const temp = this.deck[i];
			this.deck[i] = this.deck[j];
			this.deck[j] = temp;
		  }

		console.log(this.deck); //displays deck after shuffling to check the order has been randomized

	}

	displayPlayerAttributes(){ //displays lengths of player arrays for prototyping

		console.log(this.name);
		console.log("Hand: " + this.hand.length);
		console.log("Deck: " + this.deck.length);
		console.log("Discard: " + this.discard.length);
		console.log("Labor: " + this.laborArea.length);
		console.log("On Deck: " + this.onDeck.length);
		// console.log(this.deck[0]);

	}

	displayOnDeck(){ //displays contents of onDeck array to console
		
		console.log(this.onDeck);

	}

	displayLaborArea(){ //displays contents of laborArea array to console
	
		console.log(this.laborArea);

	}

	moveHandToLabor(index, idHand, idLaborArea){ //moves a card from player's Hand array based on "index" to laborArea array
		
		if(this.hand.length > 0 && this.hand[index] !== undefined){ //checks if there are cards in Hand array to push to laborArea array

			removeActiveDisplayHand(this.hand[index]);
			addActiveDisplayLabor(this.hand[index]);
			this.laborArea.push(this.hand[index]);
			this.hand.splice(index, 1);

			this.updateHandCount(idHand);
			this.updateLaborAreaCount(idLaborArea);

			console.log("Hand: " + this.hand.length);
			console.log("Labor Area: " + this.laborArea.length);

		} else {
			
			console.log("moveHandToLabor - No cards in hand");

		}
	}

	moveHandToOnDeck(index, idHand, idOnDeck){ //moves a card from a player's Hand array based on "index" to onDeck array

		let onDeckTable = document.getElementById("activePlayerOnDeckTable");
		console.log("On Deck Table:");
		console.log(onDeckTable);
		
		if(this.hand.length > 0 && this.hand[index] !== undefined){ //checks if there are cards in Hand array to push to onDeck array
			
			removeActiveDisplayHand(this.hand[index]);
			addActiveDisplayOnDeck(this.hand[index]);
			this.onDeck.push(this.hand[index]);
			this.hand.splice(index, 1);
			
			this.updateHandCount(idHand);
			this.updateOnDeckCount(idOnDeck);
			onDeckTable.removeEventListener("click", this.moveHandToOnDeck);
			onDeckTable.classList.remove("onDeckAreaAllowedToPlay");

			console.log("Hand: " + this.hand.length);
			console.log("On Deck: " + this.onDeck.length);

		} else{


			console.log("moveHandToOnDeck - No cards in hand");

		}
	}

	moveOnDeckToDiscard(tdId, idOnDeck, idDiscard){ //moves card from onDeck array to discard array based on "index"

		if(this.onDeck.length > 0){ //checks if there are cards in the onDeck array

			console.log("tdId: " + tdId);
			console.log(this.onDeck);

			let index = getIndexByMarkValue(this.onDeck, tdId); //returns -1 if tdId cannot be found in player's onDeck array
			console.log("index: " + index);
			let markTest = this.onDeck[index];
			console.log("mark: " + markTest.mark);

			if(index != -1){ //if tdId is found in player array, remove that card from array and td from DOM

				removeActiveDisplayOnDeck(this.onDeck[index]); //remove td from DOM
				this.discard.push(this.onDeck[index]); //remove card from onDeck array
				this.onDeck.splice(index, 1);
	
				this.updateOnDeckCount(idOnDeck);
				this.updateDiscardCount(idDiscard);
	
				console.log("On Deck: " + this.onDeck.length);
				console.log("Discard: " + this.discard.length);

			} else{
				console.log("moveOnDeckToDiscard Error - Card not found");
			}

				
		} else { //if onDeck array is empty, no cards are moved to discard array

			console.log("No Performers to Injure");
	
		}
	}

	clearLaborToDiscard(idLabor, idDiscard){ //moves all cards from laborArea array to discard array
		
		if(this.laborArea.length > 0){ //checks if there are cards in laborArea array to move to discard array

			// console.log("Labor Area: " + this.laborArea.length);

			this.laborArea.forEach(removeActiveDisplayLabor); //removes <td> elements containing card images
			this.laborArea.forEach(element => this.discard.push(element)); //pushes elements of laborArea array to discard array
			this.laborArea.length = 0; //clears laborArea array by setting length to 0
			
			this.updateLaborAreaCount(idLabor);
			this.updateDiscardCount(idDiscard);

			console.log("Labor Area Length: " + this.laborArea.length);
			console.log("Discard Length: " + this.discard.length);

		} else { //if there are no cards in laborArea array, lets console know

			console.log("clearLaborToDiscard - No Laborers to discard");

		}
	}

	clearOnDeckToDiscard(idOnDeck, idDiscard){ //moves all cards from onDeck array to discard array
		
		if(this.onDeck.length > 0){ //checks if there are cards in onDeck array to move to discard array

			console.log("On Deck Length: " + this.onDeck.length);

			this.onDeck.forEach(removeActiveDisplayOnDeck); //removes <td> elements containing card images
			this.onDeck.forEach(element => this.discard.push(element)); //pushes elements of onDeck array to discard array
			this.onDeck.length = 0; //clears onDeck array by setting length to 0

			this.updateOnDeckCount(idOnDeck);
			this.updateDiscardCount(idDiscard);

	
			console.log("Labor Area Length: " + this.onDeck.length);
			console.log("Discard Length: " + this.discard.length);

		} else { //if there are no cards in onDeck array, lets console know

			console.log("clearOnDeckToDiscard - No On Deck Performers");

		}
	}

	activateInjure(cssDescription){ //adds event listeners to elements with given desciption to enable injury onclick

		console.log("ActiveInjure Start");

		let onDeckDisplay = document.querySelectorAll(cssDescription);

		onDeckDisplay.forEach(function(el){ //adds injure class and "click" event listener to elements with 
			el.classList.add("activeOnDeckInjure");
			console.log(el.id);
			el.onclick = function(){activePlayer.moveOnDeckToDiscard(el.id, 'activePlayerOnDeck', 'activePlayerDiscard')};
			//nest moveOnDeckToDiscard in anonymous function because parameters are required
		});

		console.log(onDeckDisplay);

	}

	updateHandCount(id){ //places Player.hand.length in element with given id
		
		document.getElementById(id).innerHTML = "Hand: " + this.hand.length;
	}

	updateDeckCount(id){ //places Player.deck.length in element with given id

		document.getElementById(id).innerHTML = "Deck: " + this.deck.length;

	}

	updateOnDeckCount(id){ //places Player.onDeck.length in element with given id

		document.getElementById(id).innerHTML = "On Deck: " + this.onDeck.length;

	}

	updateDiscardCount(id){ //places Player.discard.length in element with given id

		document.getElementById(id).innerHTML = "Discard: " + this.discard.length;

	}

	updateLaborAreaCount(id){ //places Player.laborArea.length in element with given id

		document.getElementById(id).innerHTML = "Labor Area: " + this.laborArea.length;

	}
}

//I'm not sure I need the card class anymore, unless I wanted to easily pass a method or property to all card classes 
class card{ //onStart - creates class constructor to fill objects with properties from source arrays above
	constructor(){
	}
	discard(){
		//move card to appropriate discard pile
	}
}

class workingGnome{ //onStart - sets up Working Gnome card coding class. Each player will have 7 cards created with this class
	constructor(name, labor, perf, cost, ability, image, mark){
		this.name = name;
		this.labor = labor;
		this.perf = perf;
		this.cost = cost;
		this.ability = ability;
		this.image = image;	
		this.mark = mark;
	}

	playToLabor(){

	}
}

class daringGnome{ //onStart - sets up Daring Gnome card coding class. Each player will have 2 cards created with this class
	constructor(name, labor, perf, cost, ability, image, mark){
		this.name = name;
		this.labor = labor;
		this.perf = perf;
		this.cost = cost;
		this.ability = ability;
		this.image = image;	
		this.mark = mark;
	}

	playToLabor(){

	}
}

class mischievousGnome{ //onStart - sets up Mischievous Gnome card coding class. Each player will have 1 card created with this class
	constructor(name, labor, perf, cost, ability, image, mark){
		this.name = name;
		this.labor = labor;
		this.perf = perf;
		this.cost = cost;
		this.ability = ability;
		this.image = image;	
		this.mark = mark;
	}

	playToLabor(){

	}
}


//ON START:

var gameState = {
	
	beginPlayPhase : function(){

		let activeHand = document.querySelectorAll(".activeHandDisplay"); //grabs all <td> in active player's hand
		activeHand.forEach(addSelectInHandListener); //adds event listener to select a card in hand

	}
}

createHireSlots();

var player1 = new player("player1");
player1.createStartingDeck();
player1.shuffleDrawDeck();
console.log(player1.name);

var player2 = new player("player2");
player2.createStartingDeck();
player2.shuffleDrawDeck();
console.log(player2.name);

var activePlayer = player1;

var turnPhase = "play";

function changeActivePlayer(){

	if(activePlayer == player1){

		activePlayer = player2;

	} else if(activePlayer == player2){

		activePlayer = player1;

	} else {

		console.log("Edge case, check changeActivePlayer function");

	}

	console.log("Active Player: " + activePlayer.name);
	activePlayer.updateDiscardCount("activePlayerDiscard");
	activePlayer.updateDeckCount("activePlayerDeck");
	activePlayer.updateOnDeckCount("activePlayerOnDeck");
	activePlayer.updateLaborAreaCount("activePlayerLabor");
	activePlayer.updateHandCount("activePlayerHand");
	document.getElementById("activePlayerHeader").innerHTML = activePlayer.name;

}

//this will need to be done for each card class individually
for(let i = 0; i < cardName.length; i++){ //onStart - creates card objects from class constructor
 	let nameTempSpace = cardName[i]; 
 	let nameTempShort = nameTempSpace.split(" ").join(""); //removes potential spaces from object names
 	window[nameTempShort] = new card(cardName[i], cardLabor[i], cardPerf[i], cardCost[i], cardAbility[i], cardImage[i]);
	// console.log(nameTempShort); //tests removal of spaces
	// console.log(window[nameTempShort].ability); //tests name property of new objects
}


function defineCardImage(e){ //onStart - add "images/" before and ".png" after card names to define cardImages source paths
	let cardImagePath = "images/" + e + ".png";
	return cardImagePath;
}

//FIX - will need to add hiring event listeners based on active player's labor when hire phase starts and updates after each hire

function createHireSlots(){ //onStart - creates and fills slots for new hire cards

	for(let i = 12; i > 2; i--){

		let nameTempSpace = cardName[i]; //creates lower 5 slots: repeat of code above, but uses i instead of i+5
		let nameTempShort = nameTempSpace.split(" ").join("");
		let hireImg = document.createElement("img");

		hireImg.classList.add("hireImg");
		hireImg.id=nameTempShort;
		hireImg.src=cardImage[i];
		hireImg.alt=nameTempSpace;
		hireImg.addEventListener("mouseover", displayCard);

		let tdHire=document.createElement("td");
		tdHire.classList.add("hireTd");

		let miniName = document.createElement("p"); //creates <p> element to house value from cardName array
		miniName.classList.add("miniDisplayName");
		miniName.innerText = cardName[i];

		let miniCost = document.createElement("p"); //creates <p> element to house value from cardCost array
		miniCost.classList.add("miniDisplayCost");
		miniCost.innerText = cardCost[i];

		let miniPerf = document.createElement("p"); //creates <p> element to house value from cardPerf array
		miniPerf.classList.add("miniDisplayPerf");
		miniPerf.innerText = cardPerf[i];

		let miniLabor = document.createElement("p"); //creates <p> element to house value from cardLabor array
		miniLabor.classList.add("miniDisplayLabor");
		miniLabor.innerText = cardLabor[i];

		document.getElementById("hireCardSlots").appendChild(tdHire);
		tdHire.appendChild(hireImg);
		tdHire.appendChild(miniName);
		tdHire.appendChild(miniCost);
		tdHire.appendChild(miniLabor);
		tdHire.appendChild(miniPerf);
	}
}

function addActiveDisplayOnDeck(card){ //adds <td> with <img> to On Deck area when a card is added to OnDeck array

	let onDeckTr = document.getElementById("activePlayerOnDeckDisplay");

	let onDeckTd = document.createElement("td");
	onDeckTd.classList.add("activeOnDeckDisplay");
	onDeckTd.id = card.mark;

	let onDeckImg = document.createElement("img");
	onDeckImg.classList.add("activeOnDeckImg");
	onDeckImg.src = card.image;
	onDeckImg.alt = card.name;
	onDeckImg.addEventListener("mouseover", displayCard);

	let miniPerf = document.createElement("p");
	miniPerf.classList.add("miniDisplayPerf");
	miniPerf.innerText = card.perf;

	let miniLabor = document.createElement("p");
	miniLabor.classList.add("miniDisplayLabor");
	miniLabor.innerText = card.labor;

	onDeckTd.appendChild(onDeckImg);
	onDeckTd.appendChild(miniLabor);
	onDeckTd.appendChild(miniPerf);
	onDeckTr.appendChild(onDeckTd);

}

function removeActiveDisplayOnDeck(card){ //removes <td> with <img> from On Deck area when a card is removed from OnDeck array

	let onDeckTr = document.getElementById("activePlayerOnDeckDisplay");
	let cardMark = String(card.mark);
	let onDeckTd = document.getElementById(cardMark);

	console.log("card.mark: " + card.mark);
	console.log(onDeckTd);

	onDeckTr.removeChild(onDeckTd);

}

function addActiveDisplayLabor(card){ //adds <td> with <img> to On Deck area when a card is added to OnDeck array

	let laborTr = document.getElementById("activePlayerLaborDisplay");

	let laborTd = document.createElement("td");
	laborTd.classList.add("activeLaborDisplay");
	laborTd.id = card.mark;

	let laborImg = document.createElement("img");
	laborImg.classList.add("activeLaborImg");
	laborImg.src = card.image;
	laborImg.alt = card.name;
	laborImg.addEventListener("mouseover", displayCard);

	let miniPerf = document.createElement("p");
	miniPerf.classList.add("miniDisplayPerf");
	miniPerf.innerText = card.perf;

	let miniLabor = document.createElement("p");
	miniLabor.classList.add("miniDisplayLabor");
	miniLabor.innerText = card.labor;

	laborTd.appendChild(laborImg);
	laborTd.appendChild(miniLabor);
	laborTd.appendChild(miniPerf);
	laborTr.appendChild(laborTd);

}

function removeActiveDisplayLabor(card){ //removes <td> with <img> from On Deck area when a card is removed from OnDeck array

	let laborTr = document.getElementById("activePlayerLaborDisplay");
	let cardMark = String(card.mark);
	let laborTd = document.getElementById(cardMark);

	console.log("card.mark: " + card.mark);
	console.log(laborTd);

	laborTr.removeChild(laborTd);

}

function addActiveDisplayHand(card){ //adds <td> with <img> to hand area when a card is added to hand array

	let handTr = document.getElementById("activePlayerHandDisplay");

	let handTd = document.createElement("td");
	handTd.classList.add("activeHandDisplay");
	handTd.id = card.mark;

	let handImg = document.createElement("img");
	handImg.classList.add("activeHandImg");
	handImg.src = card.image;
	handImg.alt = card.name;
	handImg.addEventListener("mouseover", displayCard);

	let miniPerf = document.createElement("p");
	miniPerf.classList.add("miniDisplayPerf");
	miniPerf.innerText = card.perf;

	let miniLabor = document.createElement("p");
	miniLabor.classList.add("miniDisplayLabor");
	miniLabor.innerText = card.labor;

	handTd.appendChild(handImg);
	handTd.appendChild(miniLabor);
	handTd.appendChild(miniPerf);
	handTr.appendChild(handTd);

}

function removeActiveDisplayHand(card){ //removes <td> with <img> from hand when a card is removed from hand array

	let handTr = document.getElementById("activePlayerHandDisplay");
	let cardMark = String(card.mark);
	let handTd = document.getElementById(cardMark);

	console.log("card.mark: " + card.mark);
	console.log(handTd);

	handTr.removeChild(handTd);

}

function getIndexByMarkValue(arr, value) { //finds index of item in given array based on given Mark value

	console.log("start getIndexByMarkValue");

	for (let i=0; i<arr.length; i++) { //loops through given array comparing mark values to given value

	  if (arr[i].mark == value) return i;

	}
	
	console.log("getIndexByMarkValue - value not found");
	return -1; //if the value isn't found, returns -1

  }

function addSelectInHandListener(element){ //adds event listener to call selectInHand function onclick to given HMTL element

	element.addEventListener("click", selectInHand)
	element.classList.add("activeHandPlayPhase");
}

function selectInHand(){ //adds event listeners based on selected card's labor/perf. Card may only enter appropriate arrays

	var tdId = this.id; //grabs id of clicked element
	var selectedObjectIndex = getIndexByMarkValue(activePlayer.hand, tdId); //uses id to get corresponding index of activePlayer.hand array
	var selectedObject = activePlayer.hand[selectedObjectIndex]; //grabs the corresponding object to check the values of
	console.log(selectedObject);

	if(selectedObject.labor != "-"){ //checks if selected card may labor


		let laborSelectArea = document.getElementById("activePlayerLaborTable");
		laborSelectArea.classList.add("laborAreaAllowedToPlay");
		laborSelectArea.addEventListener("click", function(){

			activePlayer.moveHandToLabor(selectedObjectIndex, 'activePlayerHand', 'activePlayerLabor')

		});

		console.log("selectInHand - card may labor");

	}

	if(selectedObject.perf != "-"){ //checks if selected card may perform


		let onDeckSelectArea = document.getElementById("activePlayerOnDeckTable");
		onDeckSelectArea.classList.add("onDeckAreaAllowedToPlay");
		onDeckSelectArea.addEventListener("click", function(){

			activePlayer.moveHandToOnDeck(selectedObjectIndex, 'activePlayerHand', 'activePlayerOnDeck')

		});

		console.log("selectInHand - card may perform");

	}


}

function displayCard(){ //changes values of displayed card when mouse hovers over small image
	let index=cardName.indexOf(this.alt); //'this' refers to object that triggers the event (target or currentTarget)
	document.getElementById("displayCardName").innerHTML=cardName[index];
	document.getElementById("displayCardCost").innerHTML= "Hire: " + cardCost[index];
	document.getElementById("displayCardImage").src=cardImage[index];
	document.getElementById("displayCardAbility").innerHTML=cardAbility[index];
	document.getElementById("displayCardLabor").innerHTML= "Labor: " + cardLabor[index];
	document.getElementById("displayCardPerf").innerHTML= "Performance: " + cardPerf[index];

	// console.log(e);
	// console.log(this.id);
	// console.log(index);
}

function logId(clickedElement){ //tests getting info from the clicked element
	alert(clickedElement.innerHTML);
	console.log(clickedElement.id);
}


// for (let i = 3; i < 8; i++) { //onStart - Create hire card display slots
// 	//creates upper 5 slots
// 	let nameTempSpaceUpper = cardName[i+5];
// 	let nameTempShortUpper = nameTempSpaceUpper.split(" ").join(""); //removes potential spaces from object names
// 	let imgUpper = document.createElement("img"); //creates a new <img> element for card slot

// 	imgUpper.classList.add("hireImg"); //adds class to <img> for formatting
// 	imgUpper.id=nameTempShortUpper; //adds properties to <img>
// 	imgUpper.src=cardImage[i+5];
// 	imgUpper.alt=nameTempSpaceUpper;
// 	imgUpper.addEventListener("mouseover", displayCard); //adds listener to display card when hovered

// 	let tdUpper=document.createElement("td"); //creates new column to house <image>
// 	tdUpper.classList.add("hireTd");

// 	let miniPerfUpper = document.createElement("p"); //creates <p> element to house value from cardPerf array
// 	miniPerfUpper.classList.add("miniDisplayPerf");
// 	miniPerfUpper.innerText = cardPerf[i+5];

// 	let miniLaborUpper = document.createElement("p"); //creates <p> element to house value from cardLabor array
// 	miniLaborUpper.classList.add("miniDisplayLabor");
// 	miniLaborUpper.innerText = cardLabor[i+5];

// 	document.getElementById("upperHireCards").appendChild(tdUpper); //adds new <td> column to UpperHireCards row
// 	tdUpper.appendChild(imgUpper); //adds new <img> to new <td>
// 	tdUpper.appendChild(miniLaborUpper);
// 	tdUpper.appendChild(miniPerfUpper);

// 	//creates lower 5 slots
// 	let nameTempSpaceLower = cardName[i]; //creates lower 5 slots: repeat of code above, but uses i instead of i+5
// 	let nameTempShortLower = nameTempSpaceLower.split(" ").join("");
// 	let hireImg = document.createElement("img");

// 	hireImg.classList.add("hireImg");
// 	hireImg.id=nameTempShortLower;
// 	hireImg.src=cardImage[i];
// 	hireImg.alt=nameTempSpaceLower;
// 	hireImg.addEventListener("mouseover", displayCard);

// 	let tdLower=document.createElement("td");
// 	tdLower.classList.add("hireTd");

// 	let miniPerfLower = document.createElement("p"); //creates <p> element to house value from cardPerf array
// 	miniPerfLower.classList.add("miniDisplayPerf");
// 	miniPerfLower.innerText = cardPerf[i];

// 	let miniLaborLower = document.createElement("p"); //creates <p> element to house value from cardLabor array
// 	miniLaborLower.classList.add("miniDisplayLabor");
// 	miniLaborLower.innerText = cardLabor[i];

// 	document.getElementById("lowerHireCards").appendChild(tdLower);
// 	tdLower.appendChild(hireImg);
// 	tdLower.appendChild(miniLaborLower);
// 	tdLower.appendChild(miniPerfLower);

// }