<script lang="ts">
  import { onMount } from "svelte";

  let darkMode: boolean;

  function switchDarkMode() {
    darkMode = !darkMode;

    localStorage.setItem("theme", darkMode ? "dark" : "light");

    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }

  onMount(() => {
    darkMode = document.documentElement.classList.contains("dark");
  });
</script>

<button on:click={switchDarkMode}>
  {#if darkMode}
    Dark
  {:else}
    Light
  {/if}
</button>
