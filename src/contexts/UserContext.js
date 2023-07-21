import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../utils/localStorage";
import { LOCAL_KEYS } from "../constants/localKeys";
import { loginInit } from "../redux/actions/authActions";

export const UserContext = createContext({ user: null });

export const UserProvider = ({ children }) => {
  const { user } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        const localUser = getItem(LOCAL_KEYS.auth);
        if (localUser) {
          dispatch(
            loginInit({
              user: localUser,
              isAuthenticated: true,
            })
          );
        } else {
          dispatch(
            loginInit({
              user: null,
              isAuthenticated: false,
            })
          );
        }
      } catch (error) {}
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
