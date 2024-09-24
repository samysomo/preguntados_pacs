import { StateCreator } from "zustand";

export interface QuestionSlice {
    questionData: any | undefined;
    setQuestionData: (questionData: any) => void;
}

export const createQuestionSlice: StateCreator<QuestionSlice> = (set) => ({
    questionData: undefined,
    setQuestionData: (questionData) => set({ questionData })
});
