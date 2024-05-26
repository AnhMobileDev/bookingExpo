import { useMeUserQuery } from '../graphql/queries/meUser.generated';

export const useCurrentUser = () => {
  const { data } = useMeUserQuery();

  return data?.meUser;
};
