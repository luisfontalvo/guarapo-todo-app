import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLists, createList } from "../services/listService";
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
    setLists([...lists, {...newList, tasks: []}]);
    setTitle("");
  };

  useEffect(() => {
    fetchLists();
  }, [navigate]);

  return loading ? (
    <p>Cargando...</p>
  ) : error ? (
    <p className="text-red-500">{error}</p>
  ) : (
    <>
      <h2 className="text-2xl font-bold mb-4">Tus listas</h2>

      <form onSubmit={handleAddList} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nueva lista"
          className="flex-1 border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
          Crear
        </button>
      </form>

      <ul className="space-y-2">
        {lists.map((list) => (
          <li
            key={list.id}
            className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/lists/${list.id}`)}
          >
            {list.title} ({list.tasks.length} tareas)
          </li>
        ))}
      </ul>
    </>
  );
};

export default DashboardPage;
