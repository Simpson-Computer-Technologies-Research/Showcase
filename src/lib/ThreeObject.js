// 3D Model Imports
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Three.js Basic Imports
import { OrbitControls } from '$lib/OrbitalControls.js';
import * as THREE from 'three';

// GSAP Imports (Scrolling Animations)
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP Defaults
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ scrub: 0, ease: "expo" });

// Establish a new scene
const SCENE = new THREE.Scene();
SCENE.add(new THREE.AmbientLight("#FFFFFF", 2.3));

// Camera
const CAMERA = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 100);
CAMERA.position.set(3, -0.5, 3);
SCENE.add(CAMERA);

// Point Lighting
const POINT_LIGHTING = new THREE.PointLight();
POINT_LIGHTING.position.set(1, 0, 1);
SCENE.add(POINT_LIGHTING);

// Directional Light
const DIRECT_LIGHTING = new THREE.DirectionalLight("#ffffee", 1);
DIRECT_LIGHTING.position.set(0, 0, -1);
SCENE.add(DIRECT_LIGHTING);

// Draco Loader for Blender Models
const DRACO_LOADER = new DRACOLoader()
DRACO_LOADER.setDecoderPath('/draco/')
DRACO_LOADER.setDecoderConfig({ type: 'js' })

// Loading Manager
const GLTF_LOADER = new GLTFLoader(new THREE.LoadingManager())
GLTF_LOADER.setDRACOLoader(DRACO_LOADER)

// Phone Model Variable
let PhoneModel;

// Phone Wallpaper Manipulation
const POSTS_WALLPAPER = new THREE.TextureLoader().load("./textures/posts_wallpaper.png");
const POLLS_WALLPAPER = new THREE.TextureLoader().load("./textures/polls_wallpaper.png");
const MAPS_WALLPAPER = new THREE.TextureLoader().load("./textures/maps_wallpaper.png");

let isWallpaperChanged = false;
const UpdatePhoneWallpaper = (model, wallpaper) => {
	model.traverse((obj) => {
		if (obj.name == "Body_Wallpaper_0") {
			obj.material.map = wallpaper;
			obj.material.needsUpdate = true;
		};
	});
	PhoneModel = model;
}

// Load the phone model
GLTF_LOADER.load('./iphone.gltf', (model) => {
	model.material = new THREE.MeshPhysicalMaterial({ roughness: 0, metalness: 1 })
	UpdatePhoneWallpaper(model.scene, POSTS_WALLPAPER)

	// Add the phone model to the scene and rotate
	// it so the screen is facing the user
    SCENE.add(PhoneModel);
	PhoneModel.rotation.set(-0.3, 2.9, 0);
	PhoneModel.scale.set(1.3, 1.3)
	
	// Section 1 Rotation
	gsap.timeline({ scrollTrigger: { scrub: 0, ease: "expo"} })
		.to(PhoneModel.rotation, {
			x: Math.PI * 3.9,
			onUpdate: () => {
				// Scroll Percentage
				const SCROLL_PERCENTAGE = Math.round(
					(window.scrollY / (document.body.offsetHeight - window.innerHeight)
				) * 100);

				// Posts Wallpaper
				if (SCROLL_PERCENTAGE < 20 & isWallpaperChanged) {
					UpdatePhoneWallpaper(PhoneModel, POSTS_WALLPAPER);
					isWallpaperChanged = false;
				}

				// Polls Wallpaper
				else if (SCROLL_PERCENTAGE > 20 & SCROLL_PERCENTAGE < 50 & !isWallpaperChanged) {
					UpdatePhoneWallpaper(PhoneModel, POLLS_WALLPAPER);
					isWallpaperChanged = true;
				}

				// Maps Wallpaper
				else if (SCROLL_PERCENTAGE > 50 & isWallpaperChanged) {
					UpdatePhoneWallpaper(PhoneModel, MAPS_WALLPAPER);
					isWallpaperChanged = false;
				}
			}
		})
});

// Establish Renderer and Controls Variables
let Renderer, Controls;

// Animation function
const animate = async () => {
    Renderer.render(SCENE, CAMERA);
	Controls.update();
    requestAnimationFrame(animate);
}

// The resize() function is used to resize the scene.
// This is required for if the user resizes the site,
// which is caught using the Window Resize Listener
export const resize = async () => {
	// Set the pixel ratio
	Renderer.setPixelRatio(window.devicePixelRatio);
	// Set the screen size
	Renderer.setSize(window.innerWidth, window.innerHeight);
	// Set the camera aspect ratio (most likely 16:9)
	CAMERA.aspect = window.innerWidth / window.innerHeight;
	// Update projection matrix
	CAMERA.updateProjectionMatrix();
};
// Window Resize Listener
window.addEventListener('resize', resize);

// The setScene() function is the primary function
// for updating the sphere's scene data.
export const setScene = async (canvas) => {
	// Scene Renderer
	Renderer = new THREE.WebGLRenderer({
		powerPreference: "high-performance",
		antialias: true,
		canvas: canvas
	});
	// Renderer Modifications
	Renderer.setPixelRatio(window.devicePixelRatio, 1);
	Renderer.setSize(window.innerWidth, window.innerHeight);
	Renderer.setClearColor(0x000000, 0);

	// Orbital Controls
	Controls = new OrbitControls(CAMERA, Renderer.domElement);
	Controls.enableZoom = false;
	Controls.rotateSpeed = 0.1;

	// Size the scene
	await resize();

	// Animate the sphere
	await animate();
};
