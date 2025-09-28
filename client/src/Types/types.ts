export interface I_Results {
  result: string | undefined;
  loading: boolean;
}

export interface I_setResultType {
  setResult: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}
export interface I_AnswerType {
  geminiAnswer: string;
}
