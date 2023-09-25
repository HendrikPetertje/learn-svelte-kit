export interface Todo {
  id: string;
  description: string;
  done: boolean;
}

// Get around svelte not liking empty modules
export const foo = 'bar';
