<script lang="ts">
  import type { Todo } from '$lib/repositories/todo.ts';
  import { enhance } from '$app/forms';
  import { fly, slide } from 'svelte/transition';

  export let data: { todos: Todo[] };
  export let form: { description?: string; error?: string } | undefined;
</script>

<h1>Todos</h1>

{#if form?.error}
  <p style="color: red">{form.error}</p>
{/if}

<form method="POST" action="?/create" use:enhance>
  <label>
    add a todo:
    <input name="description" autocomplete="off" value={form?.description ?? ''} />
  </label>
</form>

<ul>
  {#each data.todos as todo}
    <li in:fly={{ y: 20 }} out:slide>
      <form method="POST" action="?/delete" use:enhance>
        <input type="hidden" name="id" value={todo.id} />
        <span>{todo.description}</span>
        <button type="submit">delete</button>
      </form>
    </li>
  {/each}
</ul>
