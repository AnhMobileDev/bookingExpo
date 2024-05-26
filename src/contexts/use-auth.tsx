import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import { UserEntity } from '../graphql/type.interface';
import { useMeUserQuery } from '../graphql/queries/meUser.generated';
import { useLogoutMutation } from '../graphql/mutations/logout.generated';

type ContextProps = {
  isLoggedIn: boolean;
  isCheckedMe: boolean;
  user?: UserEntity;
  logout: () => Promise<void>;
  login: (data: UserEntity) => Promise<void> | void;
  updateInfoUser: (data: UserEntity) => void;
};

const AuthContext = createContext<ContextProps>({
  isLoggedIn: false,
  isCheckedMe: false,
  login() {
    throw new Error('not-ready');
  },
  logout() {
    throw new Error('not-ready');
  },
  updateInfoUser() {
    throw new Error('not-ready');
  },
});

export const useAuth = () => useContext(AuthContext);

type Props = PropsWithChildren;

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deviceId] = useState<string>();

  const [user, setUser] = useState<UserEntity>();

  // const { mutateAsync: getFirebaseDeviceToken } = useGetFirebaseDeviceTokenMutation({
  //   onSuccess: async (token) => {
  //     await AsyncStorage.setItem(DEVICE_ID, token);
  //     setDeviceId(token);
  //   },
  // });

  useEffect(() => {
    // getFirebaseDeviceToken();
  }, [deviceId]);

  const { loading, called } = useMeUserQuery({
    variables: {
      // deviceId,
    },
    onCompleted: (res) => {
      setUser(res.meUser as UserEntity);
      setIsLoggedIn(true);
    },
  });

  const login = useCallback((data: UserEntity) => {
    setUser(data);
    setIsLoggedIn(true);
  }, []);

  const updateInfoUser = useCallback((data: UserEntity) => {
    setUser(data);
  }, []);

  const client = useApolloClient();
  const [userLogout, { loading: _loggingOut }] = useLogoutMutation({
    onCompleted: async () => {
      await client.clearStore();
      localStorage.clear();
      setIsLoggedIn(false);
      setUser(undefined);
    },
  });

  const logout = useCallback(async () => {
    try {
      await userLogout({
        variables: {
          deviceId,
        },
      });
    } catch (error) {
      // Do nothing
    }
  }, [deviceId, userLogout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isCheckedMe: !loading && called, login, logout, user, updateInfoUser }}>
      {children}
    </AuthContext.Provider>
  );
};
