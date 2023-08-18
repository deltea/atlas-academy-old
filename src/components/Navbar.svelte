<script lang="ts">
  import { onMount } from "svelte";

  let atPageTop = true;

  function checkPageTop() {
    atPageTop = window.scrollY === 0;
  }

  onMount(() => {
    document.addEventListener("scroll", checkPageTop);
    return () => document.removeEventListener("scroll", checkPageTop);
  });
</script>

<nav class={`flex justify-between fixed w-full z-50 p-xs items-center ${atPageTop ? "text-white bg-transparent h-navbar" : "text-neutral bg-white h-small-navbar"} duration-500`}>
  <!-- Title -->
  <header class={`font-fancy group ${atPageTop ? "text-3xl" : "text-2xl"} duration-100`}>
    <a class="group-hover:-top-1.5 top-0 relative duration-150" href="/">世界是学校</a>
  </header>

  <!-- Navigation -->
  <div class="emphasis text-xs space-x-6 duration-200">
    <a href="/">Home</a>
    <a href="/destinations">Destinations</a>
    <a href="/blog">Blog</a>
    <a href="/gallery">Gallery</a>
    <a href="/about">About</a>
  </div>

  <!-- Socials -->
  <div class="space-x-2">
    <a href="https://www.facebook.com/worldschool.atlas.academy" class="group" target="_blank">
      <!-- <Icon name="mdi:facebook" class="w-6 h-6 inline group-hover:-top-1.5 top-0 relative duration-150" /> -->
      <span class="w-6 h-6 inline group-hover:-top-1.5 top-0 relative duration-150">⛄</span>
    </a>
    <a href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3" class="group" target="_blank">
      <!-- <Icon name="mdi:spotify" class="w-6 h-6 inline group-hover:-top-1.5 top-0 relative duration-150" /> -->
      <span class="w-6 h-6 inline group-hover:-top-1.5 top-0 relative duration-150">⛄</span>
    </a>
    <a href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789" class="w-6 h-6 group" target="_blank">
      <!-- <Icon name="fa:podcast" class="w-6 h-6 inline group-hover:-top-1.5 top-0 relative duration-150" /> -->
      <span class="w-6 h-6 inline group-hover:-top-1.5 top-0 relative duration-150">⛄</span>
    </a>
  </div>
</nav>
