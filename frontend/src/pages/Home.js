import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className="hero min-h-[500px] flex items-center justify-center">
      <div className="hero-content text-center">
        <div className="max-w-md lg:max-w-2xl">
          <h1 className="text-6xl font-bold">Notes</h1>
          <p className="py-6 text-4xl">
            Write your thoughts as they come to you.
          </p>
          <p className="pb-6 text-xl">It's free, so use it as your wish...</p>
          <Link to="/dashboard">
            <button className="btn btn-primary rounded-full">
              {user ? "Dashboard" : "Get Started"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
