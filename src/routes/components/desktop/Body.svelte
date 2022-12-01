<script>
	// Imports
	import { Colors } from "$lib/defaults/Palette.js";
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
    
	// When the user loads up the website...
	let ScrollPercentage;
    onMount(async () => {
		window.onscroll = () => {
			ScrollPercentage = Math.round(
				(window.scrollY / (document.body.offsetHeight - window.innerHeight)
			) * 100);
      	};
    });
</script>

<!-- Bottom Scroll Indicator -->
<div class="fixed z-20 h-4 bottom-0 bg-gray-50 w-screen">
	<div class="fixed h-4 bottom-0 bg-[#000000]" style="width: {ScrollPercentage}%;"></div>
</div>

<!-- Polls -->
<section class="section mt-20 sticky top-32">
	<!-- POLLS -->
	{#if ScrollPercentage < 50 && ScrollPercentage > 20}
		<!-- Moving POLLS Backround Header -->
		<h1 style="left: -{ScrollPercentage}vw;" class="outlined absolute top-[-20rem] text-9xl pointer-events-none text-black tracking-widest font-sans" out:fade={{ duration: 300 }} in:fade={{ duration: 300 }}>
			POLLS
		</h1>

		<!-- Header -->
		<h2 class="absolute ml-32 font-black text-8xl pointer-events-none 2xl:text-9xl text-black tracking-widest font-sans" out:fade={{ duration: 300 }} in:fade={{ delay: 300, duration: 300 }}>
			POLLS
		</h2>

		<!-- Paragraph -->
		<h2 class="absolute ml-[8.5rem] mt-28 2xl:mt-36 font-thin text-lg pointer-events-none 2xl:text-2xl text-black font-sans" 
			style="letter-spacing: 8px;" 
			out:fade={{ duration: 300 }} in:fade={{ delay: 600, duration: 300 }}
		>
			Engage with <mark class="text-[#35d0ff] font-black" style="background: none;">Polls</mark> and <mark class="text-[#35d0ff] font-black" style="background: none;">Local News</mark>
		</h2>

	<!-- MAPS -->
	{:else if ScrollPercentage > 65}
		<!-- Moving MAPS Background Header-->
		<h1 style="right: -{ScrollPercentage - 30}vw;" class="outlined z-0 absolute top-[-20rem] pointer-events-none text-black tracking-widest font-sans" out:fade={{ duration: 300 }} in:fade={{ duration: 300 }}>
			MAPS
		</h1>

		<!-- Header -->
		<h2 class="absolute ml-32 font-black text-8xl pointer-events-none 2xl:text-9xl text-black tracking-widest font-sans" out:fade={{ duration: 300 }} in:fade={{ delay: 300, duration: 300 }}>
			MAPS
		</h2>

		<!-- Paragraph -->
		<h2 class="absolute ml-[8.5rem] mt-28 2xl:mt-36 font-thin text-lg pointer-events-none 2xl:text-2xl text-black font-sans" 
			style="letter-spacing: 8px;" 
			out:fade={{ duration: 300 }} in:fade={{ delay: 600, duration: 300 }}
		>
			Meetups made <mark class="text-[#35d0ff] font-black" style="background: none;">easy.</mark>
		</h2>
	{/if}
	<!-- Body Triangle Background -->
	<div class="w-screen h-[86vh] bg-[#35d0ff]" style="clip-path: polygon(100% 0, 0% 100%, 100% 100%);"></div>
</section>

<!-- Maps Divider -->
<div style="height: {window.innerHeight + 900}px;"></div>

<!-- Styling -->
<style>
	.outlined {
		font: 700 1000px Arial;
		color: #F5F5F5;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke: 10px;
	}
</style>