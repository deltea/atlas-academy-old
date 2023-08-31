<script lang="ts">
  import TimelineSection from "$components/TimelineSection.svelte";
	import PostBadge from "$components/PostBadge.svelte";
  import type { BlogPost, PostType } from "$lib/contentful";
  import type { Entry, EntryCollection } from "contentful";

  export let entries: EntryCollection<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  let typeFilter: PostType[] = ["Podcast", "Reflection"];
  let previousTypeFilter: PostType;
  let postsByYear: {
    [x: string]: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[],
  } = {};

  $: if (typeFilter.length === 0) {
    typeFilter = [previousTypeFilter === "Reflection" ? "Podcast" : "Reflection"];
  }
  $: postsByYear = {
    "2022": filterPosts(entries.items, 2022, typeFilter),
    "2023": filterPosts(entries.items, 2023, typeFilter),
    "2024": filterPosts(entries.items, 2024, typeFilter),
  }

  function filterPostsByYear(
    posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[],
    year: number
  ) {
    return posts.filter(item => new Date(item.fields.date).getFullYear() === year);
  }

  function filterPostsByType(
    posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[],
    type: PostType[],
  ) {
    return posts.filter(item => type.includes(item.fields.type as PostType));
  }

  function filterPosts(
    posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[],
    year: number,
    type: PostType[],
  ) {
    return filterPostsByType(filterPostsByYear(posts, year), type);
  }
</script>

<div class="sticky -mb-small-navbar duration-200 h-small-navbar top-0 z-30 flex items-center space-x-4">
  <label for="podcast">
    <PostBadge type="Podcast" />
    <input
      bind:group={typeFilter}
      on:click={() => previousTypeFilter = "Podcast"}
      type="checkbox"
      name="type"
      id="podcast"
      value="Podcast">
  </label>

  <label for="reflection">
    <PostBadge type="Reflection" />
    <input
      bind:group={typeFilter}
      on:click={() => previousTypeFilter = "Reflection"}
      type="checkbox"
      name="type"
      id="reflection"
      value="Reflection">
  </label>
</div>

{#if postsByYear}
  <TimelineSection posts={postsByYear["2024"]} year={2024} />
  <TimelineSection posts={postsByYear["2023"]} year={2023} />
  <TimelineSection posts={postsByYear["2022"]} year={2022} />
{/if}
