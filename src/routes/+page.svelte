<script lang="ts">
  // Imports
  import { LoadPhoneObjectWithGSAP } from "$lib/phoneObject";
  import { SetScene } from "$lib/base/scene";
  import { Palette } from "$lib/imports";
  import { onMount } from "svelte";

  // Component Imports
  import MainHeader from "./components/MainHeader.svelte";
  import Body from "./components/Body.svelte";

  // When the user loads up the website...
  let ThreeObject: any;
  onMount(async () => {
    let Scene: any = await SetScene(ThreeObject);
    await LoadPhoneObjectWithGSAP(Scene, Palette.Wallpapers.Posts);

    // Custom Cursor
    const CUSTOM_CURSOR: Element | null = document.querySelector(".cursor");
    if (CUSTOM_CURSOR) {
      document.addEventListener("mousemove", (e: any) => {
        CUSTOM_CURSOR.setAttribute(
          "style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
        );
      });
    }
  });
</script>

<!-- Custom Cursor -->
<div class="cursor fixed pointer-events-none border-2 border-white p-[0.6rem] rounded-full mix-blend-difference z-30 ease-linear"/>

<!--THREEJS Object Loading Header -->
<div id="loading-header" class="fade-in">
  <h2 class="flex justify-center items-center mt-96 text-gray-700 text-3xl font-black tracking-widest">
    LOADING<mark style="color: #35d0ff; background: none;">&nbsp;TELLU APP</mark>
  </h2>
  <div class="mx-[40rem] h-1 flex justify-center items-center bg-gray-200 mt-10 rounded-full"/>
</div>

<!-- Main -->
<div class="invisible lg:visible">
  <div id="main-div" class="fade-in hidden">
    <MainHeader />
    <Body />
  </div>

  <!-- The 3D Phone -->
  <canvas
    bind:this={ThreeObject}
    class="fade-in fixed top-0 ml-[28vw] outline-none"
    style="z-index: 1;"
  />
</div>

<!-- Styling -->
<style>
  .fade-out {
    animation: fade_out 1s;
    opacity: 0;
  }
  .fade-in {
    animation: fade_in 0.5s;
    opacity: 1;
  }
  @keyframes fade_out {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes fade_in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
