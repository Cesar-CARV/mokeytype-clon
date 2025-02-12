import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { IStateContext } from "../../types";
import { Word } from "../Word";
import styles from "./Editor.module.css";

export const Editor = () => {
  const { text, loading, setCurrentWords, setTyping, typing, setErrors } =
    useContext(AppContext) as IStateContext;

  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const editorTextRef = useRef<HTMLDivElement>(null);

  const [currentText, setCurrentText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const [wrong, setWrong] = useState<boolean>(false);
  const [wrongCharCoords, setWrongCharCoords] = useState<number[]>([0, 0]);
  const [charCoords, setCharCoords] = useState<number[]>([0, 0]);

  const [blur, setBlur] = useState<boolean>(true);

  const scrollEditor = () => {
    const currentLetter: HTMLElement | null = document.querySelector(
      "[data-active = true]"
    );

    // Get rects
    const letterRect = currentLetter?.getBoundingClientRect();
    const editorRect = editorRef?.current?.getBoundingClientRect();
    const textRect = editorTextRef?.current?.getBoundingClientRect();

    // Early return
    if (!letterRect || !editorRect || !textRect || !editorTextRef?.current)
      return;
    if (textRect.height <= editorRect.height) return;

    // Sroll
    if (letterRect.y > editorRect.y + editorRect.height / 2) {
      editorTextRef.current.style.transform += "translateY(-4rem)";
    }
  };

  // Write text event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value[e.target.value.length - 1];

    if (key === text[index] && (index === 0 || typing)) {
      // Restar wrong state on correct key
      if (wrong) {
        setWrong(false);
      }

      // Check pass to next word
      if (key === " " || e.target.value.length === text.length) {
        setCurrentWords((prev) => prev + 1);
        setCharCoords([charCoords[0] + 1, 0]);

        // Check if text is complet
        if (e.target.value.length === text.length) {
          // End typing
          setTyping(false);
        }
      } else {
        // Update CharCoords to move the pointer
        setCharCoords([charCoords[0], charCoords[1] + 1]);
      }

      // Add key to current text and incemente indesx
      setCurrentText((prev) => prev + key);
      setIndex((prev) => prev + 1);

      // Start typing state
      if (index !== 0) return;
      setTyping(true);
    } else {
      setWrong(true);
      setErrors((prev) => prev + 1);
      setWrongCharCoords(charCoords);
    }
  };

  // Focus Input
  const handleEditorClick = () => {
    setBlur(false);
    inputRef.current?.focus();
  };

  // Reset wrong key states
  useEffect(() => {
    if (!wrong) return;

    const timer = setTimeout(() => setWrong(false), 300);

    return () => clearTimeout(timer);
  }, [wrong]);

  // Reset states
  useEffect(() => {
    setCurrentText("");
    setWrong(false);
    setWrongCharCoords([0, 0]);
    setCharCoords([0, 0]);
    setIndex(0);
    setErrors(0);
    setCurrentWords(0);
  }, [text]);

  // Scroll Editor
  useEffect(() => {
    scrollEditor();
  }, [charCoords]);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className={styles["editor"]}
      onClick={handleEditorClick}
      ref={editorRef}
    >
      <input
        type="text"
        name=""
        id=""
        ref={inputRef}
        onChange={handleChange}
        value={currentText}
        className={styles["editor__input"]}
        onBlur={() => setBlur(true)}
        onFocus={() => setBlur(false)}
      />
      <div className={styles["editor__text"]} ref={editorTextRef}>
        {text.split(" ").map((word, i) => (
          <Word
            key={i}
            charCoords={charCoords}
            index={i}
            word={word}
            wrong={wrong}
            wrongCharCoords={wrongCharCoords}
          ></Word>
        ))}
      </div>

      <div
        className={`${styles["editor__message"]} ${
          blur
            ? styles["editor__message--open"]
            : styles["editor__message--close"]
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-hand-index-thumb-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716q.113.137.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0" />
        </svg>
        <p>Click to focus</p>
      </div>
    </div>
  );
};
