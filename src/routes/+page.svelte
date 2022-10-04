<script>
	import { user } from '../lib/sessionStore';
	import { supabase } from '../lib/supabaseClient';
	import Auth from '../lib/Auth.svelte';
	import Chat from '../lib/Chat.svelte';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
	});
</script>

<div>
	{#if $user}
		<Chat />
	{:else}
		<Auth />
	{/if}
</div>
