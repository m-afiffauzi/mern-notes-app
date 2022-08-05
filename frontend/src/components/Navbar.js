import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Notes</h1>
        </Link>
        <nav>
          <Link to="/signup">
            <p>Signup</p>
          </Link>
          <Link to="/login">
            <p>Login</p>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
