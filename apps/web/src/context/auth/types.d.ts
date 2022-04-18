import { ReactNode } from "react";

export interface AuthState {
    authenticated: boolean;
    token: string | null;
    userName: string;
}

export interface AuthProviderProps {
    initialState?: AuthState;
    children?: ReactNode;
}

interface Login {
    type: "LOGIN";
    token: string;
}

interface Logout {
    type: "LOGOUT";
}

export type AuthAction = Login | Logout;
export type AuthDispatch = (action: AuthAction) => void;
