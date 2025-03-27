import AppRouter from "@/routes/AppRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "@/store/actions/authAction";
import { AppDispatch } from "@/store";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return <AppRouter />;
}
