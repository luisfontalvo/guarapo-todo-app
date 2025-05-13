import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const token = await register(email, password);
      localStorage.setItem("AUTH_TOKEN", token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Error al registrar");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl mb-4 font-bold">Registro</h2>
        <input
          type="email"
          placeholder="Correo"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
