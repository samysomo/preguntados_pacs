import { StateCreator } from "zustand";

export interface QuestionCategorySlice {
    category: string | null;
    isFinalQuestion: boolean; // Nueva propiedad para indicar si es una pregunta decisiva
    setCategory: (category: string, isFinalQuestion: boolean) => void;
}

export const createQuestionCategorySlice: StateCreator<QuestionCategorySlice> = (set) => ({
    category: null,
    isFinalQuestion: false, // Inicializamos la propiedad como falsa
    setCategory: (category, isFinalQuestion) => set({ category, isFinalQuestion }),
});
