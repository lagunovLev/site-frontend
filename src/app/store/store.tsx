import { create } from 'zustand'
import {persist} from "zustand/middleware";

export type State = {
    token: "",
    user_id: ""
}

export type Actions = {
    login: (token: string, user_id: string) => void,
    register: (token: string, user_id: string) => void,
    exit: () => void,
}

export const useStore = create<State & Actions>()(
    persist(
        set => ({
            token: "",

            login: (token: string, user_id: string) => set((state) => ({ token: token, user_id: user_id })),
            register: (token: string, user_id: string) => set((state) => ({ token: token, user_id: user_id })),
            exit: () => set((state) => ({ token: "" })),
        }),
        { name: "storage", skipHydration: true }
    )
)