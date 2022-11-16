<script>
	// Library Imports
	import { setScene } from '$lib/ThreeObject.js';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
    
	// Create a new wavy sphere scene
	let ThreeObject;

	let test = false;

	// On site load
    onMount(async () => {
		// Set the threejs scene
		await setScene(ThreeObject);

		// Custom Cursor Selector
        const CUSTOM_CURSOR = document.querySelector('.cursor');

        // Custom Cursor Listener
        document.addEventListener('mousemove', (e) => 
            CUSTOM_CURSOR.style.cssText =`left: ${e.clientX - 11.5}px; top: ${e.clientY - 13}px;`, false
        );

		setTimeout(() => test = true)
    });
</script>

<!-- Custom Cursor -->
<div class="cursor fixed pointer-events-none border-2 border-white p-[0.6rem] rounded-full mix-blend-difference z-10 ease-linear"></div>

<!-- Tristan Simpson Header -->
<h2 class="ml-32 mt-48 font-black text-2xl pointer-events-none xl:text-2xl text-black font-sans" style="letter-spacing: 8px;" in:fade={{ delay: 300, duration: 1000 }}>
	UNPARALLEL CONNECTION
</h2>

<!-- TELLU APP Header -->
<h2 class="ml-32 font-black text-7xl pointer-events-none xl:text-9xl text-white tracking-widest mt-6 font-sans" in:fade={{ delay: 1800, duration: 1000 }}>
	TELLU APP
</h2>

<!-- Download App Button -->
<div class="ml-32 mt-12 h-20">
	<a class="font-black text-2xl text-black tracking-widest font-sans px-10 hover:text-white hover:px-20 bg-white shadow-xl hover:bg-black p-4 rounded-full duration-500 ease-in-out"
		href="https://apps.apple.com/us/app/tellu/id6443764288?itsct=apps_box_link&itscg=30200"
		rel="noopener noreferrer" target="_blank">
		DOWNLOAD NOW
	</a>
</div>

<!-- Triangle Background -->
<div class="box fixed top-0 w-screen h-screen bg-[#35d0ff]" style="z-index: -2;"></div>

<!-- The 3D Wave Sphere -->
<canvas bind:this={ThreeObject} class="fixed top-0 right-[-30rem] outline-none h-[100vh] w-[100vw]" style="z-index: -1;"/>

<style>

.box {
	clip-path: polygon(0 0, 0% 100%, 100% 0);
}
</style>