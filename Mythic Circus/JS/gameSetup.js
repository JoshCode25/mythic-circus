import Player from './player.js';

const gameSetup = {

    numberOfPlayers: 2,
    players: [],
    pointCap: 7,
    cardsTrue: [
        "Goblin", "Golem", 
        "Werewolf", "Mermaid", 
        "Faun", "Minotaur",
        "Fairy", "Phoenix", 
        "Sphinx", "Unicorn"
    ],
    cardList: []
    

}

for(let i = 0; i < gameSetup.numberOfPlayers; i++) {

    let tempPlayer = new Player(`player${i+1}`);
    tempPlayer.createStartingDeck();
    tempPlayer.shuffleDrawDeck();
    gameSetup.players.push(tempPlayer);

}

export default gameSetup;