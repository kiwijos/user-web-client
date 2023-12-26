<script lang="ts">
	import { Ratings } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faCircle, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
	import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';

	const reviews = [
		{
			rating: 5.0,
			text: 'Det här är inte bara en app, det är en livsstil! Det är den här typen av innovationer som vi behöver för att klara av framtidens klimatutmaningar.',
			author: 'Elektra Skotersson, Chefredaktör på "Framtidsresenären"'
		},
		{
			rating: 4.5,
			text: 'Min upplevelse med appen är en elsparkcykel-dröm som går i uppfyllelse! Jag har provat alla andra appar, men ingen kan mäta sig med den här. Jag har blivit kär i min elsparkcykel!',
			author: 'ElektroGuru, Influencer'
		},
		{
			rating: 4.0,
			text: 'Jag har aldrig varit så här nöjd med en app förut. Den är så enkel att använda och jag kan inte tänka mig att någon annan app skulle kunna vara bättre. Jag har rekommenderat den till alla mina vänner och familjemedlemmar!',
			author: 'Elias Elsparksson, Elsparkcykelentusiast'
		},
		{
			rating: 5.0,
			text: 'Jag har testat alla elsparkcykelappar där ute, men den här slår dem alla! Det är som att ha en eldansande enhörning under mina fötter. Jag har aldrig känt mig så cool när jag rullar fram till jobbet varje morgon!',
			author: 'Sparko Elström, recensent på "Elsparkcykelmagasinet"'
		}
	];
</script>

{#each reviews as review}
	<div
		class="flex flex-col md:flex-row items-center gap-4 md:gap-8 rounded-container-token p-4 md:p-8"
	>
		<Ratings value={review.rating} max={5} class="md:!w-fit">
			<svelte:fragment slot="empty">
				<span class="text-3xl"><Fa icon={faCircleRegular} /></span>
			</svelte:fragment>
			<svelte:fragment slot="half">
				<span class="text-3xl">
					<Fa icon={faCircleHalfStroke} />
				</span>
			</svelte:fragment>
			<svelte:fragment slot="full">
				<span class="text-3xl"><Fa icon={faCircle} /></span>
			</svelte:fragment>
		</Ratings>
		<blockquote class="grow blockquote flex flex-col">
			"{review.text}"<span class="text-right font-medium">- {review.author}</span>
		</blockquote>
	</div>
{/each}
