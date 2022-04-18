import { useContext } from "react";
import {
    AuthDispatchContext,
    AuthStateContext,
} from "../context/auth/Provider";
import { AuthDispatch, AuthState } from "../context/auth/types";

export const useAuthState = (): AuthState => {
    const context = useContext(AuthStateContext);

    if (!context) {
        throw new Error(`useAuthState must be used within a AuthProvider`);
    }

    return context;
};

export const useAuthDispatch = (): AuthDispatch => {
    const context = useContext(AuthDispatchContext);

    if (!context) {
        throw new Error(`useAuthDispatch must be used within a AuthProvider`);
    }

    return context;
};
