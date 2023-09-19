<script lang="ts">
  import type { Tables } from "$lib/database";
  import { supabase } from "$lib/supabase";
  import { formatRelativeTime } from "$lib/utils";
  import { onMount } from "svelte";
  import "iconify-icon";

  export let post: string;

  let comments: Tables<"comments">[] | null;
  let loading = true;

  let bodyInput: string | null = "";
  let authorInput: string | null = "";

  async function createComment() {
    const data = {
      body: bodyInput,
      author: authorInput,
      created_at: Date.now().toString(),
      post,
    };

    await supabase
      .from("comments")
      .insert(data);

    location.reload();
  }

  onMount(async () => {
    const query = supabase
      .from("comments")
      .select()
      .order("created_at", { ascending: false })
      .eq("post", post);

    comments = (await query).data;

    loading = false;
  });
</script>

{#if loading}
  <section class="flex justify-center items-center h-40">
    <iconify-icon icon="mdi:loading" class="animate-spin text-5xl"></iconify-icon>
  </section>
{:else}
  <section class="text-white lg:mx-lg my-8">
    <form class="space-y-8 w-full mb-16" on:submit|preventDefault={createComment}>
      <div class="space-y-2">
        <label
          for="body"
          class="uppercase tracking-widest font-semibold text-sm text-neutral dark:text-white">
          Add comment
        </label>
        <textarea
          bind:value={bodyInput}
          class="text-neutral block w-full text-input bg-neutral-100 dark:bg-white"
          rows="5"
          id="body"
          required />
      </div>

      <div class="space-y-2">
        <label
          for="author"
          class="uppercase tracking-widest font-semibold text-sm text-neutral dark:text-white">
          Name*
        </label>
        <input
          bind:value={authorInput}
          type="text"
          class="text-neutral block w-full text-input bg-neutral-100 dark:bg-white"
          id="author"
          required />
      </div>

      <input
        type="submit"
        value="Post Comment"
        class="emphasis cursor-pointer bg-neutral-700 p-4 px-8 text-sm">
    </form>

    {#if comments && comments.length > 0}
      <ul class="space-y-12">
        {#each comments as comment}
          <li class="space-y-2">
            <div>
              <h2 class="font-bold inline dark:text-white text-neutral">{comment.author}</h2>
              -
              <span class="font-normal text-neutral-400">{formatRelativeTime(comment.created_at)}</span>
            </div>
            <p class="dark:text-white text-neutral">{comment.body}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
{/if}
