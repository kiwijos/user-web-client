<script lang="ts">
	import githubLogo from '$lib/assets/icons/github-mark.svg';
	import githubLogoWhite from '$lib/assets/icons/github-mark-white.svg';
	import { onMount } from 'svelte';

	let logo: string;
	onMount(() => {
		// pick the logo color based on the theme
		logo = document.documentElement.classList.contains('dark') ? githubLogoWhite : githubLogo;
	});
	export let width = 'w-6';
	let height = width.replace('w', 'h');
</script>

<img src={logo} class="{width} {height}" alt="GitHub mark" />
