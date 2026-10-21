

import { useState } from 'react'
import './App.css'

// Available words to find in Hangman
const words = ['SENTENCE', 'PLAYSTATION', 'SUPERHERO', 'KEYBOARD', 'MANAGER']

// Emotions to show the progression of Hangman
function GameFace({ lives, gameWon }) {
  let face = '🙂'
  let message = 'Begin!'

  if (lives <= 4) {
    face = '😕'
    message = 'Incorret letter. Try Again.'
  }

  if (lives <= 3){
    face = '😟'
    message = 'Getting worried.'
  }

  if (lives <= 2) {
    face = '😬'
    message = 'Be careful!'
  }

  if (lives <= 1) {
    face = '😰'
    message = 'Hang in there!'
  }

  if (lives === 0) {
    face = '☹️'
    message = 'Oh no!'
  }

  if (gameWon) {
    face = '😃'
    message = 'You did it!'
  }

  return (
    <div className="game-face">
      <span className="face-emoji">{face}</span>
      <p>{message}</p>
    </div>
  )
}

// Drawing of the Hangman
function HangmanDrawing({ wrongGuesses }) {
  return (
    <svg
      className="hangman-drawing"
      viewBox="0 0 200 220"
      role="img"
      aria-label={`Hangman drawing with ${wrongGuesses} body parts`}
    >
      {/* Gallows */}
      <line x1="20" y1="205" x2="120" y2="205" />
      <line x1="50" y1="205" x2="50" y2="15" />
      <line x1="50" y1="15" x2="140" y2="15" />
      <line x1="140" y1="15" x2="140" y2="40" />

      {/* Head: first wrong guess */}
      {wrongGuesses >= 1 && (
        <circle cx="140" cy="58" r="18" />
      )}

      {/* Body: second wrong guess */}
      {wrongGuesses >= 2 && (
        <line x1="140" y1="76" x2="140" y2="130" />
      )}

      {/* Left arm: third wrong guess */}
      {wrongGuesses >= 3 && (
        <line x1="140" y1="90" x2="115" y2="112" />
      )}

      {/* Right arm: fourth wrong guess */}
      {wrongGuesses >= 4 && (
        <line x1="140" y1="90" x2="165" y2="112" />
      )}

      {/* Legs: fifth wrong guess */}
      {wrongGuesses >= 5 && (
        <>
          <line x1="140" y1="130" x2="115" y2="165" />
          <line x1="140" y1="130" x2="165" y2="165" />
        </>
      )}
    </svg>
  )
}

// Main Hangman game
function App() {
  const [word, setWord] = useState(
    () => words[Math.floor(Math.random() * words.length)]
  )

  const [guessedLetters, setGuessedLetters] = useState([])
  const [lives, setLives] = useState(5)

  const gameWon = word.split('').every((letter) =>
    guessedLetters.includes(letter)
  )

  const gameLost = lives === 0
  const gameOver = gameWon || gameLost

  // Handle a letter guess
  function guessLetter(letter) {
    if (guessedLetters.includes(letter) || gameOver) return

    setGuessedLetters((previous) => [...previous, letter])

    if (!word.includes(letter)) {
      setLives((previous) => previous - 1)
    }
  }

  // Start a new game with a different word
  function newGame() {
    let nextWord = word

    while (nextWord === word && words.length > 1) {
      nextWord = words[Math.floor(Math.random() * words.length)]
    }

    setWord(nextWord)
    setGuessedLetters([])
    setLives(5)
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <main className="game">
      <h1>Hangman</h1>

      <p className="instructions">
        Guess the word before you run out of lives!
      </p>

      {/* Hangman drawing and emotion emoji */}
      <div className="game-display">
        <div className="hangman">
          <HangmanDrawing wrongGuesses={5 - lives} />
          <p>Lives remaining: {lives}</p>
        </div>

        <GameFace lives={lives} gameWon={gameWon} />
      </div>

      {/* Hidden word */}
      <div className="word">
        {word.split('').map((letter, index) => (
          <span className="letter" key={index}>
            {guessedLetters.includes(letter) || gameLost ? letter : '_'}
          </span>
        ))}
      </div>

      {/* Letter keyboard */}
      <div className="keyboard">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => guessLetter(letter)}
            disabled={guessedLetters.includes(letter) || gameOver}
            className={
              guessedLetters.includes(letter)
                ? word.includes(letter)
                  ? 'correct'
                  : 'incorrect'
                : ''
            }
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Win or lose message */}
      {gameOver && (
        <div className="result">
          <h2>{gameWon ? 'You won!' : 'Game over!'}</h2>
          <p>The word was {word}.</p>
        </div>
      )}

      {/* Restart button */}
      <button className="new-game" onClick={newGame}>
        New Game
      </button>
    </main>
  )
}

export default App
