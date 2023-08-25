<script lang="ts">
  import type { GalleryPhoto } from "$lib/contentful";
  import { image } from "$lib/utils";
  import type { Entry, EntryCollection } from "contentful";
  import "iconify-icon";
  import { scale } from "svelte/transition";

  export let entries: EntryCollection<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>;

  let modal: HTMLDialogElement;
  let currentIndex = 0;
  let currentPhoto: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>;

  $: currentPhoto = entries.items[currentIndex];

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
    modal.classList.remove("is-hidden");
    modal.showModal();
  }

  function changePhoto(direction: -1 | 1) {
    currentIndex += direction;
  }
</script>

<section class="grid grid-cols-5 dark:gap-2 gap-1 duration-200">
  {#each entries.items as item, i (item.fields.slug)}
    <button on:click={() => openModal(i)}>
      <img src={image(item.fields.image?.fields.file?.url, 400)} alt={item.fields.title}>
    </button>
  {/each}
</section>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={modal}
  on:click={lightDismiss}
  class="fixed backdrop:bg-black backdrop:bg-opacity-80 w-full h-full bg-transparent text-white">
  <button on:click={closeModal} class="absolute right-4 top-4">
    <iconify-icon icon="mdi:close" class="text-3xl"></iconify-icon>
  </button>

  {#if currentIndex > 0}
    <button class="absolute left-0 h-full px-8 hover:scale-125 hover:-translate-x-2 active:scale-90 duration-150 origin-center"
      on:click={() => changePhoto(-1)}
      transition:scale={{ duration: 200 }}>
      <iconify-icon icon="mdi:chevron-left" class="text-4xl"></iconify-icon>
    </button>
  {/if}

  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex w-4/5 gap-8 pointer-events-none">
    <img src={image(currentPhoto.fields.image?.fields.file?.url, 1000)}
      alt={currentPhoto.fields.title}
      class="h-[30rem] pointer-events-auto">

    <div class="space-y-8 mt-6 h-fit pointer-events-auto">
      <h1 class="font-bold text-2xl">{currentPhoto.fields.title}</h1>
      <h2 class="text-lg">{currentPhoto.fields.description}</h2>
    </div>
  </div>

  {#if currentIndex < entries.items.length - 1}
    <button class="absolute right-4 h-full px-8 hover:scale-125 hover:translate-x-2 active:scale-90 duration-150 origin-center"
      on:click={() => changePhoto(1)}
      transition:scale={{ duration: 200 }}>
      <iconify-icon icon="mdi:chevron-right" class="text-4xl"></iconify-icon>
    </button>
  {/if}
</dialog>

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
