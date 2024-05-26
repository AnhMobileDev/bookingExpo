import { useCurrentUser } from './use-current-user';

export const useAuthenticated = () => {
  const user = useCurrentUser();

  return user != null;
};
