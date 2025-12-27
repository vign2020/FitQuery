export interface I_Results {
  result: string | null;
  loading: boolean;
}

export interface I_setResultType {
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}
export interface I_AnswerType {
  geminiAnswer: string;
}
