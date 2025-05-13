import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <Header />
        <main className="flex flex-col gap-4">
          <Outlet />
        </main>
      </Card>
    </div>
  );
};

export default AppLayout;
