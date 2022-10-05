<script>
	import { user, userProfile } from '../lib/sessionStore';
	import { supabase } from '../lib/supabaseClient';
	import Auth from '../lib/Auth.svelte';
	import Chat from '../lib/Chat.svelte';
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';

	export let profile;

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
	});

	const getUserProfile = async (user) => {
		let { data: profile, error } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', user.id)
			.single();

		if (!error) {
			console.log('User Profile: ', profile);
			$userProfile = profile;
		}
	};

	if ($user) {
		console.log('USER:', $user);
		getUserProfile($user);
	}

	/** @type {import('./$types').PageData} */
	export let data;

	const pageRefresh = async () => {
		if (browser) {
			await invalidate('channel:update');
		}
	};

	const channel_subscription = supabase
		.from('channels')
		.on('INSERT', (data) => {
			console.log('REALTIME DATA:', data);
			pageRefresh();
		})
		.subscribe();

	console.log('DATA', data);
</script>

<div>
	{#if $user}
		<Chat channels={data.channels} />
	{:else}
		<Auth />
	{/if}
</div>
