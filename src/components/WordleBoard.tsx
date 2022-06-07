import React, { useEffect, useState } from "react";
import Keyboard from "src/components/Keyboard";
import WordleInput from "src/components/WordleInput";

const WordleBoard: React.FC = (): JSX.Element => {
  const [guesses, setGuesses] = useState<string[]>([...Array(6)]);
  const [solution, setSolution] = useState<string>("");
  const [usableWords, setUsableWords] = useState<string[]>([]);

  useEffect((): void => {
    let words: string[] = require("an-array-of-english-words");
    let fiveLetterWords: string[] = words.filter(
      (word: string) => word.length === 5
    );
    setUsableWords(fiveLetterWords);
    let randomNumber: number = Math.floor(
      Math.random() * fiveLetterWords.length
    );
    setSolution(fiveLetterWords[randomNumber]);
  }, []);
  
  useEffect((): void => {
    let hasWon: boolean =
      guesses.filter((guess: string) => guess === solution).length > 0
        ? true
        : false;
    let realGuesses: string[] = guesses.filter(
      (guess: string) => guess && guess
    );
    if (hasWon) {
      alert("Congrats.");
      window.location.reload();
    } else if (realGuesses.length >= 6) {
      alert("Loser.");
      window.location.reload();
    }
  }, [guesses, solution]);
  return (
    <div>
      {guesses.map(
        (guess: string, i: number): JSX.Element => (
          <WordleInput
            solution={solution}
            setGuesses={setGuesses}
            guesses={guesses}
            index={i}
            usableWords={usableWords}
            key={i}
          />
        )
      )}
      <Keyboard />
    </div>
  );
};
export default WordleBoard;
