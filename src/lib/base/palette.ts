import { THREE } from "$lib/imports";

// Light Mode Phone Wallpapers
export const POSTS_WALLPAPER = new THREE.TextureLoader().load("./textures/posts_wallpaper.png");
export const POLLS_WALLPAPER = new THREE.TextureLoader().load("./textures/polls_wallpaper.png");
export const MAPS_WALLPAPER = new THREE.TextureLoader().load("./textures/maps_wallpaper.png");

// Dark Mode Phone Wallpapers
export const DARK_POSTS_WALLPAPER = new THREE.TextureLoader().load("./textures/dark_posts_wallpaper.png");
export const DARK_POLLS_WALLPAPER = new THREE.TextureLoader().load("./textures/dark_polls_wallpaper.png");
export const DARK_MAPS_WALLPAPER = new THREE.TextureLoader().load("./textures/dark_maps_wallpaper.png");

// To check whether the wallpaper is already changed
export let IsWallpaperChanged = false;

// Starts off with light mode
export let Colors = {
    Primary: "#35d0ff",
    Secondary: "#FFFFFF",
    Header: "#000000",
    Subheader: "#000000"
};

// Set the current wallpaper
export let Wallpapers = {
    Posts: POSTS_WALLPAPER,
    Polls: POLLS_WALLPAPER,
    Maps: MAPS_WALLPAPER
};

// Convert the color to light mode
export const ToLightMode = () => {
    Colors = {
        Primary: "",
        Secondary: "",
        Header: "",
        Subheader: ""
    }
    Wallpapers = {
        Posts: POSTS_WALLPAPER,
        Polls: POLLS_WALLPAPER,
        Maps: MAPS_WALLPAPER
    }
}

// Convert the color to dark mode
export const ToDarkMode = () => {
    Colors = {
        Primary: "",
        Secondary: "",
        Header: "",
        Subheader: ""
    }
    Wallpapers = {
        Posts: DARK_POSTS_WALLPAPER,
        Polls: DARK_POLLS_WALLPAPER,
        Maps: DARK_MAPS_WALLPAPER
    }
}

// Phone Wallpaper Manipulation
export const UpdatePhoneWallpaper = (model, wallpaper) => {
	model.traverse((obj) => {
		if (obj.name == "Body_Wallpaper_0") {
			obj.material.map = wallpaper;
			obj.material.needsUpdate = true;
		};
	});
    // Update the wallpaper change status
    IsWallpaperChanged = !IsWallpaperChanged;

    // Return the updated model
	return model;
}
