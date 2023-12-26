<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-auto max-w-4xl p-4 md:p-8">
	<h1 class="h1 capitalize">{data.title}</h1>
</div>
