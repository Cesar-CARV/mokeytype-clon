import { memo } from "react";
import { ILetter } from "../../types";
import styles from "./Letter.module.css";

export const Letter = memo(({ char, shake, correct, active }: ILetter) => {
  return (
    <span
      className={`${styles["letter"]} ${
        correct ? styles["letter--correct"] : ""
      } ${shake ? styles["letter--shaking"] : ""}
      ${active && styles["letter--active"]}`}
      data-active={active}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
});
