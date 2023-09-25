import { createTodo, deleteTodo, getTodos } from "$lib/repositories/database";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ValidationError } from "$lib/repositories/error";

export const load = (async ({ cookies }) => {
  let id = cookies.get('userId');

  if (!id) {
    const newId = crypto.randomUUID()
    cookies.set('userId', newId, { path: '/' });
    id = newId;
  }

  return {
    todos: getTodos(id) ?? []
  };
}) satisfies PageServerLoad


export const actions = {
  // reminder: use default when dealing with form without action
  // I probably prefer being explicit though // HP

  create: async ({ cookies, request }) => {
    const userId = cookies.get('userId')
    if (!userId) return

    const data = await request.formData();
    const description = data.get('description');
    if (typeof description !== 'string') return

    try {
      createTodo(userId, description.toString());
    } catch (error) {
      // I like throwing errors in the app,
      // but I also like not leaking sensitive data to the client
      // so these instanced errors are a nice middle ground
      if (error instanceof ValidationError) {
        return fail(422, {
          description: data.get('description'),
          error: error.message,
        })
      }
      throw error;
    }
  },
  delete: async ({ cookies, request }) => {
    const userId = cookies.get('userId')
    if (!userId) return

    const data = await request.formData();
    const id = data.get('id');
    if (!id) return

    deleteTodo(userId, id.toString());
  },
} satisfies Actions;
