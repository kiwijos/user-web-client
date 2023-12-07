<script lang="ts">
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="flex space-x-4 items-end">
	<Avatar src={$page.data.user.avatar} initials={$page.data.user.name[0]} />
	<div>
		<p class="text-2xl">{$page.data.user.name}</p>
		<p class="text-gray-500 dark:text-gray-400">{$page.data.user.email}</p>
	</div>
</div>
