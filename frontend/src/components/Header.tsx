import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center max-w-md mx-auto mb-4">
      <h1 className="text-xl font-bold">Guarapo To-do</h1>
      <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;