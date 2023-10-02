import { useAuthContext } from "../../providers/Authentification.providers";

export const useLoginMethod = () => {
  const authContext = useAuthContext();

  return authContext?.loginMethod;
};
