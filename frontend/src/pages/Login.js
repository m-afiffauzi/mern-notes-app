import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="w-full min-h-[500px] md:min-h-[650px] flex justify-center items-center">
      <div className="card w-96 bg-base-100 text-primary-content shadow-xl">
        <form
          className="card-body items-center text-center text-success-content"
          onSubmit={handleSubmit}
        >
          <h3 className="text-3xl font-semibold text-primary">Login</h3>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-base">Username</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="admin@example.com"
              className="input input-bordered bg-accent w-full max-w-xs rounded-full"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="********"
              className="input input-bordered bg-accent w-full max-w-xs rounded-full"
            />
          </div>
          <div className="mt-2">
            {error && (
              <div className="mb-4 text-red-500 bg-error px-4 py-2 rounded-full">
                {error}
              </div>
            )}
            <button
              className={`${
                loading ? "btn-disabled" : ""
              } btn btn-md w-40 btn-success rounded-full`}
            >
              Login
            </button>
            <p className="mt-2">
              Not have account?{" "}
              <Link to="/signup" className="text-cyan-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
