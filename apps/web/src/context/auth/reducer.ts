import { AuthenticationKeys } from "../../constants/auth";
import { AuthAction, AuthState } from "./types";

const cases: Record<AuthAction["type"], Function> = {
    LOGIN: (state: AuthState, token: string) => {
        localStorage.setItem(AuthenticationKeys.TOKEN, token);

        return {
            ...state,
            authenticated: true,
        };
    },
    LOGOUT: (state: AuthState) => {
        localStorage.removeItem(AuthenticationKeys.TOKEN);

        return {
            ...state,
            authenticated: false,
        };
    },
};

export const reducer = (state: AuthState, action: AuthAction): AuthState => {
    const { type, ...payload } = action;

    if (!Object.prototype.hasOwnProperty.call(cases, type)) {
        throw new Error(`Unhandled action type: ${type}`);
    }

    return cases[type](state, ...Object.values(payload));
};
