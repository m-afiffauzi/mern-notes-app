import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Note from "../image/note.png";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className="hero min-h-[500px] flex items-center justify-center">
      <div className="hero-content flex flex-col lg:flex-row items-center justify-center">
        <div>
          <img loading="lazy" src={Note} alt="Note" className="w-40 lg:w-96" />
        </div>
        <div className="max-w-md lg:max-w-2xl text-center lg:text-start">
          <h1 className="text-3xl lg:text-6xl font-bold">Notes</h1>
          <p className="py-3 lg:py-6 text-xl lg:text-4xl">
            Write your thoughts as they come to you.
          </p>
          <p className="pb-3 lg:pb-6 lg:text-xl">
            It's free, so use it as you need it.
          </p>
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
