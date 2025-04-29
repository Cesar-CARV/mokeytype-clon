import { createContext, useEffect, useState } from "react";
import type {
  IApiResponse,
  IContextProviderProps,
  IStateContext,
} from "../types";

// Crea el contexto
const AppContext = createContext<IStateContext | null>(null);

// Crea el proveedor del contexto
const AppProvider = ({ children }: IContextProviderProps) => {
  const TIMES_LIST = [15, 30, 60, 120];
  const [time, setTime] = useState<number>(TIMES_LIST[1]);
  const [currentWords, setCurrentWords] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [typing, setTyping] = useState<boolean>(false);

  const setStateTime = (newTime: number) => {
    if (TIMES_LIST.includes(newTime)) setTime(newTime);
    else setTime(TIMES_LIST[1]);
  };

  const setStateText = async () => {
    setLoading(true);
    try {
      const req = await fetch("https://api.chucknorris.io/jokes/random");
      const res: IApiResponse = await req.json();
      if (req.ok) {
        setLoading(false);
        setText(res.value);
        setTyping(false);
      }
    } catch (error) {
      console.error(error);
      setText("Error on fetch api");
    }
  };

  useEffect(() => {
    setStateText();
  }, []);

  useEffect(() => {
    setStateText();
    setTyping(false);
  }, [time]);

  return (
    <AppContext.Provider
      value={{
        TIMES_LIST,
        time,
        setStateTime,
        currentWords,
        setCurrentWords,
        text,
        setStateText,
        loading,
        setLoading,
        typing,
        setTyping,
        errors,
        setErrors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
