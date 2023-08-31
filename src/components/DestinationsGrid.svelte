<script lang="ts">
  import { image } from "$lib/utils";
  import type { Continent, Destination } from "$lib/contentful";
  import type { EntryCollection } from "contentful";

  export let destinations: EntryCollection<Destination, "WITHOUT_UNRESOLVABLE_LINKS", string>;

  let currentContinent: Continent | "All" = "All";

  function setContinent(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    currentContinent = target.name as Continent;
  }
</script>

<div class="space-x-8 text-center lg:my-sm my-xs overflow-x-auto whitespace-nowrap">
  <button on:click={setContinent} name="All" class="emphasis">All</button>
  <button on:click={setContinent} name="Asia" class="emphasis">Asia</button>
  <button on:click={setContinent} name="Europe" class="emphasis">Europe</button>
  <button on:click={setContinent} name="Middle East" class="emphasis">Middle East</button>
  <button on:click={setContinent} name="Africa" class="emphasis">Africa</button>
  <button on:click={setContinent} name="Americas" class="emphasis">Americas</button>
</div>

<ul class="text-neutral grid lg:grid-cols-4 grid-cols-1 gap-1">
  {#each destinations.items as item (item.fields.slug)}
    {#if currentContinent === "All" || item.fields.continent === currentContinent}
      <li>
        <a href={`/destinations/${item.fields.slug}`}
          style:background-image="url('{image(item.fields.cover?.fields.file?.url, 800)}')"
          class="block h-80 bg-cover bg-center text-white relative dim-image">
          <h1 class="absolute left-6 bottom-6 font-bold uppercase text-sm">{item.fields.name}</h1>
        </a>
      </li>
    {/if}
  {/each}
</ul>
