import "./navbar.css";
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user,dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
      navigate("/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HotelsBooking.</span>
        </Link>
        {user !== null ? (
          <div className="navItems">
            <span>{user}</span>
            <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
