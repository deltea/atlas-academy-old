<script lang="ts">
  import PostBadge from "$components/PostBadge.svelte";
  import type { BlogPost } from "$lib/contentful";
  import { image } from "$lib/utils";
  import type { Entry } from "contentful";

  export let posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
  export let year: number;

  let leftPosts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];
  let rightPosts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];

  $: leftPosts = posts.filter((_, i) => i % 2 === 0);
  $: rightPosts = posts.filter((_, i) => i % 2 !== 0);
</script>

{#if posts.length > 0}
  <header class="sticky bg-white dark:bg-neutral duration-200 h-small-navbar top-0 text-center z-20 flex justify-center items-center">
    <h1>{year}</h1>
  </header>

  <section class="flex justify-between mb-2">
    <ul class="w-1/2 mt-[4rem]">
      {#each leftPosts as post}
        <li>
          <a href={`/posts/${post.fields.slug}`} class="flex flex-col md:h-52 h-64 group relative items-end text-right">
            <div class="md:mx-sm mr-8">
              <h1 class="emphasis text-neutral-400 group-hover:text-neutral dark:group-hover:text-white duration-300">
                {new Date(post.fields.date).toLocaleDateString()}
              </h1>
              <h2 class="text-neutral-400 group-hover:text-neutral dark:group-hover:text-white duration-300 md:text-base text-sm">
                {post.fields.title}
                <PostBadge type={post.fields.type} />
              </h2>
              <img src={image(post.fields.cover?.fields.file?.url, 200)}
                alt={post.fields.cover?.fields.title}
                class="h-20 rounded-md mt-2 brightness-75 group-hover:brightness-100 group-hover:scale-110 duration-300 inline-block float-right">
            </div>

            <div class="border-neutral-400 group-hover:border-neutral dark:group-hover:border-white border-2 bg-white dark:bg-neutral w-2 h-2 rotate-45 absolute -right-1 z-10 duration-300 top-2"></div>
            <div class="border-neutral-400 group-hover:border-neutral dark:group-hover:border-white border md:w-10 w-5 absolute top-3 duration-300"></div>
          </a>
        </li>
      {/each}
    </ul>

    <div class="relative">
      <div class="rounded-full w-2 h-2 bg-neutral-400 absolute left-1/2 -translate-x-1/2"></div>
      <div class="h-full border border-neutral-400 w-0"></div>
      <div class="rounded-full w-2 h-2 bg-neutral-400 absolute left-1/2 -translate-x-1/2"></div>
    </div>

    <ul class="w-1/2 md:mt-[calc(4rem+6rem)] mt-[calc(4rem+8rem)]">
      {#each rightPosts as post}
        <li>
          <a href={`/posts/${post.fields.slug}`} class="flex flex-col md:h-52 h-64 group relative items-start">
            <div class="md:mx-sm ml-8">
              <h1 class="emphasis text-neutral-400 group-hover:text-neutral dark:group-hover:text-white duration-300">
                {new Date(post.fields.date).toLocaleDateString()}
              </h1>
              <h2 class="text-neutral-400 group-hover:text-neutral dark:group-hover:text-white duration-300 md:text-base text-sm">
                <PostBadge type={post.fields.type} />
                {post.fields.title}
              </h2>
              <img src={image(post.fields.cover?.fields.file?.url, 200)}
                alt={post.fields.cover?.fields.title}
                class="h-20 rounded-md mt-2 brightness-75 group-hover:brightness-100 group-hover:scale-110 duration-300">
            </div>

            <div class="border-neutral-400 group-hover:border-neutral dark:group-hover:border-white border-2 bg-white dark:bg-neutral w-2 h-2 rotate-45 absolute -left-1 z-10 duration-300 top-2"></div>
            <div class="border-neutral-400 group-hover:border-neutral dark:group-hover:border-white border md:w-10 w-5 absolute top-3 duration-300"></div>
          </a>
        </li>
      {/each}
    </ul>
  </section>
{/if}
