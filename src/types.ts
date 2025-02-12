export interface IApiResponse {
  categories: string[];
  created_at: `${string}-${string}-${string} ${string}:${string}:${string}.${string}`;
  icon_url: string;
  id: string;
  updated_at: `${string}-${string}-${string} ${string}:${string}:${string}.${string}`;
  url: string;
  value: string;
}

export interface IStateContext {
  TIMES_LIST: number[];
  time: number;
  currentWords: number;
  errors: number;
  text: string;
  loading: boolean;
  typing: boolean;
  setStateTime: (time: number ) => void;
  setStateText: () => void;
  setCurrentWords: React.Dispatch<React.SetStateAction<number>>;
  setErrors: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IContextProviderProps {
  children: React.ReactNode;
}

export interface ILetter {
  char: string;
  active: boolean;
  shake: boolean;
  correct: boolean;
}

export interface IWord {
  index: number;
  word: string;
  charCoords: number[];
  wrong: boolean;
  wrongCharCoords: number[];
}