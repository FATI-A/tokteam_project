import { createContext, useContext } from "react";

export const AuthContext = createContext({
	user: undefined,
	setUser: () => {},
	session:undefined,
	setSession:()=>{}
});

export const useAuthContext = () => useContext(AuthContext);
