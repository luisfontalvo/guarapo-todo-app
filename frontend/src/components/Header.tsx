import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center max-w-md mx-auto mb-4">
      <h1 className="text-xl font-bold">Guarapo To-do</h1>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </header>
  );
};

export default Header;