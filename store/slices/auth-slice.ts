import { StateCreator } from "zustand";

export interface AuthSlice {
    userInfo: any | undefined;
    setUserInfo: (userInfo: any) => void;
}

export const createAuthSlice : StateCreator<AuthSlice> = (set) => (
    {
        userInfo: undefined,
        setUserInfo: (userInfo) => set({userInfo})
    }
)