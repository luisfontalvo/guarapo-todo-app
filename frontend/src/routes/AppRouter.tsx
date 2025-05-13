import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import TaskListPage from "../pages/TaskListPage";
import AppLayout from "@/layouts/AppLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route element={<AppLayout />}>
        <Route index={true} path="/dashboard" element={<DashboardPage />} />
        <Route path="/lists/:id" element={<TaskListPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;