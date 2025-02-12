import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { IStateContext } from "../../types";
import styles from "./Stats.module.css";

export const Stats = () => {
  const {
    time,
    currentWords,
    errors,
    setTyping,
    setCurrentWords,
    setStateText,
  } = useContext(AppContext) as IStateContext;

  const handleClick = () => {
    setCurrentWords(0);
    setTyping(false);
    setStateText();
  };

  return (
    <div className={styles["stats"]}>
      <p className={styles["stats__wpm"]}>{`wpm: ${
        (currentWords * 60) / time
      }`}</p>
      <p className={styles["stats__errors"]}>Errors: {errors}</p>
      <button className={styles["stats__button"]} onClick={handleClick}>
        Next {">"}
      </button>
    </div>
  );
};
