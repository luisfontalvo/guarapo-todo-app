import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const token = await login(email, password);
      localStorage.setItem("AUTH_TOKEN", token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl mb-4 font-bold">Iniciar Sesión</h2>
        
        <div className="mb-4">
          <Label htmlFor="email">Correo</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button className="w-full" type="submit">Ingresar</Button>
      </form>
    </div>
  );
};

export default LoginPage;
