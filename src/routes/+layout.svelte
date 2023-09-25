<script>
  import Nav from '$lib/components/molecules/Nav/Nav.svelte';
  import Container from '$lib/components/atoms/Container/Container.svelte';
</script>

<Container>
  <Nav />

  <slot />
</Container>

<style lang="scss">
  :global(html),
  :global(body) {
    background: #333;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #eee;
  }

  :global(a) {
    color: lightblue;

    &:hover {
      color: blue;
    }
  }
</style>
