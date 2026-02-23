# Impostor - Game Aid

A digital game master for the social deduction party game **Impostor**.

## Purpose
This tool facilitates the game of "Impostor" (similar to *Spyfall* or *The Chameleon*). It manages player roles, assigns topics, and tracks the game state, allowing a group of friends to play without a dedicated human moderator.

Key features:
- **Local-First:** All game data is stored locally. No internet connection required after loading.
- **Persistence:** Player names are saved to your browser's Local Storage, so you don't have to re-enter them if you refresh.
- **Automated Moderation:** Assigns one "Impostor" and gives everyone else the secret "Topic".
- **"All Impostors" Mode:** A rare (1/500) event where *everyone* is the Impostor, leading to hilarious confusion.

## Quick Start

No installation or build process is required to play.

1. **Open the App:**
   Simply open `index.html` in your web browser.

   *Alternatively, if you have Python installed, you can serve it locally:*
   ```bash
   python3 -m http.server
   # Then visit http://localhost:8000
   ```

2. **Start Playing:**
   Follow the on-screen instructions to add players and begin a round.

## How to Play

1. **Setup:**
   - Add player names to the roster.
2. **Topic Selection:**
   - Tap **"Random Topic"** to let the app choose a category and subject.
   - Or tap **"Set Topic"** to manually enter a custom topic (useful if you want to play with a specific theme).
3. **Distribution:**
   - Tap **"Next"** to enter the distribution phase.
   - Pass the device to each player.
   - Each player taps their name to reveal their secret role:
     - **Civilian:** Sees the Secret Topic.
     - **Impostor:** Sees "You are the Impostor!".
4. **Game On:**
   - Once everyone has seen their role, tap **"Start"**.
   - Players take turns asking questions or giving clues to prove they know the topic (without giving it away to the Impostor).
   - The Impostor tries to blend in and guess the topic.
5. **Reveal:**
   - At the end of the round, tap **"End (Reveal All!)"** to show who the Impostor was.

## Architecture

This project is a static Single Page Application (SPA).

### Tech Stack
- **HTML5:** Structure (`index.html`).
- **CSS:** [Foundation 6](https://get.foundation/sites.html) for responsive layout and styling.
- **JavaScript:**
  - [jQuery](https://jquery.com/) for DOM manipulation.
  - [Underscore.js](https://underscorejs.org/) for utility functions.

### File Structure
- `index.html`: The main entry point. Contains all the view templates (screens) which are toggled via JavaScript.
- `js/game.js`: The core application logic. It handles the state machine (Setup -> Distribute -> Play -> Reveal) and UI interactions.
- `js/topics.js`: A JSON-like data file containing the list of topics, categories, and difficulty ratings.
- `js/` & `css/`: Dependency libraries (jQuery, Foundation, etc.).

### Development Note: Vendored Dependencies
**Important:** This project uses a "vendored" dependency strategy.
- `package.json` exists to track dependency versions for reference.
- However, the actual library files used by the app are located directly in the `js/` and `css/` directories.
- Running `npm install` **will not** update the application's runtime dependencies. You must manually copy files from `node_modules` to the respective folders if you wish to upgrade libraries.
