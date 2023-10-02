import { useAuthContext } from "../../providers/Authentification.providers";

export const useIsLoggedIn = () => {
  const authContext = useAuthContext();

  return authContext?.account !== undefined;
};
