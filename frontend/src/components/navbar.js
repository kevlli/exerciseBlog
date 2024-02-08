import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/"> Home</Link>
      <Link to="/create-exercise"> Create Exercise</Link>
      <Link to="/saved-exercises"> Saved Exercises</Link>
      <Link to="/auth"> Login / Register</Link>
    </div>
  );
};
