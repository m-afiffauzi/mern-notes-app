import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";
import { useNoteStore } from "../store/noteStore";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const setNotes = useNoteStore((state) => state.setNotes);

  const logout = () => {
    // remove user token
    localStorage.removeItem("user");

    // dispatch logout
    dispatch({ type: "LOGOUT" });
    setNotes(null);
    toast.success("Logged out");
  };
  return { logout };
};
