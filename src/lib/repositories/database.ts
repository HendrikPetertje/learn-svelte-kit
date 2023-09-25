import { ValidationError } from "./error";
import type { Todo } from "./todo";

const db = new Map();

export async function getTodos(userId: string): Promise<Todo[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!db.has(userId)) {
    db.set(userId, [{
      id: crypto.randomUUID(),
      description: 'Learn svelteKit',
      done: false,
    }]);

  }

  return db.get(userId);
}

export async function createTodo(userId: string, description: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const todos = db.get(userId);

  if (description === '') throw new ValidationError('Description cannot be empty')

  const prevTodos = db.get(userId);
  if (prevTodos.some((todo: Todo) => todo.description === description)) {
    throw new ValidationError('Todo already exists')
  }

  todos.push({
    id: crypto.randomUUID(),
    description,
    done: false
  });
}

export async function deleteTodo(userId: string, todoid: string) {
  const todos = db.get(userId);
  const index = todos.findIndex((todo: Todo) => todo.id === todoid);

  if (index !== -1) {
    todos.splice(index, 1);
  }
}
