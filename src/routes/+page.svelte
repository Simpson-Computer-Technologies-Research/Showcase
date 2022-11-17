<script>
	// Library Imports
	import { setScene } from '$lib/ThreeObject.js';
	import { onMount } from 'svelte';

	// Import Components
  	import Home from './components/Home.svelte';
  	import Polls from './components/Polls.svelte';
  	import Maps from './components/Maps.svelte';
    
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

<!-- Sections -->
<Home/>
<Polls/>
<Maps/>

<!-- The 3D Phone -->
<canvas bind:this={ThreeObject} class="fixed top-0 right-[-22rem] xl:right-[-30rem] outline-none h-[100vh] w-[100vw]"/>
