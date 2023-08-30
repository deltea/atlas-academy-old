<script lang="ts">
  import type { Destination, GalleryPhoto } from "$lib/contentful";
  import { clamp, image } from "$lib/utils";
  import type { Entry, EntryCollection } from "contentful";
  import "iconify-icon";
  import { scale } from "svelte/transition";

  export let entries: EntryCollection<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  export let destinations: EntryCollection<Destination, "WITHOUT_UNRESOLVABLE_LINKS", string>;

  let modal: HTMLDialogElement;
  let currentIndex = 0;
  let currentPhoto: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  let loading = false;
  let currentDestination = "all";
  let currentGallery: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>[];

  $: currentPhoto = currentGallery[currentIndex];
  $: {
    currentIndex;
    loading = true;
  }
  $: {
    currentGallery = currentDestination === "all" ?
      entries.items :
      entries.items.filter(item =>
        item.fields.country?.fields.short === currentDestination
      ).reverse();
  }

  function lightDismiss(e: MouseEvent) {
    const target = e.target as HTMLDialogElement;
    if (target.nodeName === "DIALOG") {
      closeModal();
    }
  }

  function closeModal() {
    modal.close();
  }

  function openModal(index: number) {
    currentIndex = index;
    modal.showModal();
  }

  function changePhoto(direction: -1 | 1) {
    currentIndex = clamp(currentIndex + direction, 0, currentGallery.length - 1);
  }

  function keyPress(e: KeyboardEvent) {
    if (e.code === "ArrowRight") {
      changePhoto(1);
    } else if (e.code === "ArrowLeft") {
      changePhoto(-1);
    }
  }
</script>

<section class="grid grid-cols-10 gap-y-4 my-16 items-end">
  <button
    class="flex flex-col justify-center items-center group gap-1"
    on:click={() => currentDestination = "all"}>
    <iconify-icon icon="ion:earth" class="text-4xl group-hover:scale-125 group-active:scale-90 duration-200"></iconify-icon>
    <h1>All</h1>
  </button>

  {#if destinations}
    {#each destinations.items as destination}
      <button
        class="flex flex-col justify-center items-center group"
        on:click={() => currentDestination = destination.fields.short}>
        <img
          src="https://flagsapi.com/{destination.fields.code}/flat/48.png"
          alt={destination.fields.code}
          class="group-hover:scale-125 group-active:scale-90 duration-200">
        <h1>{destination.fields.short}</h1>
      </button>
    {/each}
  {/if}
</section>

{#if currentGallery.length === 0}
  <div class="flex justify-center items-center h-40">
    <p>Oops! Looks like no photos were found in {currentDestination}.</p>
  </div>
{/if}

{#if currentGallery}
  <section class="grid grid-cols-5 dark:gap-2 gap-1 duration-200">
    {#each currentGallery as item, i (item.fields.slug)}
      <button on:click={() => openModal(i)} class="group">
        <div style:background-image={`url('${image(item.fields.image?.fields.file?.url, 400)}')`}
          class="bg-cover bg-center aspect-square group-hover:bg-neutral-600 bg-blend-multiply duration-200 relative">
          <div class="w-3/4 group-hover:opacity-100 group-hover:-translate-y-1/2 opacity-0 duration-200 text-white absolute left-1/2 top-1/2 -translate-x-1/2">
            <h1 class="text-xl">{item.fields.title}</h1>
            <small class="text-sm italic relative top-4">{item.fields.city}</small>
          </div>
        </div>
      </button>
    {/each}
  </section>
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#if currentPhoto}
  <dialog bind:this={modal}
    on:click={lightDismiss}
    on:keydown={keyPress}
    class="fixed backdrop:bg-black backdrop:bg-opacity-80 w-full h-full bg-transparent text-white flex justify-center items-center outline-none">
    <button on:click={closeModal} class="absolute right-2 top-2">
      <iconify-icon icon="mdi:close" class="text-3xl"></iconify-icon>
    </button>

    <div class="pointer-events-none flex justify-center h-4/5 items-center gap-8">
      {#if currentIndex > 0}
        <button class="h-full px-8 group pointer-events-auto"
          on:click={() => changePhoto(-1)}
          transition:scale={{ duration: 200 }}>
          <iconify-icon icon="mdi:chevron-left" class="text-4xl group-hover:scale-125 group-hover:-translate-x-2 group-active:scale-90 duration-150 origin-center"></iconify-icon>
        </button>
      {/if}

      {#if loading}
        <div class="bg-white dark:bg-neutral min-w-[30rem] h-[30rem] flex justify-center items-center pointer-events-auto">
          <iconify-icon icon="ph:spinner-bold"
            class="text-4xl animate-spin text-neutral dark:text-white"></iconify-icon>
        </div>
      {/if}

      <img src={image(currentPhoto.fields.image?.fields.file?.url, 1000)}
        alt={currentPhoto.fields.title}
        class="w-2/5 pointer-events-auto"
        class:hidden={loading}
        on:load={() => loading = false}>

      <div class="w-3/5 space-y-8 mt-6 h-full pointer-events-auto">
        <h1 class="font-bold text-2xl">{currentPhoto.fields.title}</h1>
        <small class="italic text-base">
          {currentPhoto.fields.city},
          <a href="/destinations/{currentPhoto.fields.country?.fields.slug}"
            class="hover:text-theme duration-200">
            {currentPhoto.fields.country?.fields.short}
          </a>
        </small>
        <h2 class="text-lg">{currentPhoto.fields.description}</h2>
      </div>

      {#if currentIndex < currentGallery.length - 1}
        <button class="h-full px-8 group pointer-events-auto"
          on:click={() => changePhoto(1)}
          transition:scale={{ duration: 200 }}>
          <iconify-icon icon="mdi:chevron-right" class="text-4xl group-hover:scale-125 group-hover:translate-x-2 group-active:scale-90 duration-150 origin-center"></iconify-icon>
        </button>
      {/if}
    </div>
  </dialog>
{/if}

<style>
  dialog[open] {
    animation: fadeIn 0.5s ease normal;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    } to {
      opacity: 1;
    }
  }
</style>
