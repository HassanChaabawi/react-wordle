import React from "react";

const Keyboard: React.FC = () => {
  const alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
  return (
    <div className="keyboardBase">
      {alphabet.map(
        (letter: string): JSX.Element => (
          <div className="key" id={letter}>
            {letter}
          </div>
        )
      )}
    </div>
  );
};

export default Keyboard;
