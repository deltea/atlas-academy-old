<script lang="ts">
  import type { PostType } from "$lib/contentful";
  import "iconify-icon";

  export let type: PostType | string;
</script>

{#if type === "Podcast"}
  <div class="bg-neutral-200 dark:bg-white inline-flex rounded-full text-neutral justify-center items-center p-[2px] text-sm">
    <iconify-icon icon="material-symbols:mic"></iconify-icon>
  </div>
{:else}
  <div class="bg-neutral dark:bg-neutral-600 text-white inline-flex rounded-full justify-center items-center p-[3px] text-xs">
    <iconify-icon icon="mdi:pencil"></iconify-icon>
  </div>
{/if}
