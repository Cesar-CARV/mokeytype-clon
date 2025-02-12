import { useContext } from "react";
import styles from "./Toolbar.module.css";
import { AppContext } from "../../context/AppContext";
import { IStateContext } from "../../types";

export const Toolbar = () => {
  const { TIMES_LIST, time, setStateTime } = useContext(
    AppContext
  ) as IStateContext;

  const handleClickTime = (time: number) => {
    setStateTime(time);
  };

  return (
    <div className={styles["toolbar"]}>
      <div className={styles["toolbar__section"]}>
        <button
          className={
            styles["toolbar__button"] + " " + styles["toolbar__button--active"]
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-clock"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 7v5l3 3" />
          </svg>
          <span>time</span>
        </button>
      </div>
      <div className={styles["toolbar__line"]}></div>
      <div className={styles["toolbar__section"]}>
        <button
          className={
            styles["toolbar__button"] +
            " " +
            (time === TIMES_LIST[0] ? styles["toolbar__button--active"] : "")
          }
          data-mode="15"
          onClick={() => handleClickTime(15)}
        >
          15
        </button>
        <button
          className={
            styles["toolbar__button"] +
            " " +
            (time === TIMES_LIST[1] ? styles["toolbar__button--active"] : "")
          }
          data-mode="30"
          onClick={() => handleClickTime(30)}
        >
          30
        </button>
        <button
          className={
            styles["toolbar__button"] +
            " " +
            (time === TIMES_LIST[2] ? styles["toolbar__button--active"] : "")
          }
          data-mode="60"
          onClick={() => handleClickTime(60)}
        >
          60
        </button>
        <button
          className={
            styles["toolbar__button"] +
            " " +
            (time === TIMES_LIST[3] ? styles["toolbar__button--active"] : "")
          }
          data-mode="120"
          onClick={() => handleClickTime(120)}
        >
          120
        </button>
      </div>
    </div>
  );
};
