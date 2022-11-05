import gameKeeper from './gameKeeper.js';

const artist = {

	renderMini(card, parentId, divClass) {

		let miniParent = document.getElementById(parentId);
		let miniFragment = document.createDocumentFragment();

		let miniDiv = document.createElement("div");
		miniDiv.classList.add("activeMiniWrapper");

		//gives option to add unique class to rendered cards for later selection
		if(divClass) {
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

		if(card.icon) {

			let miniIcon = document.createElement("img");
			miniIcon.classList.add("miniDisplayIcon");
			miniIcon.src = card.icon;
			miniDiv.appendChild(miniIcon)
		}

		//checks and adds click select listener if going to hand during play phase
		if(gameKeeper.turnPhase === "Play" && parentId === "activePlayerHandWrapper") {

			miniDiv.addEventListener("click", gameKeeper.gKHandSelectListener);
			
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

	//render full preview of card to display ability as well
//need to reference from gameSetup.cardList to avoid having to find owner then card location then card
	renderFullPreview(card) {

		let fullPreviewId = "fullPreviewContainerId";

		if(!document.getElementById(fullPreviewId)){

			let fullPreview = document.createElement("div");
			let fullPreviewContainer = document.getElementById("GameAreaWrapper");

			fullPreview.id = fullPreviewId;

			fullPreviewContainer.appendChild(fullPreview);
			artist.renderFull(card, fullPreviewId);

		} else if(document.getElementById(fullPreviewId)) {

			artist.removeDisplay(card, "GameAreaWrapper");

		} else {
			console.log("artist.renderFullPreview - Error");
		}

	},

	renderArrayMini(array, containerId, title, divClass, leftButtonText, rightButtonText) {

		if(!document.getElementById(containerId)) {

			let renderedArray = array;
			let renderContainer = document.createElement("div");
			let renderContainerId = `${containerId}FlexContainer`;
			let renderFlex = document.createElement("div");
			let renderParent = document.getElementById("GameAreaWrapper");
			let renderClose = document.createElement("div");
			let renderTitle = document.createElement("p");
			let renderArrayFrag = document.createDocumentFragment();

			renderTitle.textContent = title;
			renderTitle.classList.add("renderedHeader");

			renderContainer.id = containerId;
			renderFlex.id = renderContainerId;
			renderFlex.classList.add("renderArrayFlexContainer");
			renderContainer.classList.add("renderArrayContainer")
			renderArrayFrag.appendChild(renderContainer);
			renderContainer.appendChild(renderTitle);
			renderContainer.appendChild(renderClose);
			renderContainer.appendChild(renderFlex);
			renderParent.appendChild(renderArrayFrag);

			if(divClass) { //checks if a unique class was given to add to rendered mini's

				renderedArray.forEach(function(el){artist.renderMini(el, renderContainerId, divClass)});

			} else {

				renderedArray.forEach(function(el){artist.renderMini(el, renderContainerId)});

			}

			renderClose.classList.add("renderClose");
			renderClose.textContent = "X";
			renderClose.addEventListener("click", function(){
				renderParent.removeChild(renderContainer);
			})

			//checks and adds left button if text is given for it
			if(leftButtonText) {

				let leftButton = document.createElement("button");
				leftButton.type = "button";
				leftButton.classList.add("buttonLeft");
				leftButton.innerText = leftButtonText;

				renderContainer.appendChild(leftButton);

			}

			//checks and adds right button if text is given for it
			if(rightButtonText) {

				let rightButton = document.createElement("button");
				rightButton.type = "button";
				rightButton.classList.add("buttonRight");
				rightButton.innerText = rightButtonText;

				renderContainer.appendChild(rightButton);

			}

		}
	
	},
	
	renderChoiceDialogue(containerId, title, leftButtonText, rightButtonText) {

		let choiceDialogueContainer = document.createElement("div");
		let choiceDialogueFragment = document.createDocumentFragment();
		let gameAreaWrapper = document.getElementById("GameAreaWrapper");

		choiceDialogueContainer.id = containerId;
		choiceDialogueContainer.classList.add("requestContainer");

		let renderTitle = document.createElement("p");
		renderTitle.textContent = title;
		renderTitle.classList.add("renderedHeader");
		choiceDialogueContainer.appendChild(renderTitle);

		//if text is given for left/right buttons, create and populate
		if(leftButtonText) {

			let leftButton = document.createElement("button");
			leftButton.type = "button";
			leftButton.classList.add("buttonLeft");
			leftButton.innerText = leftButtonText;

			choiceDialogueContainer.appendChild(leftButton);

		}

		if(rightButtonText) {

			let rightButton = document.createElement("button");
			rightButton.type = "button";
			rightButton.classList.add("buttonRight");
			rightButton.innerText = rightButtonText;

			choiceDialogueContainer.appendChild(rightButton);
		
		}

		choiceDialogueFragment.appendChild(choiceDialogueContainer);
		gameAreaWrapper.appendChild(choiceDialogueFragment);

	},

	renderActivePlayer() {

		//setup player values
		let player = gameKeeper.activePlayer;
		let onDeckId = "activePlayerOnDeckWrapper";
		let onDeckDisplay = document.getElementById(onDeckId);
		let onDeck = player.onDeck;
		let laborId = "activePlayerLaborWrapper";
		let laborDisplay = document.getElementById(laborId);
		let labor = player.laborArea;
		let handId = "activePlayerHandWrapper";
		let handDisplay = document.getElementById(handId);
		let hand = player.hand;

		//clear current displays
		onDeckDisplay.textContent = "";
		laborDisplay.textContent = "";
		handDisplay.textContent = "";

		//render new displays
		onDeck.forEach(function(elem){
			artist.renderMini(elem, onDeckId);
		})
		labor.forEach(function(elem) {
			artist.renderMini(elem, laborId);
		})
		hand.forEach(function(elem) {
			artist.renderMini(elem, handId);
		})

		//update display counts
		gameKeeper.updateDisplayCount("activePlayerName", player.name);
		gameKeeper.updateDisplayCount("activePlayerLaborCount", `Labor: ${player.laborPoints}`);
		gameKeeper.updateDisplayCount("activePlayerPerfCount", `Perf: ${player.performancePoints}`);
		gameKeeper.updateDisplayCount("activePlayerVPCount", `VP: ${player.reputationPoints}`);
		gameKeeper.updateDisplayCount("activePlayerDeckCount", player.deck.length);
		gameKeeper.updateDisplayCount("activePlayerDiscardCount", player.discard.length);

	},

	renderMiniPlayerSummary(player, containerElem) {

		let name = player.name;
		let reputation = player.reputationPoints;
		let onDeckCount = player.onDeck.length;
		let wrapperDiv = document.createElement("div");
		let summaryContainer = containerElem;
		let summaryFrag = document.createDocumentFragment();

		let nameContainer = document.createElement("p");
		nameContainer.textContent = name;
		nameContainer.classList.add("summaryName");

		let reputationContainer = document.createElement("p");
		reputationContainer.textContent = `VP: ${reputation}`;
		reputationContainer.classList.add("summaryRep");

		let onDeckCountContainer = document.createElement("p");
		onDeckCountContainer.textContent = `On Deck: ${onDeckCount}`;
		onDeckCountContainer.classList.add("summaryOnDeck");

		wrapperDiv.id = `${name}Summary`;
		wrapperDiv.classList.add("flexRow");
		wrapperDiv.addEventListener("click", gameKeeper.addInjury);
		wrapperDiv.appendChild(nameContainer);
		wrapperDiv.appendChild(reputationContainer);
		wrapperDiv.appendChild(onDeckCountContainer);
		summaryFrag.appendChild(wrapperDiv);
		summaryContainer.appendChild(summaryFrag);

	},

	renderPerfQualityList() {
		let perfQualityStats = gameKeeper.performanceStats;
		let listContainer = document.createDocumentFragment();
		let listWrapper = document.createElement('table');
		listWrapper.classList.add('perfQualityList');
		let headerInfoList = ['Perf Quality', 'Perf Type', 'VP'];
		let playerPerfQuality = gameKeeper.activePlayer.performancePoints;

		for (let i=0; i<=perfQualityStats.length; i++) {
			if(i===0) {
				let headerRow = document.createElement('tr');
				headerInfoList.forEach(header => {
					let headerInfo = document.createElement('th');
					headerInfo.innerText = header;
					headerRow.appendChild(headerInfo);
				})
				listWrapper.appendChild(headerRow);

			} else {
				let infoRow = document.createElement('tr');

				//identify which performance quality the player qualifies for
				let adequateQuality = playerPerfQuality > perfQualityStats[i-1][0];
				let highestType = (i < perfQualityStats.length) ? playerPerfQuality < perfQualityStats[i][0] : true;
				console.log(playerPerfQuality, perfQualityStats[i-1][0], highestType);
				if (adequateQuality && highestType) {
					infoRow.classList.add('perfQualityId');
				}

				perfQualityStats[i-1].forEach((stat, index) => {
					let statInfo = document.createElement('td');
					statInfo.innerText = (index === 0) ? stat + '+' : stat;
					infoRow.appendChild(statInfo);

				});
				listWrapper.appendChild(infoRow);
			}
		}

		listContainer.appendChild(listWrapper);
		return listContainer;
	}
}

export default artist;