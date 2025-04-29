import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { IStateContext } from "../../types";
import styles from "./Counter.module.css";

export const Counter = () => {
  const { time, typing, setTyping, text } = useContext(AppContext) as IStateContext;

  const [currentTime, setCurrentTime] = useState<number>(time);

  useEffect(() => {
    // timer
    const timer = setInterval(() => {
      setCurrentTime((prev) => prev - 1);
    }, 1000);

    // clear interval
    if (!typing) {
      clearInterval(timer);
      setCurrentTime(0);
    }

    return () => clearInterval(timer);
  }, [typing]);

  useEffect(() => {
    if (currentTime <= 0) {
      setTyping(false);

      // Rest time
      setCurrentTime(time);
    }
  }, [currentTime, text]);

  useEffect(() => {
    setCurrentTime(time);
  }, [time]);

  return (
    <>
      <span className={styles["counter"]}>{currentTime}</span>
    </>
  );
};
