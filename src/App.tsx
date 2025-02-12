import { Counter } from "./components/Counter/Counter";
import { Editor } from "./components/Editor/Editor";
import { RestartTestButton } from "./components/RestartTestButton/RestartTestButton";
import { Toolbar } from "./components/Toolbar/Toolbar";
import styles from "./App.module.css";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { IStateContext } from "./types";
import { Stats } from "./components/Stats/Stats";

function App() {
  const { currentWords, typing } = useContext(AppContext) as IStateContext;

  return (
    <>
      <header className={styles["header"]}>
        <h1>Chuck Norris Typing</h1>
      </header>
      {/* MAIN */}
      <main className={styles["main"]}>
        {currentWords > 0 && !typing ? (
          <Stats></Stats>
        ) : (
          <>
            {/* TOOLBAR */}
            <section>
              <Toolbar></Toolbar>
            </section>
            {/* Editor */}
            <section className={styles["editor-container"]}>
              <div className={styles["counter-container"]}>
                <Counter></Counter>
              </div>
              <Editor></Editor>
              <div className={styles["restart-test-button-container"]}>
                <RestartTestButton></RestartTestButton>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default App;
