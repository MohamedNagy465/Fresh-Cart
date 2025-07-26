import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [loading, setLoading] = useState(true);

  async function VerifyToken() {
    try {
      let{data} =  await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      localStorage.setItem("userId",data.decoded.id)
    } catch (error) {
      toast.error(error.response.data.message);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      VerifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <authContext.Provider value={{ token, setToken,VerifyToken}}>
      {children}
    </authContext.Provider>
);
}