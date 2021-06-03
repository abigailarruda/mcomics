import React, { createContext, ReactNode, useEffect, useState } from "react";

import { toast } from "react-toastify";

import UserController from "../controllers/UserController";

import User from "../models/User";

import history from "../routes/history.js";

interface UserContextData {
  user: User | null;
  isUserLogged: boolean;
  signUpStatus: number;
  logOut(): void;
  createNewUser(
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<unknown>;
  authUser(email: string, password: string): Promise<unknown>;
  setImage(id: string, image: string): void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const [signUpStatus, setSignUpStatus] = useState(0);

  function handleUserLogged() {
    const activeToken = localStorage.getItem("token");

    if (!activeToken) {
      setIsUserLogged(false);

      return false;
    }

    const storageToken = JSON.parse(activeToken);
    const now = new Date();

    if (now.getTime() > storageToken.time) {
      localStorage.removeItem("token");

      setIsUserLogged(false);

      return false;
    }

    setIsUserLogged(true);

    return true;
  }

  async function createNewUser(
    email: string,
    password: string,
    passwordConfirmation: string
  ) {
    try {
      const userResponse = UserController.createNewUser(
        email,
        password,
        passwordConfirmation
      );
      const { status, data } = await userResponse;

      if (status === 200) {
        setSignUpStatus(200);
        setUser(new User(data.usuarioToken.id, data.usuarioToken.email));

        const nowTime = new Date();

        const userToken = {
          token: data.accessToken,
          time: nowTime.getTime() + data.expiresIn * 1000,
        };

        localStorage.setItem("token", JSON.stringify(userToken));
        localStorage.setItem(
          "user",
          JSON.stringify(
            new User(data.usuarioToken.id, data.usuarioToken.email)
          )
        );
      }
    } catch (err) {
      const errors = err.response.data.errors;
      for (let error in errors) {
        for (let i = 0; i < error.length; i++) {
          toast(errors[error][i], {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        }
      }
    }
  }

  async function authUser(email: string, password: string) {
    try {
      const userResponse = UserController.authUser(email, password);

      const { status, data } = await userResponse;

      if (status === 200) {
        setSignUpStatus(200);
        setUser(
          new User(
            data.usuarioToken.id,
            data.usuarioToken.email,
            data.usuarioToken.url
          )
        );

        const nowTime = new Date();

        const userToken = {
          token: data.accessToken,
          time: nowTime.getTime() + data.expiresIn * 1000,
        };

        localStorage.setItem("token", JSON.stringify(userToken));
        localStorage.setItem(
          "user",
          JSON.stringify(
            new User(
              data.usuarioToken.id,
              data.usuarioToken.email,
              data.usuarioToken.url
            )
          )
        );
      }

      handleUserLogged();

      if (localStorage.getItem("token")) {
        history.push("/");

        // eslint-disable-next-line
        //location.reload();
      }
    } catch (err) {
      for (let i = 0; i < err.response.data.errors.Mensagens.length; i++) {
        toast(err.response.data.errors.Mensagens[i], {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    }
  }

  async function setImage(id: string, image: string) {
    const response = await UserController.setUserImage(id, image);
    if (response.status === 200) {
      user?.setImage(image);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  function logOut() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setIsUserLogged(false);
  }

  useEffect(() => {
    handleUserLogged();
    // eslint-disable-next-line

    //localStorage.setItem("user", JSON.stringify(user));
  }, [isUserLogged, user]);

  return (
    <UserContext.Provider
      value={{
        user,
        signUpStatus,
        isUserLogged,
        setImage,
        createNewUser,
        authUser,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
