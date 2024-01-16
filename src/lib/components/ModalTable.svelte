<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	/**
	 * Makes parent props available to this component.
	 */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Table Data
	const { headers, values } = $modalStore[0].meta ?? {};

	// Base Classes (from Skeleton + Tailwind)
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
	<div class="{cBase} {parent.background}">
		<header class={cHeader}>{$modalStore[0].title ?? ''}</header>
		<article>{$modalStore[0].body ?? ''}</article>
		<table class="w-full text-left border-b border-t dark:border-surface-800">
			<tbody class="overflow-y-scroll text-surface-700 dark:text-surface-300">
				{#each headers as header, index}
					<tr class="text-sm odd:bg-surface-50 odd:dark:bg-surface-500/5">
						<td class="px-4 py-2 font-medium">{header}</td>
						<td class="px-4 py-2">{values[index]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
