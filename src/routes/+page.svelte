<script>
	// Library Imports
	import { setScene } from '$lib/ThreeObject.js';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
    
	// Create a new wavy sphere scene
	let ThreeObject;

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
    });
</script>

<!-- Custom Cursor -->
<div class="cursor fixed pointer-events-none border-2 border-white p-[0.6rem] rounded-full mix-blend-difference z-10 ease-linear"></div>


<!-- Tristan Simpson Header -->
<h2 class="ml-60 mt-80 font-black text-2xl xl:text-2xl text-[#151550] font-sans" style="letter-spacing: 8px;" in:fade={{ delay: 300, duration: 1000 }}>
	CONNECT NOW
</h2>

<!-- Developer Header -->
<h2 class="ml-60 font-black text-7xl xl:text-9xl text-[#35d0ff] tracking-widest mt-6 font-sans" in:fade={{ delay: 1800, duration: 1000 }}>
	TELLU APP
</h2>

<!-- The 3D Wave Sphere -->
<canvas bind:this={ThreeObject} class="fixed top-0 right-[-30rem] outline-none h-[100vh] w-[100vw]" style="z-index: -1;"/>
