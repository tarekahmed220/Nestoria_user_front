

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../apis/axiosConfig";

const userInfoContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = (await axiosInstance.get("/api/v1/fur/profile")).data.user;
        setCurrentUser(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <userInfoContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userInfoContext.Provider>
  );
}

function useUserInfoContext() {
  const context = useContext(userInfoContext);
  return context;
}

export { UserProvider, useUserInfoContext };
