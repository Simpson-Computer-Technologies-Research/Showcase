
<script>
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

<!-- MORE INFO Section -->
<section class="section">
	<!-- MORE INFO Header -->
	<h2 class="ml-32 z-10 mt-36 absolute font-black text-lg pointer-events-none 2xl:text-2xl text-black font-sans" style="letter-spacing: 8px;">
		MORE INFORMATION
	</h2>

	<!-- TELLU APP Header -->
	<h2 class="ml-32 mt-48 z-10 absolute font-black text-8xl pointer-events-none 2xl:text-9xl text-white tracking-widest font-sans" >
		TELLU APP
	</h2>

	<!-- Download App Button -->
	<div class="ml-32 z-10 mt-96 h-20 absolute">
		<a class="font-black text-2xl text-black tracking-widest font-sans px-10 hover:text-white hover:px-20 bg-white shadow-xl hover:bg-black p-4 rounded-l-full duration-500 ease-in-out"
			href="#contact"
		>
			CONTACT US
		</a>
		<a class="font-black text-2xl text-black tracking-widest font-sans px-10 hover:text-white hover:px-20 bg-white shadow-xl hover:bg-black p-4 rounded-r-full duration-500 ease-in-out"
			href="#terms"
		>
			TERMS AND SERVICE
		</a>
	</div>
</section>