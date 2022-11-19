<script>
	import MainHeader from "./components/MainHeader.svelte";
	import { LoadPhoneObject } from "$lib/PhoneObject.js";
	import Body from "./components/Body.svelte";
	import { SetScene } from "$lib/defaults/Scene.js";
	import { onMount } from "svelte";
    
	// When the user loads up the website...
	let ThreeObject;
    onMount(async () => {
		await SetScene(ThreeObject);
		await LoadPhoneObject();

		// Custom Cursor
        const CUSTOM_CURSOR = document.querySelector(".cursor");
        document.addEventListener("mousemove", (e) => 
            CUSTOM_CURSOR.style.cssText =`left: ${e.clientX - 11.5}px; top: ${e.clientY - 13}px;`, false
        );
    });
</script>

<!-- Custom Cursor -->
<div class="cursor fixed pointer-events-none border-2 border-white p-[0.6rem] rounded-full mix-blend-difference z-30 ease-linear"></div>

<!--THREEJS Object Loading Header -->
<div id="loading-header" class="fade-in">
	<h2 class="flex justify-center items-center mt-96 text-gray-700 text-3xl font-black tracking-widest">LOADING<mark style="color: #35d0ff; background: none;">&nbsp;TELLU APP</mark></h2>
	<div class="mx-[40rem] h-1 flex justify-center items-center bg-gray-200 mt-10 rounded-full"></div>
</div>

<!-- Main Header -->
<div id="main-div" class="fade-in hidden">
	<MainHeader/>
	<Body/>
</div>

<!-- The 3D Phone -->
<canvas bind:this={ThreeObject} class="fade-in fixed top-0 right-[-22rem] xl:right-[-30rem] outline-none h-screen w-screen"/>

<!-- Styling -->
<style>
	.fade-out { animation: fade_out 1s; opacity: 0; }
	.fade-in { animation: fade_in 0.5s; opacity: 1; }
	@keyframes fade_out { from { opacity: 1; } to { opacity: 0; } }
	@keyframes fade_in { from { opacity: 0; } to { opacity: 1; } }
</style>