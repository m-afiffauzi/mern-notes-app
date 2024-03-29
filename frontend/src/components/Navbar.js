import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <div className="fixed shadow-lg z-20 flex items-center justify-center w-full navbar bg-secondary-content text-primary">
      <div className="w-full px-2 sm:px-12 max-w-[1440px] flex items-center justify-between">
        <Link to="/">
          <h1 className="text-xl xs:text-2xl font-bold hover:text-accent transition duration-300">
            Notes
          </h1>
        </Link>
        <div className="flex-none font-semibold">
          {user && (
            <div className="flex gap-2 sm:gap-8 items-center justify-center">
              <span className="text-accent text-xs xs:text-base">
                {user.email}
              </span>
              <button
                onClick={handleClick}
                className="btn w-24 text-md border-none text-red-500 hover:bg-red-500 hover:text-white rounded-full btn-sm capitalize transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="flex gap-2 sm:gap-8">
              <Link to="/signup">
                <button className="btn w-24 btn-info hover:bg-info/80 rounded-full btn-sm capitalize transition duration-300">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="btn w-24 btn-success hover:bg-success/80 rounded-full btn-sm capitalize transition duration-300">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
