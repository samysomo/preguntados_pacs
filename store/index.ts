import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices/auth-slice";
import { MatchSlice, createMatchSlice } from "./slices/match-slice";
import { QuestionCategorySlice, createQuestionCategorySlice } from "./slices/question-category-slice";
import { QuestionSlice, createQuestionSlice } from "./slices/question-slice"; // Importa el slice de la pregunta

export const useAppStore = create<AuthSlice & MatchSlice & QuestionCategorySlice & QuestionSlice>()((...a) => ({
    ...createAuthSlice(...a),
    ...createMatchSlice(...a),
    ...createQuestionCategorySlice(...a),
    ...createQuestionSlice(...a), // Agrega el slice de la pregunta aquí
}));
