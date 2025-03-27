import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      {isAuthenticated ? (
        <div className="flex gap-4">
          <span>{user?.name}</span>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}
