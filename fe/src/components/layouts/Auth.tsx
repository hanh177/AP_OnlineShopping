import { Outlet } from "react-router-dom";

export default function AuthLayout({}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
