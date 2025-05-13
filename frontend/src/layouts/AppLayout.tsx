import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <main className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;