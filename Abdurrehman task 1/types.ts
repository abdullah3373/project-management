export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: User;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  boardId: string;
}

export interface Board {
  _id: string;
  name: string;
  description: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
}

export interface Message {
  _id: string;
  content: string;
  sender: User;
  createdAt: Date;
  boardId: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}
