<script lang="ts">
  import { extractSpotifyId } from "$lib/utils";
  import { onMount } from "svelte";

  export let content: string;
  export let podcasts: string[];

  let contentContainer: HTMLElement;
  let headings: NodeListOf<HTMLHeadingElement>;
  let imageGroup: HTMLElement[][] = [];

  function scrollToSection(id: string) {
    const target = document.getElementById(id) as HTMLHeadingElement;
    window.scrollTo(0, target.offsetTop - 100);
  }

  onMount(() => {
    let tempImages: HTMLElement[] = [];
    const figures = Array.from(contentContainer.querySelectorAll("figure"));

    figures.forEach(figure => {
      tempImages.push(figure);

      if (figure.nextElementSibling?.tagName !== "FIGURE") {
        imageGroup.push([...tempImages]);
        tempImages = [];
      }
    });

    imageGroup.forEach(group => {
      group.forEach((figure, i) => {
        const isSingleImage = (group.length % 2 !== 0) && (i === group.length - 1);
        if (isSingleImage) {
          figure.classList.add("w-full");
          figure.querySelector("img")?.classList.add("h-tall");
        } else {
          figure.classList.add("w-1/2");
          figure.querySelector("img")?.classList.add("h-short");
        }

        figure.classList.add("px-1");
        figure.classList.add("inline-block");
        figure.querySelector("img")?.classList.add("object-cover");
      });
    });

    headings = contentContainer.querySelectorAll("h1");

    if (headings) {
      headings.forEach((heading, i) => {
        heading.id = i.toString();
      });
    }
  });
</script>

<section class="m-60 space-y-8">
  {#if headings && headings.length !== 0}
    <div class="w-full bg-neutral-100 dark:bg-neutral-700 p-8">
      <h1 class="font-bold text-2xl emphasis">
        Outline
      </h1>

      <hr class="border-neutral-200 dark:border-neutral-600 my-8 duration-200">

      <div class="space-y-4">
        {#each headings as heading, i}
          <button on:click={() => scrollToSection(i.toString())} class="block uppercase text-sm font-semibold text-indigo-600">
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
    @apply my-8 font-light text-base tracking-wider;
  }

  article :global(h1) {
    @apply font-bold text-3xl mb-8;
  }
</style>
