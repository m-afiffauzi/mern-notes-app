import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // store token in localStorage
      localStorage.setItem("user", JSON.stringify(json));
      // update auth context
      dispatch({ type: "LOGIN", payload: json });
      toast.success("Login success");
      setLoading(false);
    }
  };
  return { login, loading, error };
};
