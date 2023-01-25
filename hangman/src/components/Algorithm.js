import React, { useState, useEffect } from 'react';
import './Algorithm.css';
const words = ['javascript', 'python', 'java', 'can', 'cause'];

const Algorithm = () => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [misses, setMisses] = useState([]);
  const [displayWord, setDisplayWord] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const maxGuesses = 6;

  useEffect(() => {
    setRandomWord(words[Math.floor(Math.random() * words.length)])
    setDisplayWord(randomWord.replace(/[a-zA-Z]/g, "_"))
  }, [])

  const handleGuess = (e) => {
    e.preventDefault();
    const letter = e.target.elements.letter.value;
    // check if the letter is already guessed
    if (guessedLetters.includes(letter) || !/^[a-zA-Z]+$/.test(letter)) {
      alert(`You already guessed "${letter}" or entered a wrong input, try another letter`);
      return;
    }
    // add the letter to the guessedLetters array
    setGuessedLetters([...guessedLetters, letter]);
    // check if the letter is in the word
    if (randomWord.includes(letter)) {
      let newDisplayWord = '';
      for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === letter) {
          newDisplayWord += letter;
        } else if (guessedLetters.includes(randomWord[i])) {
          newDisplayWord += randomWord[i];
        } else {
          newDisplayWord += '_';
        }
      }
      setDisplayWord(newDisplayWord);
    } else {
      setMisses([...misses, letter]);
    }
    e.target.elements.letter.value = "";
  };

  const handleReset = () => {
    setGuessedLetters([]);
    setMisses([]);
    setRandomWord(words[Math.floor(Math.random() * words.length)])
    setDisplayWord(randomWord.replace(/[a-zA-Z]/g, "_"));
  };

  if (misses.length === maxGuesses) {
    return <div className='result'>You Lost! The word was: {randomWord} <button onClick={handleReset}>Play Again</button> </div>;
  }
  if (displayWord === randomWord) {
    return <div className='result'>You Won! The word was: {randomWord} <button onClick={handleReset}>Play Again</button> </div>;
  }

  return (
    <div>
      <div className='word'>Word: {displayWord}</div>
      <div className='misses'>Misses: {misses.join(" ")}</div>
      <form className='guess-form' onSubmit={handleGuess}>
        <label>
          Guess:
          <input type="text" name="letter" maxLength={1} />
        </label>
        <button type="submit">Guess</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
  };
  export default Algorithm;
