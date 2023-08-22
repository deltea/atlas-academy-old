<script lang="ts">
  import { onMount } from "svelte";
  import VanillaTilt from "vanilla-tilt";

  export let src: string;
  export let url: string;

  let cardElement: HTMLAnchorElement;

  onMount(() => {
    VanillaTilt.init(cardElement, {
      max: 5,
      scale: 1.05,
      glare: true,
      "max-glare": 0.4
    });
  });
</script>

<a href={url}
  style:background-image="url('{src}')"
  class="dim-image bg-cover bg-center w-full rounded-2xl h-full inline-block shadow-2xl"
  style:transform-style="preserve-3d"
  style:transform="perspective(1000px)"
  bind:this={cardElement}>
  <div class="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black rounded-2xl"></div>
  <h2 class="text-white absolute bottom-16 left-1/2 text-center text-lg"
    style:transform="translateX(-50%) translateZ(100px)">
    <slot />
  </h2>
</a>
