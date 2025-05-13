import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getTasks,
  addTask,
  completeTask,
  deleteTask,
} from "../services/taskService";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import type { Task } from "@/types";

const TaskListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(id!);
      setTasks(data);
    } catch {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const created = await addTask(id!, newTask);
    setTasks([...tasks, created]);
    setNewTask("");
  };

  const handleComplete = async (taskId: number, value: boolean) => {
    const updated = await completeTask(taskId, value);
    setTasks(tasks.map((t) => (t.id === taskId ? updated : t)));
  };

  const handleDelete = async (taskId: number) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Tareas</h2>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button type="submit">Agregar</Button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => handleComplete(task.id, e.target.checked)}
                />
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <Button
        variant="link"
        className="w-full"
        onClick={() => navigate("/dashboard")}
      >
        ← Volver a listas
      </Button>
    </>
  );
};

export default TaskListPage;
