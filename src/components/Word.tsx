import { Letter } from "./Letter/Letter";
import { IWord } from "../types";

export const Word = ({
  index,
  word,
  charCoords,
  wrong,
  wrongCharCoords,
}: IWord) => {
  return (
    <p style={{ textWrap: "nowrap", display: "inline-block" }}>
      {`${word} `.split("").map((char, i) => {
        const shake =
          wrong && index === wrongCharCoords[0] && i === wrongCharCoords[1];
        const correct =
          index < charCoords[0] ||
          (index === charCoords[0] && i < charCoords[1]);
        const active = index === charCoords[0] && i == charCoords[1];

        return (
          <Letter
            key={char + i.toString()}
            char={char}
            shake={shake}
            correct={correct}
            active={active}
          ></Letter>
        );
      })}
    </p>
  );
};
