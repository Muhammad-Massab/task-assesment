export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  completed: boolean;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}
