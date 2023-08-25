<script lang="ts">
  import { extractSpotifyId } from "$lib/utils";
  import { onMount } from "svelte";

  export let content: string;
  export let podcasts: string[];

  let contentContainer: HTMLElement;
  let headings: NodeListOf<HTMLHeadingElement>;

    function scroll(id: string) {
      const target = document.getElementById(id) as HTMLHeadingElement;
      window.scrollTo(0, target.offsetTop - 100);
      console.log(id);
    }

  onMount(() => {
    headings = contentContainer.querySelectorAll("h1");
    headings.forEach((heading, i) => {
      heading.id = i.toString();
    });
  });
</script>

<section class="m-md space-y-sm">
  {#if headings}
    <div class="w-full bg-neutral-100 dark:bg-neutral-700 p-8">
      <h1 class="font-bold text-2xl emphasis">
        Table of Contents
      </h1>

      <hr class="border-neutral-200 dark:border-neutral-600 my-8 duration-200">

      <div class="space-y-4">
        {#each headings as heading, i}
          <button on:click={() => scroll(i.toString())} class="block uppercase text-sm font-semibold text-indigo-600">
            {heading.innerText}
          </button>
        {/each}
      </div>
    </div>
  {/if}

  {#each podcasts as podcast}
    <iframe
      title="Spotify Player Embed"
      src={`https://open.spotify.com/embed/episode/${extractSpotifyId(podcast)}?utm_source=generator&theme=0`}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      class="w-full h-20"></iframe>
  {/each}

  <article bind:this={contentContainer}>{@html content}</article>
</section>

<style>
  article :global(p) {
    @apply my-8 font-light text-lg;
  }

  article :global(h1) {
    @apply font-bold text-3xl;
  }
</style>
