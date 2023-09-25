<script lang="ts">
  export let data: { summaries: { slug: string; title: string }[] };
</script>

<h1>blog</h1>

<ul>
  {#each data.summaries as summary}
    <li><a href="/blog/{summary.slug}">{summary.title}</a></li>
  {/each}
</ul>
