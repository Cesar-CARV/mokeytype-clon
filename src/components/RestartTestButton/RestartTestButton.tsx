import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { IStateContext } from "../../types";
import styles from "./RestartTestButton.module.css";

export const RestartTestButton = () => {
  const { setStateText, loading } = useContext(AppContext) as IStateContext;

  const handleClick = () => {
    if (loading) return;
    setStateText();
  };

  return (
    <button onClick={handleClick} className={styles.btn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-arrow-counterclockwise"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
        />
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
      </svg>
      <span>Restart Test</span>
    </button>
  );
}
