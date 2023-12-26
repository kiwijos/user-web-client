<script lang="ts">
	import Fa from 'svelte-fa';
	import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import type { PageData } from './$types';

	import FakeReviews from '$lib/components/FakeReviews.svelte';

	export let data: PageData;

	let elemCarousel: HTMLDivElement;

	function carouselLeft(): void {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop back to end
				: elemCarousel.scrollLeft - elemCarousel.clientWidth / 2; // step left one item
		elemCarousel.scroll(x, 0);
	}

	function carouselRight(): void {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop back to start
				: elemCarousel.scrollLeft + elemCarousel.clientWidth / 2; // step right one item
		elemCarousel.scroll(x, 0);
	}

	function carouselThumbnail(index: number) {
		elemCarousel.scroll((elemCarousel.clientWidth / 2) * index, 0);
	}
</script>

<div role="main">
	<div
		class="bg-gradient-to-br from-primary-500 via-tertiary-300 to-secondary-400 dark:from-tertiary-800 dark:via-tertiary-900 dark:to-primary-800"
	>
		<div
			class="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-center align-center p-4 md:p-8 py-16"
		>
			<div
				class="col-span-1 sm:col-span-2 md:col-span-3 text-center text-white dark:text-surface-300 space-y-4 pb-8 pt-16"
			>
				<h1 class="font-bold text-4xl sm:text-5xl md:text-6xl text-center">
					Framtiden på två hjul är här!
				</h1>
				<p class="text:xl md:text-2xl font-medium">Bli en Rider och gör skillnad.</p>
			</div>
			<button
				class="btn variant-glass-primary flex flex-col text-center text-white dark:text-surface-300"
			>
				<h2 class="h2 font-bold">3</h2>
				<p>städer i Sverige</p>
			</button>
			<button
				class="btn variant-glass-primary flex flex-col text-center text-white dark:text-surface-300"
			>
				<h2 class="h2 font-bold">22,2+</h2>
				<p>tusen användare</p>
			</button>
			<button
				class="sm:col-span-2 md:col-span-1 btn variant-glass-primary flex flex-col text-center text-white dark:text-surface-300"
			>
				<h2 class="h2 font-bold">1,3+</h2>
				<p>tusen elsparkcyklar</p>
			</button>
		</div>
	</div>
	<div
		class="carousel grid grid-cols-[auto_1fr_auto] gap-0 md:gap-8 items-center px-4 md:px-8 py-16"
	>
		<button
			type="button"
			class="hidden md:flex btn-icon bg-white dark:bg-surface-800 dark:text-surface-300"
			on:click={carouselLeft}
		>
			<Fa icon={faArrowLeft} />
		</button>
		<div
			bind:this={elemCarousel}
			class="snap-x snap-mandatory scroll-smooth flex gap-4 md:gap-8 overflow-x-auto px-4 py-8 md:py-16 scrollbar-hide"
		>
			{#each data.props.cards as card, i}
				<button
					class="snap-center drop-shadow-lg flex flex-col justify-between shrink-0 card w-3/4 sm:w-5/6 lg:w-4/5 space-y-4 text-left p-4 md:p-16 bg-gradient-to-br odd:text-white dark:text-surface-300 odd:from-primary-500 odd:via-tertiary-300 odd:to-secondary-400 dark:odd:from-tertiary-800 dark:odd:via-tertiary-900 dark:odd:to-primary-800"
					on:click={() => carouselThumbnail(i)}
				>
					<div class="space-y-4">
						<h2 class="h2 font-bold">{card.title}</h2>
						<p>{card.description}</p>
					</div>
					<a href={card.link} class="btn md:btn-sm variant-filled-primary !text-white">{card.cta}</a
					>
				</button>
			{/each}
		</div>
		<button
			type="button"
			class="hidden md:flex btn-icon bg-white dark:bg-surface-800 dark:text-surface-300"
			on:click={carouselRight}
		>
			<Fa icon={faArrowRight} />
		</button>
	</div>
	<div
		class="bg-gradient-to-br text-white dark:text-primary-100 from-primary-500 via-tertiary-300 to-secondary-400 dark:from-tertiary-800 dark:via-tertiary-900 dark:to-primary-800"
	>
		<div class="mx-auto max-w-4xl px-4 md:px-8 py-16 flex flex-col gap-8">
			<FakeReviews />
		</div>
	</div>
</div>
