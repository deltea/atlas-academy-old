<script lang="ts">
  import { extractSpotifyId } from "$lib/utils";
  import { onMount } from "svelte";

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
    let tempImages: HTMLImageElement[] = [];
    const images = Array.from(contentContainer.querySelectorAll("img"));

    images.forEach(figure => {
      tempImages.push(figure);

      if (figure.nextElementSibling?.tagName !== "IMG") {
        imageGroup.push([...tempImages]);
        tempImages = [];
      }
    });

    imageGroup.forEach((group, i) => {
      let layout: string[][] = [new Array(group.length).fill("").map((_, i) => `image${i}`)];

      let landscapes = group.filter(image => image.naturalWidth >= image.naturalHeight);
      let portraits = group.filter(image => image.naturalWidth < image.naturalHeight);

      let wrapper = document.createElement("div");

      console.log("Group: ", i);

      if (group.length >= 3) {
        let tempGroup = group;
        layout = [];
        console.log("cool");

        while (tempGroup.length > 0) {
          landscapes = tempGroup.filter(image => image.naturalWidth >= image.naturalHeight);
          portraits = tempGroup.filter(image => image.naturalWidth < image.naturalHeight);

          // Two landscapes and one portrait to the side
          if (landscapes.length >= 2 && portraits.length >= 1) {
            layout.push([
              `image${group.indexOf(landscapes[0])} image${group.indexOf(portraits[0])}`
            ]);
            layout.push([
              `image${group.indexOf(landscapes[1])} image${group.indexOf(portraits[0])}`
            ]);

            tempGroup = tempGroup.filter(image => image !== landscapes[0] && image !== landscapes[1] && image !== portraits[0]);
          }

          // Four or six or eight portraits
          else if (portraits.length >= 2) {
            layout.push([
              `image${group.indexOf(portraits[0])} image${group.indexOf(portraits[1])}`
            ]);

            tempGroup = tempGroup.filter(image => image !== portraits[0] && image !== portraits[1]);
          }

          // Single image by itsef below the three
          else {
            console.log("single");

            layout.push([`image${group.indexOf(tempGroup[0])} image${group.indexOf(tempGroup[0])}`]);
            tempGroup = tempGroup.filter(image => image !== tempGroup[0]);
          }
        }
      } else {
        if (landscapes.length === 2 || (portraits.length === 1 && landscapes.length === 1)) {
          layout = [["image0"], ["image1"]];
        } else if (portraits.length === 2) {
          layout = [["image0 image1"]];
        } else {
          layout = [["image0"]];
        }
      }

      console.log(layout);

      wrapper.style.display = "grid";
      wrapper.style.gap = "0.5rem";
      wrapper.style.gridTemplateAreas = layout.map(col => `"${col.join(" ")}"`).join(" ");
      wrapper.style.gridTemplateRows = new Array(layout.length).fill("20rem").join(" ");

      group[0].parentNode?.insertBefore(wrapper, group[0]);
      group.forEach((figure, i) => {
        figure.style.gridArea = `image${i}`;

        wrapper.appendChild(figure);
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
