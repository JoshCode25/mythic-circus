import cardCollection from './cardCollection.js';
import gameSetup from './gameSetup.js';
import artist from './artist.js';
import utility from './utility.js';

const gameKeeper = {

        selectedIndex: -1,
        selectedCard: {},
        messageLog: [],
        undoMax: 5,
        startingHandAmount: 5,

        activePlayer: {},
        activePlayerIndex: 0,
        activePlayerName: "",

        hireSlots: cardCollection,
        hiredLog: [],
        turnPhase: 'Start',

        lastRound: false,

        mediocre: 6,
        mediocreReward: 1,
        memorable: 11,
        memorableReward: 2,
        stellar: 16,
        stellarReward: 3,
        instantClassic: 21,
        instantClassicReward: 4,

        start() {

            //establish the active player
            gameKeeper.activePlayer = gameSetup.players[0];
            gameKeeper.activePlayerName = gameKeeper.activePlayer.name;

            //add gnomes to cardList for preview reference
            gameKeeper.activePlayer.addGnomesToCardList();

            console.log(gameSetup.cardList);

            console.log(gameSetup.players);
            document.getElementById("activePlayerDiscardContainer").addEventListener("contextmenu", this.renderActiveDiscard);
            document.getElementById("activePlayerName").addEventListener("click", function(){console.log(gameKeeper.activePlayer)});
            gameKeeper.createHireSlots(gameKeeper.hireSlots);
            gameKeeper.createNonActivePlayerSlots();

            //give each player a starting hand
            gameSetup.players.forEach(function (elem) {
                elem.drawFromDeck(gameKeeper.startingHandAmount);
            });
            gameKeeper.beginPlayPhase();
        },

        renderActiveDiscard(e) {

            if(e.button === 2 || e.which ===3) {
                
                e.preventDefault();

                console.log("renderDiscard");

                artist.renderArrayMini(gameKeeper.activePlayer.discard, 'renderArraySample', 'Active Player Discard');
    
                return false;

            }

        },

        gKHandSelectListener() {

            gameKeeper.updateSelectedIndex(this.id);

        },

        //need to figure out how to efficiently deep clone gameKeeper, players[], and hireSlots[]
        addToUndoLog() { //adds copy of current gameKeeper to undo log with a max number of stores

            // //adds players array to gameKeeper for saving
            // let playersArray = gameSetup.players;
            // let copiedPlayers = [];
            // let copiedGameKeeper = Object.assign({}, gameKeeper); //only clones properties, arrays/objects are still referenced
            // let hireSlotsArray = gameKeeper.hireSlots;
            // let copiedHireSlots = [];

            // playersArray.forEach(function(elem) {

            //     let playerCopy = Object.assign({}, elem); //shallow copy, needs to clone arrays full of objects
            //     copiedPlayers.push(playerCopy);

            // })

            // hireSlotsArray.forEach(function(elem) {

            //     // let hireCopy = Object.assign
            // })

            // let undoEntry = {players: copiedPlayers, gameKeeper: copiedGameKeeper};

            // if(undoLog.length < gameKeeper.undoMax) {

            //     undoLog.unshift(undoEntry);
            //     console.log(undoLog);

            // } else {


            //     undoLog.pop();
            //     undoLog.unshift(undoEntry);
            //     console.log(undoLog);

            // }
        },

        //need to figure out how to properly log previous states
        undo() {

            // let previousSave = undoLog.shift();

            // console.log(previousSave);

            // //restores players to previous "save"
            // if(gameKeeper.undoPlayers !== previousSave.undoPlayers) {

            //     console.log("need to update players");
            //     // gameKeeper.undoPlayers = previousSave.undoPlayers;

            // }

            // //restores activePlayer to previous "save"
            // if(gameKeeper.activePlayer !== previousSave.activePlayer) {

            //     console.log("need to update activePlayer");
            //     gameKeeper.activePlayer = previousSave.activePlayer;
            //     artist.renderActivePlayer();

            // }

            // if(gameKeeper.hireSlots !== previousSave.hireSlots) {

            //     console.log("need to update hireSlots");
            //     gameKeeper.hireSlots = previousSave.hireSlots;
            //     gameKeeper.createHireSlots(gameKeeper.hireSlots);

            // }

        },

        //checks if and enables active player to distribute injuries if required
        checkForInjuries() { 
            
            //checks if there are any pending injuries the player needs to deal with
            if(gameKeeper.activePlayer.pendingInjuries > 0 && gameKeeper.activePlayer.onDeck.length > 0) {

                //checks to not require injuring more than are available onDeck
                let injureAmount = Math.min(gameKeeper.activePlayer.pendingInjuries, gameKeeper.activePlayer.onDeck.length);
                let injureContainerId = "injuryContainer";
                let title = `Choose ${injureAmount} to Injure`;
                let divClass = "injurySelection";

                artist.renderArrayMini(gameKeeper.activePlayer.onDeck, injureContainerId, title, divClass, "Injure", "Reset");

                let injureContainer = document.getElementById(injureContainerId);
				let injureSelected = []; //container for selected cards
				let injureSelectedTest = false; //defaults to not have a enough cards selected

				let injureButton = injureContainer.querySelector(".buttonLeft");
				let resetButton = injureContainer.querySelector(".buttonRight");

                //removes option to close window
				let renderClose = injureContainer.querySelector(".renderClose");
				injureContainer.removeChild(renderClose);

				//enables checking on selected card(s)
				let renderedHeaderEventListener = document.querySelector(".renderArrayContainer .renderedHeader"); 
				renderedHeaderEventListener.addEventListener("click", function(){
	
					console.log(injureSelected);
					alert(injureSelected.length);
				
				});

				//adds listener to all rendered cards to be added to discard array when clicked
				let renderedCards = document.querySelectorAll(`.${divClass}`); 
				renderedCards.forEach(function(elem){
					elem.addEventListener("click", function(){
	
						let cardId = this.id;
						let cardIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.onDeck, cardId);
						let cardSelected = gameKeeper.activePlayer.onDeck[cardIndex];
					
						console.log(injureSelected.length);

						//if injureSelected has less than injureAmount cards in it, add red border to clicked cards
						if(injureSelected.length < injureAmount) {
	
							injureContainer.querySelector(`#${cardId}`).classList.add("redDiscardBorder");
	
						} else { //render warning near cursor saying cards have already been selected
	
							gameKeeper.gameLog(`${injureSelected.length} cards have already been selected to injure. Reset if you'd like to change.`);
	
						}

						//if less than injureAmount cards have been selected, adds clicked card to selected array
						if(injureSelected.length < injureAmount) {

                            //check to make sure the same card isn't injured multiple times (except for Minotaur)
                            if(injureSelected.length === 0 || injureSelected.some(elem => elem.mark !== cardSelected.mark)) {

                                console.log(`${cardSelected.mark} has been added to the injureSelected array for the first time`);
                                injureSelected.push(cardSelected);

                            } else if(cardSelected.name === "Minotaur") {

                                //if Minotaur has already been injured before, it can't be added again to take a third injury
                                if(cardSelected.injured) {

                                    gameKeeper.log(`${cardSelected.name} has been injured before and cannot take a third injury`);
                                    console.log(`${cardSelected.mark} has already been injured, and cannot be injured again`);

                                } else if(!cardSelected.injured) { //if Minotaur hasn't been injured before, make sure it's only added a second time

                                    let minoCount = 0;

                                    //count how many times Minotaur is in the injureSelected array
                                    injureSelected.forEach(function(elem) {

                                        if(elem.mark === cardSelected.mark) {
                                            minoCount++;
                                        }

                                    })
                                
                                    //if Minotaur's in once, add again
                                    if(minoCount === 1) {
                                        console.log(`add ${cardSelected.mark} for second injury`);
                                        injureSelected.push(cardSelected);
                                    }

                                }

                            }

							
							//checks if cards have been selected, then approves to activate injuring
							if(injureSelected.length === injureAmount) {

								injureSelectedTest = true;

							}

						} else if(injureSelected.length > injureAmount) { //error check
							console.log("gameKeeper checkForInjuries() error");
						}
						
					})
				})

                //checks if enough cards are selected to injure, injures cards, then begins perform phase
				injureButton.addEventListener("click", function(){

					//checks if cards to injure have been selected. if true, discards them
					if(injureSelectedTest) {

						injureSelected.forEach( function(elem) {
							
                            //finds card in onDeck array's mark, then get's the element of the same id to remove
							console.log("injureSelected forEach Discarding");
							let cardId = elem.mark;
							let cardIndex = gameKeeper.activePlayer.onDeck.findIndex(elem => elem.mark === cardId);
                            
                            let card = gameKeeper.activePlayer.onDeck[cardIndex];
                            console.log(card);
                            card.injure(); //takes care of moving card to discard and anything else

						})
	
                        //resets injuries to 0 after inflicting them
                        gameKeeper.activePlayer.pendingInjuries = 0;

                        document.getElementById("GameAreaWrapper").removeChild(injureContainer);

                        gameKeeper.beginPerformPhase();

					}
	
				})

                //resets injureSelected array and cards with red borders
				resetButton.addEventListener("click", function(){

					//clears injureSelected array
					if(injureSelected.length > 0) {

						injureSelected.length = 0;
					}

					//removes red borders in injure container
					if(injureContainer.querySelectorAll(".redDiscardBorder")) {

						let injureBorders = injureContainer.querySelectorAll(".redDiscardBorder");

						injureBorders.forEach(function(elem){

							elem.classList.remove("redDiscardBorder");

						})

					}
				})
            } else { //if no pendingInjuries or active performers, proceed to performance phase

                //resets injuries if player had no performers to injure
                gameKeeper.activePlayer.pendingInjuries = 0;
                
                gameKeeper.beginPerformPhase();

            }
        },

        updateTurnPhaseDisplay() {

            //remove existing button formatting
            let existingCurrent = document.querySelector('.activePlayerPhaseButton-Current');
            console.log(existingCurrent);
            existingCurrent.classList.remove('activePlayerPhaseButton-Current');

            if (gameKeeper.turnPhase !== 'End') {
                
                let existingNext = document.querySelector('.activePlayerPhaseButton-Next');
                console.log(existingNext);
                existingNext.classList.remove('activePlayerPhaseButton-Next');
            }

            //update new button formatting
            let turnPhaseIds = ['Perform', 'Play', 'Hire', 'End'];
            let turnPhaseNumber = turnPhaseIds.indexOf(gameKeeper.turnPhase);

            let currentPhase = document.getElementById(`activeTurnPhase${turnPhaseIds[turnPhaseNumber]}`);
            currentPhase.classList.add('activePlayerPhaseButton-Current');
            console.log(currentPhase);

            if ( turnPhaseNumber < 3) {
                
                let nextPhase = document.getElementById(`activeTurnPhase${turnPhaseIds[turnPhaseNumber+1]}`);
                nextPhase.classList.add('activePlayerPhaseButton-Next');
                console.log(nextPhase);
            }

            console.log(turnPhaseIds[turnPhaseNumber], turnPhaseNumber);

        },

        beginPerformPhase() {

            gameKeeper.turnPhase = 'Perform';
            gameKeeper.gameLog(`Begin ${gameKeeper.turnPhase} Phase`);
            gameKeeper.countPerf(gameKeeper.activePlayer, "activePlayerPerfCount");

            gameKeeper.updateTurnPhaseDisplay();
            // let currentPhaseButton = document.getElementById("activeTurnPhasePerform");
            // let nextPhaseButton = document.getElementById("activeTurnPhasePlay");
            // currentPhaseButton.classList.add("activePlayerPhaseButton-Current");
            // nextPhaseButton.classList.add("activePlayerPhaseButton-Next")

            artist.renderChoiceDialogue("perfRequestContainer", "Perform?", "Perform", "Pass");
            let perfRequestContainer = document.getElementById("perfRequestContainer");
            let perfButton = perfRequestContainer.querySelector(".buttonLeft");
            let passButton = perfRequestContainer.querySelector(".buttonRight");

            perfButton.addEventListener("click", gameKeeper.perform);
            passButton.addEventListener("click", gameKeeper.endPerformPhase);

            let endPhaseClick = document.getElementById("activeTurnPhasePlay");
            endPhaseClick.addEventListener("click", gameKeeper.endPerformPhase);

            //check for Phoenix in discard
            if(gameKeeper.activePlayer.discard.some(elem => elem.name === "Phoenix")) {

                //creates an indicator to player, Phoenix is present in the discard
                let discardContainer = document.getElementById("activePlayerDiscardContainer");
                let phoenixIndicator = document.createElement("p");
                phoenixIndicator.textContent = "Phoenix";
                phoenixIndicator.id = "phoenixIndicator";

                discardContainer.appendChild(phoenixIndicator);

                //grabs the first Phoenix in the discard to run it's rise method and add click listener to phoenixIndicator
                let discardedPhoenix = gameKeeper.activePlayer.discard.find(elem => elem.name === "Phoenix");
                phoenixIndicator.addEventListener("click", discardedPhoenix.rise);

                console.log("contains Phoenix");
            } else {
                console.log("no Phoenix found");
            }
        },

        endPerformPhase() {

            if(document.getElementById("perfRequestContainer")) {
                let perfRequestContainer = document.getElementById("perfRequestContainer");
                let gameAreaWrapper = document.getElementById("GameAreaWrapper");

                gameAreaWrapper.removeChild(perfRequestContainer);
            }

            let endPhaseClick = document.getElementById("activeTurnPhasePlay");
            endPhaseClick.removeEventListener("click", gameKeeper.endPerformPhase);

            //checks for and removes phoenixIndicator before beginning play Phase
            if(document.getElementById("phoenixIndicator")) {

                let phoenixIndicator = document.getElementById("phoenixIndicator");
                let discardContainer = document.getElementById("activePlayerDiscardContainer");
                discardContainer.removeChild(phoenixIndicator);

            }

            gameKeeper.beginPlayPhase();


        },

        beginPlayPhase() {

            gameKeeper.turnPhase = 'Play';
            gameKeeper.gameLog(`Begin ${gameKeeper.turnPhase} Phase`);
            gameKeeper.updateTurnPhaseDisplay();

            for(let i = 0; i < gameKeeper.activePlayer.hand.length; i++) {
                let cardMark = gameKeeper.activePlayer.hand[i].mark;
                let activeDiv = document.getElementById(cardMark);
                activeDiv.addEventListener("click", this.gKHandSelectListener);
            }

            let endPhaseClick = document.getElementById("activeTurnPhaseHire");
            endPhaseClick.addEventListener("click", gameKeeper.endPlayPhase);

        },

        endPlayPhase(){

            gameKeeper.turnPhase = 'End Play';

            for(let i = 0; i < gameKeeper.activePlayer.hand.length; i++) {
                let cardMark = gameKeeper.activePlayer.hand[i].mark;
                let activeDiv = document.getElementById(cardMark);
                activeDiv.removeEventListener("click", this.gKHandSelectListener);
            }

            let endPhaseClick = document.getElementById("activeTurnPhaseHire");
            endPhaseClick.removeEventListener("click", gameKeeper.endPlayPhase);

            //clears unused attacks when a player proceeds to hire phase
            gameKeeper.activePlayer.pendingAttacks = 0;
            gameKeeper.updateDisplayCount("activePlayerAttackCount", `Attacks: ${gameKeeper.activePlayer.pendingAttacks}`);
            //remove redFont class if present
            document.getElementById("activePlayerAttackCount").classList.remove("redFont");

            gameKeeper.addToUndoLog();
            gameKeeper.beginHirePhase();
            
        },

        beginHirePhase(){

            gameKeeper.turnPhase = 'Hire';
            gameKeeper.gameLog(`Begin ${gameKeeper.turnPhase} Phase`);
            gameKeeper.updateTurnPhaseDisplay();

            let endPhaseClick = document.getElementById("activeTurnPhaseEnd");
            endPhaseClick.addEventListener("click", gameKeeper.endHirePhase);	

            let hireSlots = document.querySelectorAll(".hireSlotWrapper");

            hireSlots.forEach(function(el) {el.addEventListener("click", gameKeeper.hire);});

        },

        endHirePhase(){

            gameKeeper.turnPhase = 'End Hire';

            let endPhaseClick = document.getElementById("activeTurnPhaseEnd");
            endPhaseClick.removeEventListener("click", gameKeeper.endHirePhase);	
        
            //clears hiredLog for next player
            gameKeeper.hiredLog = [];

            gameKeeper.addToUndoLog();
            gameKeeper.beginEndPhase();

        },

        beginEndPhase(){

            gameKeeper.turnPhase = 'End';
            gameKeeper.updateTurnPhaseDisplay();

            gameKeeper.activePlayer.clearLaborToDiscard();
            gameKeeper.activePlayer.clearHandToDiscard();
            gameKeeper.activePlayer.laborPoints = 0;
            document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints}`; //updates laborPoints display to 0
            gameKeeper.activePlayer.drawFromDeck(gameKeeper.startingHandAmount, "activePlayerDiscardCount", "activePlayerDeckCount");

            gameKeeper.endTurn();

        },

        endTurn(){

            gameKeeper.activePlayer.turns++;

            gameKeeper.activePlayer.netDrawFromDeck = gameKeeper.activePlayer.totalDrawFromDeck -gameKeeper.startingHandAmount*(gameKeeper.activePlayer.turns+1);
 
            console.log(gameKeeper);
            console.log(`Last Round: ${gameKeeper.lastRound}`);

            //If it's the last round and the last player, end the game
            if(gameKeeper.lastRound === true && gameKeeper.activePlayerIndex === gameSetup.players.length -1) {

                gameKeeper.endGame();
                
            } else {

                gameKeeper.changeActivePlayer();

                gameKeeper.addToUndoLog();
                gameKeeper.checkForInjuries();

            }


        },

        endGame() {

            console.log("endGame");

            let players = gameSetup.players;
            let playerScores = [];
            let maxScore = 0;
            let playerTie = false;
            let leaders = [];
            let winningPlayer = {};

            //gather final score from each player
            players.forEach(function(elem) {
                playerScores.push(elem.reputationPoints);

                //check for highest score or tie to find winner
                if(elem.reputationPoints > maxScore) {
                    maxScore = elem.reputationPoints
                    playerTie = false;

                    //clear winner array and add current player
                    leaders.length = 0;
                    leaders.push(elem);

                } else if(elem.reputationPoints === maxScore) {
                   
                    //notifies that a tie has occured and adds additional player to leaders array
                    playerTie = true;
                    leaders.push(elem);

                }
            });

            //check if tie has occured an perform tie-breaker
            if(playerTie) {

                console.log("player tie check");

                let perfCounts = [];
                let maxPerf = 0;
                let winnerIndex = 0;

                leaders.forEach(function(elem, index) {

                    //total performance points of remaining active performers and push to counter
                    gameKeeper.countPerf(elem);
                    perfCounts.push(elem.performancePoints);

                    //checks if total is greater than previous and documents player index
                    if(elem.performancePoints > maxPerf) {

                        maxPerf = elem.performancePoints;
                        winnerIndex = index;

                        console.log(`Winner Index: ${winnerIndex}`);

                    }

                })

                //defines player with highest remianing Perf count as winner
                winningPlayer = leaders[winnerIndex];

                //log and display winning player
                artist.renderChoiceDialogue("gameEndAnnouncement", `${winningPlayer.name} wins!`, "Play Again?", "Take a Break");
                gameKeeper.gameLog(
                    `${winningPlayer.name} wins due to tie breaker with 
                    ${winningPlayer.reputationPoints} VP and 
                    ${winningPlayer.performancePoints} active Performance Points!`);

            } else if(!playerTie) {

                console.log("no tie check");
                winningPlayer = leaders[0];

                //log and display winning player
                artist.renderChoiceDialogue("gameEndAnnouncement", `${winningPlayer.name} wins!`, "Play Again?", "Take a Break");
                gameKeeper.gameLog(`${winningPlayer.name} wins with ${winningPlayer.reputationPoints} VP!`);

            }

            //initial event listener for playAgain button to start a new game
            // let gameEndContainer = document.getElementById("gameEndAnnouncement");
            // let playAgainButton = gameEndContainer.querySelector(".buttonLeft");
            // playAgainButton.addEventListener("click", gameKeeper.start);

            console.log(gameKeeper);
            console.log(gameSetup);
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

            gameKeeper.selectedIndex = utility.getIndexByMarkValue(gameKeeper.activePlayer.hand, targetId);
            gameKeeper.selectedCard = gameKeeper.activePlayer.hand[gameKeeper.selectedIndex];

            selectedDisplay.classList.add("selected");

            if(!document.getElementById("gameAreaCoverGridBox")) {
                let gridCoverBox = document.createElement("div");
                gridCoverBox.id = "gameAreaCoverGridBox";
                gridCoverBox.addEventListener("click", gameKeeper.deselect);
                document.getElementById("GameAreaWrapper").appendChild(gridCoverBox);
            }

            //checks if selectedCard is allowed to labor and enables
            if(gameKeeper.selectedCard.enableLabor) { 
                gameKeeper.enablePlayLabor();
            }

            //checks if selectedCard is allowed ondeck and enables
            if(gameKeeper.selectedCard.enablePerf) { 
                gameKeeper.enablePlayOnDeck();
            }

            console.log("Test gameAreaCoverGridBox");
            console.log(!document.getElementById("gameAreaCoverGridBox"));

            //enables card to be discarded
            gameKeeper.enableDiscard();

            console.log(`selected index: ${gameKeeper.selectedIndex}`);
            console.log(gameKeeper.selectedCard);

        },
        
        deselect(){

            gameKeeper.addToUndoLog();
            
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

            gameKeeper.addToUndoLog();

            if(index) { //if an index is given for a specific player, show that player

                gameKeeper.activePlayerIndex = index;
                gameKeeper.activePlayer = gameSetup.players[index];

            } else { //otherwise advance to the next player's turn

                if(gameKeeper.activePlayerIndex < gameSetup.players.length - 1) {

                    gameKeeper.activePlayerIndex++;
                    gameKeeper.activePlayer = gameSetup.players[gameKeeper.activePlayerIndex];


                }else if(gameKeeper.activePlayerIndex === gameSetup.players.length -1) {

                    gameKeeper.activePlayerIndex = 0;
                    gameKeeper.activePlayer = gameSetup.players[0];

                }else {

                    console.log("changeActivePlayer - Error");

                }

            }

            artist.renderActivePlayer();
            this.createNonActivePlayerSlots();

        },

        perform() {

            let performingPlayer = gameKeeper.activePlayer;
            let ondeck = performingPlayer.onDeck;

            ondeck.forEach(element => {
                element.perform();
            });

            gameKeeper.activePlayer.totalPerformancePoints += performingPlayer.performancePoints;

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

            document.getElementById("activePlayerVPCount").innerText = `VP: ${performingPlayer.reputationPoints}`;
            performingPlayer.clearOnDeckToDiscard();
            performingPlayer.performancePoints = 0;
            document.getElementById("activePlayerPerfCount").innerText = `Perf: ${performingPlayer.performancePoints}`;

            if(gameKeeper.lastRound === false) {

                if(performingPlayer.reputationPoints === gameSetup.pointCap) {

                    gameKeeper.lastRound = true;

                    gameKeeper.gameLog(`${performingPlayer.name} has reached the point cap. This will be the last round`);

                } else if(performingPlayer.reputationPoints > gameSetup.pointCap) {

                    gameKeeper.lastRound = true;

                    gameKeeper.gameLog(`${performingPlayer.name} has exceeded the point cap! This will be the last round`);
                }
            }

            gameKeeper.addToUndoLog();
            gameKeeper.activePlayer.totalPerformances++;
            gameKeeper.endPerformPhase();

        },

        hire() {

            if(gameKeeper.turnPhase === "Hire") {

                let slotId = this.id;
                let index = slotId.slice(-1);
                let hireSlot = gameKeeper.hireSlots[index];
                let hireCost = hireSlot[0].cost;
                let mayHire = true;

                //if clicked card is in previouslyHired array, triggers boolean to prevent additional hires
                if(gameKeeper.hiredLog.some(elem => elem.name === hireSlot[0].name)) {
                    mayHire = false;
                }

                if(gameKeeper.activePlayer.laborPoints >= hireCost && mayHire) {

                    gameKeeper.activePlayer.laborPoints -= hireCost;
                    document.getElementById("activePlayerLaborCount").textContent = `Labor: ${gameKeeper.activePlayer.laborPoints.toString()}`;
                    let hireCard = hireSlot.pop();

                    gameKeeper.hiredLog.push(hireCard); //adds card to hiredLog to prevent double hiring in a turn

                    console.log(hireCard);
                    hireCard.owner = gameKeeper.activePlayer.name; 
                    gameKeeper.activePlayer.discard.push(hireCard);

                    //update displays to reflect hired card
                    document.getElementById(`hireSlot${index}Amount`).textContent = hireSlot.length;
                    gameKeeper.updateDisplayCount("activePlayerDiscardCount", gameKeeper.activePlayer.discard.length);

                    gameKeeper.gameLog(`Hired ${hireCard.name}`);
                    gameKeeper.addToUndoLog();

                } else if(gameKeeper.activePlayer.laborPoints < hireCost) {

                    let hireName = hireSlot[0].name;
                    gameKeeper.gameLog(`You need ${hireCost} Labor to hire ${hireName}`);

                } else if(!mayHire) { 

                    gameKeeper.gameLog(`You may only hire 1 of a card each turn`);

                } else {
                    console.log("gameKeeper.hire() - error");
                }
            }

        },

        //creates and fills hire slots with cards from cardCollection
        createHireSlots(cardArray) { 

            let hireSlots = cardArray;
            let hireContainer = document.getElementById("hireContainer");
            hireContainer.textContent = ""; //clears sample text before card slots are made
            let hireFragment = document.createDocumentFragment();
            let slotLength = hireSlots.length;
            let amount = hireSlots[0].length;

            //loops through hireSlots to create hire slots
            for (let i = slotLength-1; i > -1; i--) { 

                let card = hireSlots[i][0];

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

                //future provision for icon summary of card abilities
                // if(card.icon) {

                //     let miniIcon = document.createElement("img");
                //     miniIcon.classList.add("miniDisplayIcon");
                //     miniIcon.src = card.icon;
                //     divHire.appendChild(miniIcon);
                // }
        
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

        //creates and fills mini displays for nonactive players
        createNonActivePlayerSlots() {

            let activePlayer = gameKeeper.activePlayer;
            let playerCollection = gameSetup.players;
            let nonActiveContainerId = "nonActivePlayerSummaryWrapper"
            let nonActivePlayerContainer = document.getElementById(nonActiveContainerId);

            //resets nonactive container before filling it
            nonActivePlayerContainer.textContent = "";

            playerCollection.forEach(function(elem) {

                if(elem.name !== activePlayer.name) {

                    console.log(`unactive Player ${elem.name} rendered in nonActive summary`);
                    artist.renderMiniPlayerSummary(elem, nonActivePlayerContainer);

                } else if( elem.name === activePlayer.name) {

                    console.log(`active Player ${activePlayer.name} not rendered in nonActive summary`);

                }
            })


        },

        //updates given element's value to that given
        updateDisplayCount(id, value){ 

            if(isNaN(value)) {

            let displayCount = value.toString();
            document.getElementById(id).innerText = displayCount;

            } else if(!isNaN(value)) {

                document.getElementById(id).innerText = value;

            } else {

                console.log("updateDisplayCount - Error");
            
            }

            //if the discard count is updated, it updates the picture to what was just discarded
            if(id === "activePlayerDiscardCount") { 

                if(gameKeeper.activePlayer.discard.length > 0){

                    let discardImg = document.getElementById("activePlayerDiscardImg");
                    let topCard = gameKeeper.activePlayer.discard[gameKeeper.activePlayer.discard.length-1];

                    discardImg.setAttribute("src", topCard.image);

                } else {
                    document.getElementById("activePlayerDiscardImg").setAttribute("src", "");
                }

            }

        },

        //totals given player's active Performance points and updates the display
        countPerf(player, displayId) {

            let countedArray = player.onDeck;
            player.performancePoints = 0;

            countedArray.forEach( function(element){

                element.perfCount();

            })

            //if id is given to update, updates
            if(displayId) {

                document.getElementById(displayId).textContent = `Perf: ${player.performancePoints}`;

            }

        },

        //adds pending attack equal to given attack number and updates displayed attack amount
        addPendingAttack(attackNumber, name) {

            //updates attack totals based on played card
            gameKeeper.gameLog(`${name} Attacks ${attackNumber} time!`);
            gameKeeper.activePlayer.pendingAttacks += attackNumber;
            gameKeeper.activePlayer.totalAttacks += attackNumber;

            let attackCountId = "activePlayerAttackCount";
            let attackCountDisplay = document.getElementById(attackCountId);

            //updates attack display count
            gameKeeper.updateDisplayCount(attackCountId, `Attacks: ${gameKeeper.activePlayer.pendingAttacks}`);

            //changes text red if a player has pending attacks
            if(gameKeeper.activePlayer.pendingAttacks > 0) {

                attackCountDisplay.classList.add("redFont");

            }

        },

        //adds pending injury to non-active player clicked during play phase
        addInjury() {

            let targetId = this.id;
            let injuredName = targetId.slice(0, -7);

            //find index of clicked player in gameSetup array
            let injuredPlayer = gameSetup.players.find(function(elem) {
                if(elem.name === injuredName) {
                    return elem;
                }
            })

            if(gameKeeper.activePlayer.pendingAttacks > 0) {

                injuredPlayer.pendingInjuries++;
                console.log(`${injuredPlayer.name} Injuries: ${injuredPlayer.pendingInjuries}`);
                gameKeeper.activePlayer.pendingAttacks--;
                console.log(`${gameKeeper.activePlayer.name} Attacks: ${gameKeeper.activePlayer.pendingAttacks}`);

                //updates display to current pending attack amount
                let attackCountId = "activePlayerAttackCount";
                let attackCountDisplay = document.getElementById(attackCountId);
                attackCountDisplay.textContent = `Attacks: ${gameKeeper.activePlayer.pendingAttacks}`;

                //changes font color back to black if the player has no pending attacks
                if(gameKeeper.activePlayer.pendingAttacks === 0) {

                    attackCountDisplay.classList.remove("redFont");

                }

            }

        }

    }

    // var undoLog = [];

export default gameKeeper;