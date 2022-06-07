import React, { useState } from "react";

interface Props {
  setGuesses: (guesses: string[]) => void;
  guesses: string[];
  index: number;
  usableWords: string[];
  solution: string;
}

const WordleInput: React.FC<Props> = ({
  setGuesses,
  guesses,
  solution,
  usableWords,
  index,
}: Props): JSX.Element => {
  const [currentGuess, setCurrentGuess] = useState<string[]>([...Array(5)]);
  const handleSubmit = (): void => {
    let word: string = currentGuess.join("");
    if (usableWords.includes(word) && !guesses.includes(word)) {
      currentGuess.map((letter: string, i: number) => {
        let input: HTMLElement | null = document.getElementById(`${i}${index}`);
        let letterElement: HTMLElement | null = document.getElementById(letter);
        if (letter == solution[i]) {
          if (input) input.style.backgroundColor = "green";
          if (letterElement) letterElement.style.backgroundColor = "green";
        } else if (solution.includes(letter)) {
          if (input) input.style.backgroundColor = "yellow";
          if (letterElement) letterElement.style.backgroundColor = "yellow";
        } else {
          if (input) input.style.backgroundColor = "gray";
          if (letterElement) letterElement.style.backgroundColor = "gray";
        }
      });
      let newGuesses: string[] = [...guesses];
      newGuesses[index] = word;
      setGuesses(newGuesses);
    } else {
      alert("Not a word.");
    }
  };

  const autoTab = (inputIndex: number, formIndex: number): void => {
    document.getElementById(`${inputIndex}${formIndex}`)?.focus();
  };

  const handleKeyUp = (e: React.KeyboardEvent, i: number): void => {
    let isCurrentGuessFull: boolean =
    currentGuess.filter((letter: string) => letter && letter).length === 5;
    if (e.key === "Backspace") {
      let inputIndex: number = i - 1 >= 0 ? i - 1 : i;
      autoTab(inputIndex, index);
    } else if (i === 4 && e.key === "Enter" && isCurrentGuessFull) {
      handleSubmit();
      autoTab(0, index + 1);
    } else {
      autoTab(i + 1, index);
    }
  };
  return (
    <div>
      {currentGuess.map(
        (letter: string, i: number): JSX.Element => (
          <input
            key={i}
            id={`${i}${index}`}
            type="text"
            value={currentGuess[i]}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>): void => {
              let currentGuessCopy = currentGuess;
              currentGuessCopy[i] = value;
              setCurrentGuess(currentGuessCopy);
            }}
            onKeyUp={(e: React.KeyboardEvent): void => handleKeyUp(e, i)}
            maxLength={1}
            minLength={1}
            required
          />
        )
      )}
    </div>
  );
};
export default WordleInput;
