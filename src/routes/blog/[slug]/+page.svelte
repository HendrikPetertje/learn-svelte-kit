<script lang="ts">
  interface Post {
    slug: string;
    title: string;
    content: string;
  }

  export let data: { post: Post };
</script>

<h1>{data.post.title}</h1>
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<div>{@html data.post.content}</div>
