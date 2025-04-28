import { AppDispatch, RootState } from "@/store";
import { logout } from "@/store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
   const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login");
  };
  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      {isAuthenticated ? (
        <div className="flex gap-4">
          <span>{user?.name}</span>
          <button className="cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
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
