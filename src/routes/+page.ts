import { error } from '@sveltejs/kit';

import { user } from '../lib/sessionStore';
import { supabase } from '../lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ depends }: any) {
	depends('channel:update');

	let { data: channels, error } = await supabase.from('channels').select(`
			id, 
			created_at,
			name,
			description,
			messages (
				*
			)
		`);

	if (!error) {
		return {
			channels,
			content: 'Welcome to our chat app.'
		};
	}
}
