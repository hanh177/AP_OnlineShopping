import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layouts";
import AuthLayout from "@/components/layouts/Auth";
import PrivateRoute from "./PrivateRoute";

// Lazy load
const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
        <Routes>
          {/* Private Route */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Auth Route */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Public Route */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
