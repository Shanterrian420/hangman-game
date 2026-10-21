# React + Vite + Docker

# Hangman Game

## Overview
A Hangman game built with React and Vite. The game allows players to guess letters to reveal a hidden word before running out of lives. It can also be run using Docker.

## Features
- Random word selection
- Letter guessing
- Displays guessed letters
- Tracks remaining lives
- Displays win and loss messages
- New Game button
- Hangman drawing that changes as lives are lost
- Docker support

## Technologies
- React
- JavaScript
- Vite
- CSS
- Docker

## How to Play
1. Start a new game.
2. Select letters to guess the hidden word.
3. Correct guesses reveal letters in the word.
4. Incorrect guesses reduce your remaining lives.
5. Reveal the entire word to win, or run out of lives and lose.
6. Select **New Game** to play again.

## Run Locally
Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Run with Docker
Build and start the container:

```bash
docker compose up --build
```

Open the game at [http://localhost:3000](http://localhost:3000).

To stop the container, press `Ctrl + C` in the terminal, or run:

```bash
docker compose down
```
