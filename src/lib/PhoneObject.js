import { GLTFLoader, Palette, THREE, GSAP } from "$lib/Imports.js";
import { SCENE, DRACO_LOADER } from "$lib/defaults/Scene.js";

// Phone Model Variable
let PhoneModel;

// Load the 3D Object
const GLTF_LOADER = new GLTFLoader(new THREE.LoadingManager(
	// OnLoad
	() => {
		// Loading Header
		const LOADING_HEADER = document.getElementById("loading-header");
		LOADING_HEADER.classList.add("hidden");
		LOADING_HEADER.classList.add("fade-out");

		// Show Main Div
		document.getElementById("main-div").classList.remove("hidden");
	}, 
	// OnProgress
	(obj) => console.log(`Loaded Object: ${obj}`)
));
GLTF_LOADER.setDRACOLoader(DRACO_LOADER);

// Load the phone model
export const LoadPhoneObject = async () => GLTF_LOADER.load('./iphone.gltf', (model) => {
	model.material = new THREE.MeshPhysicalMaterial({ roughness: 0, metalness: 1 });

	// Set the new PhoneModel variable
	PhoneModel = Palette.UpdatePhoneWallpaper(model.scene, Palette.Wallpapers.Posts);
	PhoneModel.rotation.set(-0.3, 2.9, 0);
	PhoneModel.scale.set(1.3, 1.3);
	SCENE.add(PhoneModel);
	
	// Phone Rotation
	GSAP.timeline({ scrollTrigger: { scrub: 0, ease: "expo"} })
		.to(PhoneModel.rotation, {
			x: Math.PI * 3.9,
			onUpdate: () => {
				// Scroll Percentage
				const SCROLL_PERCENTAGE = Math.round(
					(window.scrollY / (document.body.offsetHeight - window.innerHeight)
				) * 100);

				// Posts Wallpaper
				if (SCROLL_PERCENTAGE < 20 & Palette.IsWallpaperChanged) 
					PhoneModel = Palette.UpdatePhoneWallpaper(PhoneModel, Palette.Wallpapers.Posts);
				
				// Polls Wallpaper
				else if (SCROLL_PERCENTAGE > 20 & SCROLL_PERCENTAGE < 50 & !Palette.IsWallpaperChanged) 
					PhoneModel = Palette.UpdatePhoneWallpaper(PhoneModel, Palette.Wallpapers.Polls);
				
				// Maps Wallpaper
				else if (SCROLL_PERCENTAGE > 50 & Palette.IsWallpaperChanged) 
					PhoneModel = Palette.UpdatePhoneWallpaper(PhoneModel, Palette.Wallpapers.Maps);
			}
		});
});
