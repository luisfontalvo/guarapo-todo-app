export interface List {
  id: number;
  title: string;
  tasks: Task[];
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  listId: number;
  createdAt: string;
  updatedAt: string;
}