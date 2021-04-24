import gameSetup from './gameSetup.js';

import Goblin from './cards/goblin.js';
import Golem from './cards/golem.js';
import Werewolf from './cards/werewolf.js';
import Mermaid from './cards/mermaid.js';
import Faun from './cards/faun.js';
import Minotaur from './cards/minotaur.js';
import Fairy from './cards/fairy.js';
import Phoenix from './cards/phoenix.js';
import Sphinx from './cards/sphinx.js';
import Unicorn from './cards/unicorn.js';

var cardCollection = [];
let cardsTrue = gameSetup.cardsTrue;
let collectionIndex = 0;
let listOwner = "CardList";
let cardList = gameSetup.cardList;

//have max number of available cards be 10
let cardCount = Math.min(gameSetup.numberOfPlayers*3-1, 10);

if(cardsTrue.includes("Goblin")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Goblin("Goblin", `goblin${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Goblin("Goblin", "ListGoblin", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Golem")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Golem("Golem", `golem${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Golem("Golem", "ListGolem", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Werewolf")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Werewolf("Werewolf", `werewolf${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Werewolf("Werewolf", "ListWerewolf", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Mermaid")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Mermaid("Mermaid", `mermaid${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Mermaid("Mermaid", "ListMermaid", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Faun")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Faun("Faun", `faun${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Faun("Faun", "ListFaun", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Minotaur")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Minotaur("Minotaur", `minotaur${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Minotaur("Minotaur", "ListMinotaur", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Fairy")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Fairy("Fairy", `fairy${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Fairy("Fairy", "ListFairy", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Phoenix")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Phoenix("Phoenix", `phoenix${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Phoenix("Phoenix", "ListPhoenix", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Sphinx")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Sphinx("Sphinx", `sphinx${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Sphinx("Sphinx", "ListSphinx", listOwner);
    cardList.push(listCard);

}

if(cardsTrue.includes("Unicorn")) {
    let tempArray = [];
    for(let i = 0; i < cardCount; i++) {

        let card = new Unicorn("Unicorn", `unicorn${i}`, `hireSlot${collectionIndex}`);
        tempArray.push(card);
    }
    cardCollection.push(tempArray);
    collectionIndex++;

    let listCard = new Unicorn("Unicorn", "ListUnicorn", listOwner);
    cardList.push(listCard);

}

console.log(cardCollection);
export default cardCollection;