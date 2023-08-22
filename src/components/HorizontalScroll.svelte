<script lang="ts">
  let container: HTMLDivElement;

  function scroll(amount: number) {
    container.scrollLeft += amount;
  }
</script>

<div class="flex justify-between">
  <h1 class="text-xl emphasis">Latest Posts</h1>
  <div class="font-bold text-xl">
    <button class="w-8 h-8" on:click={() => scroll(-300)}>
      {"<"}
    </button>
    <button class="w-8 h-8" on:click={() => scroll(300)}>
      {">"}
    </button>
  </div>
</div>

<div class="overflow-x-auto flex gap-4 h-80 p-4 -mx-4" bind:this={container}>
  <slot />
</div>
