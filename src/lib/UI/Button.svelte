<script>
	export let type = 'button';
	export let caption;
	export let href = null;
	export let color;
</script>

{#if href}
	<a {href}>
		<button class="py-2 px-4 bg-{color} text-white hover:opacity-75 rounded-md mr-2" {type}>
			<slot />
		</button>
	</a>
{:else}
	<button class="py-2 px-4 bg-{color} text-white hover:opacity-75 rounded-md mr-2" {type}>
		<slot />
	</button>
{/if}
