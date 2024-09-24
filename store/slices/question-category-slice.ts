import { StateCreator } from "zustand";

export interface QuestionCategorySlice {
    category: string | null;
    setCategory: (category: string) => void;
}

export const createQuestionCategorySlice: StateCreator<QuestionCategorySlice> = (set) => ({
    category: null,
    setCategory: (category) => set({ category }),
});
