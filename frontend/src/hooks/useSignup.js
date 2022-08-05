import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(false);

    const response = await fetch(`/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      // store token in localStorage
      localStorage.setItem("user", JSON.stringify(json));
    }
    // update auth context
    dispatch({ type: "LOGIN", payload: json });
    setLoading(false);
  };
  return { signup, setLoading, setError };
};
