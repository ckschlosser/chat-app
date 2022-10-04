import { error } from '@sveltejs/kit';

import { user } from '../lib/sessionStore';
import { supabase } from '../lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: any) {
	let { data: channels, error } = await supabase.from('channels').select('*');

	if (!error) {
		return {
			channels,
			content: 'Welcome to our chat app.'
		};
	}
}
