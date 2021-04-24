//function createCards(){//Beginning of card creation
//const cardProperties = ["Name", "Labor", "Perf", "Cost", "Ability"]; //Beginning of making program flexible by creating arrays based on 1 input array
const cardName = ["Working Gnome", "Daring Gnome", "Mischievous Gnome", 
				"Goblin", "Golem", "Werewolf", "Mermaid", "Faun", "Minotaur", "Fairy", "Phoenix", "Sphinx", "Unicorn"];
const cardLabor = [1, 0, 0, 1, 2, 0, 0, 1, 2, 0, 1, 1, 1];
const cardPerf = ["-",1,1,1,"-",2,3,0,1,2,4,3,6];
const cardCost = [0,0,0,2,3,3,3,3,4,4,5,5,6];
const cardAbility = ["","","Attack (1)","Perf: Discard (1), then Draw (1)", "Draw (1)", "Attack (1)", "When Mermaid is injured, you may discard (1) to return it to your hand instead of injuring it", "Gains +1 Perf for each other Active Performer",
				"Resilient: it takes 2 injuries to cause Mintaur to be discarded", "You may place 1 card from your Discard on top of your Deck", 
				"Before performing, you may discard a card to return Phoenix from your discard to your hand", "Perf: You may Draw (2), then Discard (2)", 
				"Choose 1 player to discard all his/her active Unicorns"];
const cardImage = cardName.map(defineCardImage); //generates image path array from cardName array

var numberOfPlayers = 4; //Defines how many players are playing the game

class card{ //onStart - creates class constructor to fill objects with properties from source arrays above
	constructor(name, labor, perf, cost, ability, image){
		this.name=name;
		this.labor=labor;
		this.perf=perf;
		this.cost=cost;
		this.ability=ability;
		this.image=image;
	}
}

for(let i=0;i<cardName.length;i++){ //onStart - creates card objects from class constructor
 	let nameTempSpace = cardName[i]; 
 	let nameTempShort = nameTempSpace.split(" ").join(""); //removes potential spaces from object names
 	window[nameTempShort]= new card(cardName[i], cardLabor[i], cardPerf[i], cardCost[i], cardAbility[i], cardImage[i]);
	// console.log(nameTempShort); //tests removal of spaces
	// console.log(window[nameTempShort].ability); //tests name property of new objects
}

//Tests card properties
// console.log(Goblin.ability);
// console.log(Unicorn.perf);
// console.log(Golem.labor);
// console.log(Werewolf.name);
// console.log(Object.keys(Werewolf));
// console.log(Object.values(Werewolf));

//} //end of function createCards()

function defineCardImage(e){ //onStart - add "images/" before and ".png" after card names to define cardImages source paths
	let cardImagePath = "images/"+e+".png";
	return cardImagePath;
}

for (let i = 0; i < numberOfPlayers; i++) { //onStart - create player arrays based on numberOfPlayers
	let playerNum = "player" + [i+1]; //creates a unique player name for each player starting at player1

//creates names for each player's perf area, labor area, deck, discard, and hand
	let playerPerf = playerNum + "Perf";
	let playerLabor = playerNum + "Labor";
	let playerDeck = playerNum + "Deck";
	let playerDiscard = playerNum + "Discard"
	let playerHand = playerNum + "Hand";
	// console.log(playerPerf);

//creates arrays for each player's area based on names created above
	window[playerPerf] = [];
	window[playerLabor] = [];
	window[playerDeck] = [];
	window[playerDiscard] = [];
	window[playerHand] = [];

// console.log(playerPerf); //tests creation of an array for each player
}


for (let i = 3; i < 8; i++) { //onStart - Create card display slots
	let nameTempSpaceUpper = cardName[i+5]; //creates upper 5 slots
	let nameTempShortUpper = nameTempSpaceUpper.split(" ").join(""); //removes potential spaces from object names
	let imgUpper = document.createElement("img"); //creates a new <img> element for card slot
	imgUpper.classList.add("hireImg"); //adds class to <img> for formatting
	imgUpper.id=nameTempSpaceUpper; //adds properties to <img>
	imgUpper.src=cardImage[i+5];
	imgUpper.alt=nameTempSpaceUpper;
	imgUpper.addEventListener("mouseover", displayCard); //adds listener to display card when hovered
	let tdUpper=document.createElement("td"); //creates new column to house <image>
	tdUpper.classList.add("hireTd");
	document.getElementById("upperHireCards").appendChild(tdUpper); //adds new <td> column to UpperHireCards row
	tdUpper.appendChild(imgUpper); //adds new <img> to new <td>

	let nameTempSpaceLower = cardName[i]; //creates lower 5 slots: repeat of code above, but uses i instead of i+5
	let nameTempShortLower = nameTempSpaceLower.split(" ").join("");
	let imgLower = document.createElement("img");
	imgLower.classList.add("hireImg");
	imgLower.id=nameTempSpaceLower;
	imgLower.src=cardImage[i];
	imgLower.alt=nameTempSpaceLower;
	imgLower.addEventListener("mouseover", displayCard);
	let tdLower=document.createElement("td");
	tdLower.classList.add("hireTd");
	document.getElementById("lowerHireCards").appendChild(tdLower);
	tdLower.appendChild(imgLower);

	// console.log(tdUpper.classList[0]);
	// console.log(imgUpper.classList[0]);
}

function displayCard(){ //changes values of displayed card when mouse hovers over small image
	let index=cardName.indexOf(this.id); //'this' refers to object that triggers the event (target or currentTarget)
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

function pFill(key, value){ 
	let pValue = document.createElement("p");
	pValue.className = key;
	pValue.innerHTML = value;
	document.getElementById("card").appendChild(pValue);
}

var showCardNum = 0;
function showCardName(){
	let pTest = document.createElement("p");
	pTest.innerHTML = cardName[showCardNum];
	let parent = document.getElementById("hireCards").appendChild(pTest);
	console.log(pTest);
	showCardNum++;
	console.log(x);
}
