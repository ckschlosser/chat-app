<script>
	import { user } from '../lib/sessionStore';
	import { supabase } from '../lib/supabaseClient';
	import Auth from '../lib/Auth.svelte';
	import Chat from '../lib/Chat.svelte';
	import { invalidate } from '$app/navigation';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
	});

	/** @type {import('./$types').PageData} */
	export let data;

	const pageRefresh = async () => {
    	await invalidate('channel:update');
  	}

	const channel_subscription = supabase
	.from('channels')
	.on('INSERT', (data) => {
		console.log('REALTIME DATA:', data)
		pageRefresh()
	})
	.subscribe()

	console.log('DATA', data);
</script>

<div>
	{#if $user}
		<Chat channels={data.channels} />
	{:else}
		<Auth />
	{/if}
</div>
