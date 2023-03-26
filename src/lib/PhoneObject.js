import { GLTFLoader, Palette, THREE, GSAP } from "$lib/Imports.js";
import { DRACO_LOADER, Controls as OrbitalControls } from "$lib/defaults/Scene.js";

// Load the 3D Object
const GLTF_LOADER = new GLTFLoader(new THREE.LoadingManager(
	onload = () => {
		// Hide the loading header
		document.getElementById("loading-header")
			.classList
			.add("hidden", "fade-out");

		// Show the main div
		document.getElementById("main-div")
			.classList
			.remove("hidden");
	},
	onprogress = (obj) => console.log(`Object Loaded: ${obj}`)
));
GLTF_LOADER.setDRACOLoader(DRACO_LOADER);

// Load the phone model with GSAP
export const LoadPhoneObjectWithGSAP = async (Scene, Wallpaper) => GLTF_LOADER.load('./iphone.glb', async (model) => {
	model.material = new THREE.MeshPhysicalMaterial({ roughness: 0, metalness: 1 });

	// Set the new model variable
	model = Palette.UpdatePhoneWallpaper(model.scene, Wallpaper);
	model.scale.set(1.3, 1.3);
	model.rotation.set(-0.3, 2.9, 0);
	Scene.add(model);
	
	// Phone Rotation
	GSAP.timeline({ scrollTrigger: { scrub: 0, ease: "expo"} })
		.to(model.rotation, {
			x: Math.PI * 3.9,
			onUpdate: () => {
				// Scroll Percentage
				const SCROLL_PERCENTAGE = (
					window.scrollY / (document.body.offsetHeight - window.innerHeight)
				) * 100;

				// Posts Wallpaper
				if (SCROLL_PERCENTAGE < 20 & Palette.IsWallpaperChanged) 
					model = Palette.UpdatePhoneWallpaper(model, Palette.Wallpapers.Posts);
				
				// Polls Wallpaper
				else if (SCROLL_PERCENTAGE > 20 & SCROLL_PERCENTAGE < 50 & !Palette.IsWallpaperChanged) 
					model = Palette.UpdatePhoneWallpaper(model, Palette.Wallpapers.Polls);
				
				// Maps Wallpaper
				else if (SCROLL_PERCENTAGE > 50 & Palette.IsWallpaperChanged) 
					model = Palette.UpdatePhoneWallpaper(model, Palette.Wallpapers.Maps);
			}
		});
});
