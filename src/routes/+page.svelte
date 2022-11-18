<script>
	// Library Imports
	import MainHeader from './components/MainHeader.svelte';
	import { setScene } from '$lib/ThreeObject.js';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
    
	// When the user loads up the website...
	let ThreeObject, ScrollPercentage;
    onMount(async () => {
		await setScene(ThreeObject);

		// Get the scroll percentage
		window.onscroll = () => {
			ScrollPercentage = Math.round(
				(window.scrollY / (document.body.offsetHeight - window.innerHeight)
			) * 100);
      	};

		// Custom Cursor
        const CUSTOM_CURSOR = document.querySelector('.cursor');
        document.addEventListener('mousemove', (e) => 
            CUSTOM_CURSOR.style.cssText =`left: ${e.clientX - 11.5}px; top: ${e.clientY - 13}px;`, false
        );
    });
</script>

<!-- Bottom Scroll Indicator -->
<div class="fixed z-20 h-4 bottom-0 bg-gray-50 w-screen">
	<div class="z-20 fixed h-4 bottom-0 bg-[#b5eeff]" style="width: {ScrollPercentage}%;"></div>
</div>

<!-- Custom Cursor -->
<div class="cursor fixed pointer-events-none border-2 border-white p-[0.6rem] rounded-full mix-blend-difference z-10 ease-linear"></div>

<!-- Main Header -->
<MainHeader/>

<!-- Polls -->
<section class="section mt-20 sticky top-32">
	<!-- POLLS -->
	{#if ScrollPercentage < 50 && ScrollPercentage > 20}
		<!-- Moving POLLS Backround Header -->
		<h1 style="left: -{ScrollPercentage}rem; z-index: -1;" class="outlined absolute top-[-20rem] text-9xl pointer-events-none text-black tracking-widest font-sans" out:fade={{ duration: 300 }} in:fade={{ duration: 300 }}>
			POLLS
		</h1>

		<!-- Header -->
		<h2 class="absolute ml-32 font-black text-8xl pointer-events-none 2xl:text-9xl text-black tracking-widest font-sans" out:fade={{ duration: 300 }} in:fade={{ delay: 300, duration: 300 }}>
			POLLS
		</h2>

		<!-- Paragraph -->
		<h2 class="absolute ml-[8.5rem] mt-36 font-thin text-lg pointer-events-none 2xl:text-2xl text-black font-sans" 
			style="letter-spacing: 8px;" 
			out:fade={{ duration: 300 }} in:fade={{ delay: 600, duration: 300 }}
		>
			Engage using <mark class="text-[#35d0ff] font-black" style="background: none;">Polls</mark> and <mark class="text-[#35d0ff] font-black" style="background: none;">Local News</mark>
		</h2>

	<!-- MAPS -->
	{:else if ScrollPercentage > 65}
		<!-- Moving MAPS Background Header-->
		<h1 style="right: -{ScrollPercentage - 30}rem; z-index: -1;" class="outlined absolute top-[-20rem] text-9xl pointer-events-none text-black tracking-widest font-sans" out:fade={{ duration: 300 }} in:fade={{ duration: 300 }}>
			MAPS
		</h1>

		<!-- Header -->
		<h2 class="absolute ml-32 font-black text-8xl pointer-events-none 2xl:text-9xl text-black tracking-widest font-sans" out:fade={{ duration: 300 }} in:fade={{ delay: 300, duration: 300 }}>
			MAPS
		</h2>

		<!-- Paragraph -->
		<h2 class="absolute ml-[8.5rem] mt-36 font-thin text-lg pointer-events-none 2xl:text-2xl text-black font-sans" 
			style="letter-spacing: 8px;" 
			out:fade={{ duration: 300 }} in:fade={{ delay: 600, duration: 300 }}
		>
			Meetups made <mark class="text-[#35d0ff] font-black" style="background: none;">easy.</mark>
		</h2>
	{/if}

	<!-- Triangle Background -->
	<div class="w-screen h-[86vh] bg-[#35d0ff]" style="z-index: -1; clip-path: polygon(100% 0, 0% 100%, 100% 100%);"></div>
</section>

<!-- Maps Divider -->
<div style="height: {window.innerHeight + 900}px;"></div>

<!-- The 3D Phone -->
<canvas bind:this={ThreeObject} class="fixed top-0 right-[-22rem] xl:right-[-30rem] outline-none h-screen w-screen"/>

<!-- Styling -->
<style>
	.outlined {
		font: 700 1000px Arial;
		color: #e0e0e0;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke: 2px;
	}
</style>