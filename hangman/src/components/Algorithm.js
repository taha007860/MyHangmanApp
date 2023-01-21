import React, { useState } from 'react';

const words = ['javascript', 'python', 'java', 'c++', 'c#'];

const Algorithm = () => {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const maxGuesses = 6;
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [misses, setMisses] = useState([]);
  const [displayWord, setDisplayWord] = useState(randomWord.replace(/[a-zA-Z]/g, "_"));

  const handleGuess = (e) => {
    e.preventDefault();
    const letter = e.target.elements.letter.value;
    // check if the letter is already guessed
    if (guessedLetters.includes(letter)) {
      alert(`You already guessed "${letter}", try another letter`);
      return;
    }
    // add the letter to the guessedLetters array
    setGuessedLetters([...guessedLetters, letter]);
    // check if the letter is in the word
    if (randomWord.includes(letter)) {
      setDisplayWord(
        displayWord.split("").map((char, i) => (randomWord[i] === letter ? letter : char)).join("")
      );
    } else {
      setMisses([...misses, letter]);
    }
    e.target.elements.letter.value = "";
  };

  if (misses.length === maxGuesses) {
    return <div>You Lost! The word was: {randomWord}</div>;
  }
  if (displayWord === randomWord) {
    return <div>You Won! The word was: {randomWord}</div>;
  }

  return (
    <div>
      <div>Word: {displayWord}</div>
      <div>Misses: {misses.join(" ")}</div>
      <form onSubmit={handleGuess}>
        <label>
          Guess:
          <input type="text" name="letter" maxLength={1} />
        </label>
        <button type="submit">Guess</button>
      </form>
    </div>
  );
  }
  export default Algorithm;