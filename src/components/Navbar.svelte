<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import ThemeButton from "$components/ThemeButton.svelte";
  import "iconify-icon";

  let atPageTop = true;
  let atPageBottom = false;
  let scrollDirection: "up" | "down" = "up";
  let scrolledScreenHeight = false;

  function checkPageTop() {
    atPageTop = window.scrollY === 0;
    atPageBottom = Math.ceil(
      window.innerHeight + window.scrollY
    ) >= document.body.offsetHeight;
    scrolledScreenHeight = window.scrollY > window.innerHeight;
  }

  function checkScrollDirection(e: WheelEvent) {
    scrollDirection = e.deltaY < 0 ? "up" : "down";
  }

  function backToTop() {
    window.scrollTo(0, 0);
  }

  onMount(() => {
    checkPageTop();

    document.addEventListener("scroll", checkPageTop);
    document.addEventListener("wheel", checkScrollDirection);

    return () => {
      document.removeEventListener("scroll", checkPageTop);
      document.removeEventListener("wheel", checkScrollDirection);
    }
  });
</script>

<nav class={`flex justify-between fixed w-full z-50 p-xs items-center duration-500
  ${atPageTop ?
    "text-white bg-transparent h-navbar" :
    "text-neutral bg-white dark:bg-neutral dark:text-white h-small-navbar shadow-lg"}
  ${scrolledScreenHeight && scrollDirection === "down" ? "-top-[7rem]" : "top-0"}`}>

  <!-- Title -->
  <header class={`font-fancy group ${atPageTop ? "text-3xl" : "text-2xl"} duration-100`}>
    <a class="group-hover:-top-1.5 top-0 relative duration-150" href="/">世界是学校</a>
  </header>

  <!-- Navigation -->
  <div class="emphasis text-xs flex gap-6 items-center duration-200 h-full">
    <a href="/">Home</a>

    <div class="group relative h-20 flex items-center">
      <a href="/destinations">Destinations</a>

      <!-- Destinations dropdown -->
      {#if !(scrolledScreenHeight && scrollDirection === "down")}
        <div class="flex-col group-hover:pointer-events-auto pointer-events-none flex group-hover:opacity-100 opacity-0 absolute top-16 left-0 bg-white dark:bg-neutral p-4 w-lg text-black dark:text-white duration-200 shadow-lg">
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/usa">
            美國 <span class="font-normal">USA</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/montenegro">
            黑山共和國 <span class="font-normal">Montenegro</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/france">
            法國 <span class="font-normal">France</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/italy">
            義大利 <span class="font-normal">Italy</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/japan">
            日本 <span class="font-normal">Japan</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/taiwan">
            台灣 <span class="font-normal">Taiwan</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/thailand">
            泰國 <span class="font-normal">Thailand</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/turkey">
            土耳其 <span class="font-normal">Turkey</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200"
            href="/destinations/portugal">
            葡萄牙 <span class="font-normal">Portugal</span>
          </a>
          <a class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 duration-200 text-theme flex gap-2 items-center"
            href="/destinations">
            <iconify-icon icon="mdi:plus-circle-outline" class="text-lg"></iconify-icon>
            更多 <span class="font-normal">More Places</span>
          </a>
        </div>
      {/if}
    </div>

    <a href="/blog">Blog</a>
    <a href="/gallery">Gallery</a>
    <a href="/about">About</a>

    <ThemeButton />
  </div>


  <!-- Socials -->
  <div class="space-x-2">
    <a href="https://www.facebook.com/worldschool.atlas.academy"
      class="group"
      target="_blank">
      <iconify-icon icon="mdi:facebook"
        class="text-xl group-hover:-top-1 top-0 relative duration-150">
      </iconify-icon>
    </a>

    <a href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
      class="group"
      target="_blank">
      <iconify-icon icon="mdi:spotify"
        class="text-xl group-hover:-top-1 top-0 relative duration-150">
      </iconify-icon>
    </a>

    <a href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
      class="group"
      target="_blank">
      <iconify-icon icon="fa:podcast"
        class="text-xl group-hover:-top-1 top-0 relative duration-150">
      </iconify-icon>
    </a>
  </div>
</nav>

{#if !atPageTop && !atPageBottom}
  <button
    class="fixed bottom-8 right-8 text-2xl text-white rounded-full shadow-lg bg-neutral-600 w-12 h-12 flex justify-center items-center z-50"
    on:click={backToTop}
    transition:fly={{ y: 80, duration: 300 }}>
    <iconify-icon icon="mdi:chevron-up"></iconify-icon>
  </button>
{/if}
