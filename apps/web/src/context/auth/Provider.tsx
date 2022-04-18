import { createContext, FC, useReducer } from "react";
import { AuthenticationKeys } from "../../constants/auth";
import { reducer } from "./reducer";
import { AuthDispatch, AuthState, AuthProviderProps } from "./types";

export const AuthStateContext = createContext<AuthState | undefined>(undefined);
export const AuthDispatchContext = createContext<AuthDispatch | undefined>(
  undefined
);

export const AuthProvider: FC<AuthProviderProps> = ({
  initialState,
  children,
}) => {
  const authToken = localStorage.getItem(AuthenticationKeys.TOKEN);

  const initState: AuthState = initialState ?? {
    authenticated: Boolean(authToken),
    token: authToken,
    userName: "",
  };

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
