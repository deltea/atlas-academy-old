<script lang="ts">
  import { extractSpotifyId } from "$lib/utils";
  import { onMount } from "svelte";
  import { type ImageType, layouts, longAspect, landscapeAspect, portraitAspect } from "$lib/imageLayouts";

  export let content: string;
  export let podcasts: string[];

  let contentContainer: HTMLElement;
  let headings: NodeListOf<HTMLHeadingElement>;
  let imageGroup: HTMLImageElement[][] = [];

  function scrollToSection(id: string) {
    const target = document.getElementById(id) as HTMLHeadingElement;
    window.scrollTo(0, target.offsetTop - 100);
  }

  onMount(() => {
    console.clear();

    let tempImages: HTMLImageElement[] = [];
    const images = Array.from(contentContainer.querySelectorAll("img"));

    images.forEach(image => {
      tempImages.push(image);

      if (image.nextElementSibling?.tagName !== "IMG") {
        imageGroup.push([...tempImages]);
        tempImages = [];
      }
    });

    imageGroup.forEach((group, i) => {
      console.log(
        "--------\n",
        "😎 Group: ", i,
        "\n--------",
      );
      const imageTypes: ImageType[] = group.map(
        image => image.naturalWidth > image.naturalHeight ? "landscape" : "portrait"
      );

      const layoutSize = layouts[group.length];
      const layout = layoutSize.find(layout =>
        layout.order.toString() === imageTypes.toString()
      );

      if (layout) {
        layout.grid.forEach((item, i) => {
          group[i].style.gridRow = `${item.rowStart} / ${item.rowEnd}`;
          group[i].style.gridColumn = `${item.colStart} / ${item.colEnd}`;
        });
      }

      console.log("🌟 Layout: ", layout);

      const wrapper = document.createElement("div");
      wrapper.style.display = "grid";
      wrapper.style.gap = "0.5rem";

      group[0].parentNode?.insertBefore(wrapper, group[0]);
      group.forEach((image, i) => {
        if (layout?.grid[i].colEnd === 3) {
          image.style.aspectRatio = longAspect;
        } else if (image.naturalWidth >= image.naturalHeight) {
          image.style.aspectRatio = landscapeAspect;
        } else {
          image.style.aspectRatio = portraitAspect;
        }

        wrapper.appendChild(image);
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

<section class="mx-lg my-sm space-y-8">
  {#if headings && headings.length !== 0}
    <div class="w-full bg-neutral-100 dark:bg-neutral-700 p-8">
      <h1 class="font-bold text-2xl emphasis">
        Outline
      </h1>

      <hr class="border-neutral-200 dark:border-neutral-600 my-8 duration-200">

      <div class="space-y-4">
        {#each headings as heading, i}
          <button on:click={() => scrollToSection(i.toString())}
            class="block uppercase text-sm font-semibold text-theme hover:underline">
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
