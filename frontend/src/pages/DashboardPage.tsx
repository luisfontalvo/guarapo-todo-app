import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLists, createList } from "../services/listService";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import type { List } from "@/types";

const DashboardPage = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchLists = async () => {
    try {
      setLoading(true);
      const data = await getLists();
      setLists(data);
    } catch (err) {
      console.log(err);
      setError("Error al cargar las listas");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAddList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newList = await createList(title);
    setLists([...lists, { ...newList, tasks: [] }]);
    setTitle("");
  };

  useEffect(() => {
    fetchLists();
  }, [navigate]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Tus listas</h2>

      <form onSubmit={handleAddList} className="flex gap-2">
        <Input
          type="text"
          placeholder="Nueva lista"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit">Crear</Button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500 text-sm text-center">{error}</p>
      ) : (
        <ul className="space-y-2">
          {lists.map((list) => (
            <li
              key={list.id}
              className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/lists/${list.id}`)}
            >
              {list.title} ({list.tasks.length} tareas)
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DashboardPage;
