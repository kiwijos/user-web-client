<script lang="ts">
	import '../app.pcss';
	import { autoModeWatcher, LightSwitch } from '@skeletonlabs/skeleton';
	import { Toast, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import ModalTable from '$lib/components/ModalTable.svelte';

	import { initializeStores } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const modalRegistry: Record<string, ModalComponent> = {
		// Pass the component reference
		modalTable: { ref: ModalTable }
	};

	initializeStores();
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>
<Modal components={modalRegistry} />
<Toast />
<slot />
<div class="fixed bottom-0 right-0 z-50 p-4">
	<LightSwitch />
</div>
