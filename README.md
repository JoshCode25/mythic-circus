# Mythic-Circus

This is an original deck-building card game I designed. This repo is currently set up as a two-player pass-n-play experience.

The first one to 10 VP wins!

## Basic Game Play

Players take turns sending workers in their hands on stage to get ready for a performance or to work behind the scenes to raise funds to hire more workers.

Most cards have special abilities/talents that activate when sent to a certain area. A list of those will be described below.

## Turn Structure

### 1. Perform (Optional):

Total the _Performance Points_ of all workers on stage to determine the quality of the performance. The quality determines how many points your performance is worth. See below:

    6+  TP  =>  1 VP    Mediocre
    11+ TP  =>  2 VP    Memorable
    16+ TP  =>  3 VP    Stellar
    21+ TP  =>  4 VP    Instant Classic

TP = Total Performance VP = Victory Points

All on stage workers are sent to the discard to "rest" after performing.

### 2. Send On Stage or to Labor:

Players play cards from their hands one at a time and activate the abilities/bonuses that apply.

As this is a deck building game, many of the abilities involve drawing more cards or moving cards from your discard into play or back onto your deck to benefit from their ability again.

Take note: some abilities activate when played anywhere, and some only activate when played to a specific area (On Stage only or Labor only).

**Attacking:** Some cards include "Attack (x)". This indicates how many times the card attacks when it is played.
When a card attacks, it does mischeivous things to another team's on stage workers, injurying one or more would-be performers and sending them to the discard pile.

For each **Attack** on a card, the active player chooses another player. Each _attacked_ player much choose one of their workers on stage and _injur_ it by moving it to the discard. The Attacker chooses the player to attack, and the Attackee chooses which specific worker is injured.

### 3. Hire Additional Workers:

Total the _Labor Points_ of the workers sent to labor this turn. This may be used to hire additional workers from the 10 available types.

Players may hire multiple workers in the same turn (as long as they can afford them), but they may not hire multiple of the same card in the same turn.

### 4. End Turn/Cleanup Phase:

All workers and new hires from the turn are sent to the discard pile. **On Stage workers remain until injured or after they Perform**

Any remaining cards in the active player's hand are discarded, and 5 new cards are drawn for the next turn.

If a player ever needs to draw a card, and their deck is empty, that player shuffles their discard pile to make a new deck and draws from it.

## Card Abilities:

**Mischeivous Gnome**: When sent on stage, the active player may attack one other player. Attack (1)

**Goblin**: When sent on stage, the active player may choose to discard 1 card from hand and draw 1 from their deck.

**Golem**: When sent to labor, the active player draws 1 card from their deck - may only be sent to labor.

**Mermaid**: When sent on stage, the active player may place 1 card from their discard pile on top of their deck - may only be sent on stage.

**Faun**: This worker's performance value is increased by ever other active performer. (5 total workers on stage => Faun's performance value = 4)

**Werewolf**: When sent on stage, the active player may attack one other player. Attack (1)

**Minotaur**: This card requires two attacks to be injured. These do not _refresh_ between turns.

**Fairy**: When sent on stage, the active player may choose 1 card from their discard pile, with a hire cost less than 4, and send it on stage - the card's ability may be activated (if appropriate).

**Sphinx**: When sent on stage, the active player may draw 2 cards from their deck then discard 2 cards from hand.

**Phoenix**: Before choosing to perform or pass in Phase 1 (Perform), a player may discard a card from hand to return a Phoenix from their discard into their hand.

**Unicorn**: When sent on stage, the active player chooses another player to injur all of their active unicorns.

There are several other cards to play with, but I haven't had/taken the time to build them into this repo yet.
