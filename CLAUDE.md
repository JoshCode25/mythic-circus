# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mythic Circus is an original deck-building card game implemented as a browser-based two-player pass-and-play experience. Players compete to reach 10 Victory Points (VP) by sending fantasy creature workers (Gnomes, Goblins, Fauns, Phoenix, etc.) on stage to perform or to labor behind the scenes to hire more workers.

## Running the Game

This is a vanilla JavaScript application with no build step or dependencies.

- **Run locally**: Open `index.html` directly in a browser
- **No build/compile needed**: Pure HTML/CSS/JS with ES6 modules

## Code Architecture

### Entry Point & Game Flow

- **index.html**: Single-page application entry point
- **JS/MythicCircusMain.js**: Application entry - imports and starts gameKeeper
- **JS/gameKeeper.js**: Central game state manager and orchestrator (~1150 lines)
  - Manages turn phases: Perform → Play → Hire → End
  - Handles player transitions and game end conditions
  - Contains UI update logic and event handling
  - Tracks active player, turn phase, hire slots, and game log

### Core Systems

**Player Management (JS/player.js)**
- Player class with deck, discard, hand, onDeck, and laborArea arrays
- Card movement methods: `moveHandToLabor()`, `moveHandToOnDeck()`, `moveOnDeckToDiscard()`
- Deck operations: `drawFromDeck()`, `shuffleDrawDeck()`, `moveDiscardToDeck()`
- Each player starts with 7 Working Gnomes, 2 Daring Gnomes, 1 Mischievous Gnome

**Card System (JS/cards/)**
- **parentCard.js**: Base Card class with shared behavior (`playLabor()`, `playOnDeck()`, `injure()`, `perform()`)
- Individual card files for each creature type (e.g., `fairy.js`, `phoenix.js`, `minotaur.js`)
- Cards have properties: `name`, `mark` (unique ID), `owner`, `cost`, `labor`, `perf`, `ability`
- Special mechanics:
  - Minotaur requires two attacks to injure (has `injured` property)
  - Phoenix can rise from discard during Perform phase
  - Faun's performance scales with number of other performers

**Rendering (JS/artist.js)**
- All DOM manipulation centralized here
- `renderMini()`: Creates mini card displays for hand/labor/onDeck areas
- `renderFull()`: Creates full card previews with abilities
- `renderArrayMini()`: Renders arrays of cards (e.g., for injury selection)
- `renderChoiceDialogue()`: Creates decision prompts (Perform/Pass buttons)
- `renderActivePlayer()`: Updates entire active player display
- `renderMiniPlayerSummary()`: Creates opponent summary displays

**Game Setup (JS/gameSetup.js)**
- Initializes players and starting decks
- Configures `pointCap` (default: 7 VP to trigger last round)
- Defines available cards in `cardsTrue` array

**Card Collection (JS/cardCollection.js)**
- Pre-populates hire slots with multiple instances of each hireable card
- Not read in this analysis, but referenced by gameKeeper

### Turn Phase Structure

1. **Perform Phase**: Player can perform with onDeck workers or pass
   - Performance quality tiers: 6+ (Mediocre/1VP), 11+ (Memorable/2VP), 16+ (Stellar/3VP), 21+ (Instant Classic/4VP)
   - Phoenix special case: Can be returned from discard to hand before performing

2. **Play Phase**: Play cards from hand to Labor or On Stage (onDeck)
   - Cards activate abilities when played (some location-specific)
   - Attack abilities add `pendingAttacks` - player selects opponents to injure
   - Click card in hand → shows available play areas with descriptions

3. **Hire Phase**: Spend labor points to hire new workers
   - Can't hire same card twice in one turn (tracked in `hiredLog`)
   - Available hires shown with green border via `updateAvailableHireDisplay()`

4. **End Phase**: Cleanup
   - Labor and hand cards move to discard
   - Draw 5 new cards (`startingHandAmount`)
   - Deck reshuffles from discard when empty

### Key Interaction Patterns

**Card Selection Flow**:
- Player clicks card in hand → `gKHandSelectListener()` → `updateSelectedIndex()`
- Selected card stored in `gameKeeper.selectedCard` and `selectedIndex`
- UI overlays appear showing valid play destinations (`enablePlayLabor()`, `enablePlayOnDeck()`, `enableDiscard()`)
- Clicking destination or cover box triggers `deselect()` cleanup

**Injury System**:
- Attacking cards add to `activePlayer.pendingAttacks`
- Active player clicks opponent summaries to add `pendingInjuries` to target player
- At turn start, `checkForInjuries()` forces injury resolution before Perform phase
- Special case: Minotaur needs two injuries to actually discard

**Display Updates**:
- Count updates flow through `gameKeeper.updateDisplayCount(id, value)`
- Discard image auto-updates to most recently discarded card
- Performance count recalculated via `countPerf()` which calls `perfCount()` on each onDeck card

### Utility Modules

**JS/utility.js**: Helper functions (not read, but referenced)
- `getIndexByMarkValue()`: Find card index by unique mark ID
- `getIndexByNameValue()`: Find player index by name

### Game End Conditions

- When a player reaches/exceeds `pointCap`, `lastRound` flag set
- After last player's turn in last round, `endGame()` called
- Tie-breaker: Player with most active performance points on stage wins

## Development Notes

### State Management Pattern
- gameKeeper is a singleton object holding all game state
- Player objects hold their own arrays and stats
- Card objects track their own usage statistics (`totalLabored`, `totalPerfed`, etc.)

### Event Handling
- Event listeners dynamically added/removed based on turn phase
- Click listeners on phase buttons navigate between phases
- Card selection uses class-based CSS highlighting (`.selected`, `.cursorHover`)

### CSS Organization
Styles split across multiple files:
- `card-display-full.css`, `card-display-hire.css`, `card-display-mini.css`
- `grid-layout.css`: Main game area layout
- `player-display-active.css`, `request-container.css`

### Data Flow
Player actions → gameKeeper methods → artist rendering → DOM updates → gameKeeper state updates
