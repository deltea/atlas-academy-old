<script lang="ts">
  import "iconify-icon";

  let container: HTMLDivElement;

  function scroll(amount: number) {
    container.scrollLeft += amount;
  }
</script>

<div class="flex justify-between items-center">
  <h1 class="text-xl emphasis">Latest Posts</h1>
  <div class="font-bold text-xl">
    <button class="w-12" on:click={() => scroll(-300)}>
      <iconify-icon icon="mdi:chevron-left" class="text-3xl"></iconify-icon>
    </button>
    <button class="w-12" on:click={() => scroll(300)}>
      <iconify-icon icon="mdi:chevron-right" class="text-3xl"></iconify-icon>
    </button>
  </div>
</div>

<div class="overflow-x-auto flex gap-4 h-80 p-4 -mx-4" bind:this={container}>
  <slot />
</div>
