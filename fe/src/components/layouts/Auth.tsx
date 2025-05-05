import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AuthLayout({}) {
  const user = useSelector((state: RootState) => state.auth.user);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
