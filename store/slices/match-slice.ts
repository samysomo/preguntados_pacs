import { StateCreator } from "zustand";

export interface MatchSlice {
    matchId: string | null;
    matchData: any | null; // Cambia el tipo según tu estructura de datos
    setMatchId: (id: string) => void;
    setMatchData: (data: any) => void;
}

export const createMatchSlice: StateCreator<MatchSlice> = (set) => ({
    matchId: null,
    matchData: null,
    setMatchId: (id) => set({ matchId: id }),
    setMatchData: (data) => set({ matchData: data }),
});
