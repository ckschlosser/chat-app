<script lang="ts">
	import { supabase } from './supabaseClient';
	import NewChannelForm from '../lib/components/NewChannelForm.svelte';
	import { userProfile } from '../lib/sessionStore';
	import Messages from './components/Messages.svelte';

	export let channels: any;

	let selected_channel;

	let createChannel = false;

	let showForm = () => {
		createChannel = true;
	};

	let cancelChannel = () => {
		createChannel = null;
	};

	let addChannel = async (event) => {
		// Supabase - insert statement
		const { data, error } = await supabase
			.from('channels')
			.insert([{ name: event.detail.name, description: event.detail.description }]);

		if (!error) {
			createChannel = false;
		}
	};

	const channelSelected = (channel) => {
		selected_channel = channel;
	};

	/*const getChannels = async function () {
		let { data: channels, error } = await supabase.from('channels').select('*');
		console.log('Channels', channels);
	};*/

	/*export function load({ data }) {
		console.log('DATA', data);
		return {
			channels
		};
	}*/
</script>

<!-- Background color split screen for large screens -->
<div class="fixed top-0 left-0 h-full w-1/2 bg-white" aria-hidden="true" />
<div class="fixed top-0 right-0 h-full w-1/2 bg-gray-50" aria-hidden="true" />
<div class="relative flex min-h-full flex-col">
	<!-- Navbar -->
	<nav class="flex-shrink-0 bg-indigo-600">
		<div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
			<div class="relative flex h-16 items-center justify-between">
				<!-- Logo section -->
				<div class="flex items-center px-2 lg:px-0 xl:w-64">
					<div class="flex-shrink-0">
						<img
							class="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
							alt="Your Company"
						/>
					</div>
				</div>

				<!-- Search section -->
				<div class="flex flex-1 justify-center lg:justify-end">
					<div class="w-full px-2 lg:px-6">
						<label for="search" class="sr-only">Search projects</label>
						<div class="relative text-indigo-200 focus-within:text-gray-400">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<!-- Heroicon name: mini/magnifying-glass -->
								<svg
									class="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<input
								id="search"
								name="search"
								class="block w-full rounded-md border border-transparent bg-indigo-400 bg-opacity-25 py-2 pl-10 pr-3 leading-5 text-indigo-100 placeholder-indigo-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
								placeholder="Search projects"
								type="search"
							/>
						</div>
					</div>
				</div>
				<div class="flex lg:hidden">
					<!-- Mobile menu button -->
					<button
						type="button"
						class="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
						aria-controls="mobile-menu"
						aria-expanded="false"
					>
						<span class="sr-only">Open main menu</span>
						<!--
              Icon when menu is closed.

              Heroicon name: outline/bars-3-center-left

              Menu open: "hidden", Menu closed: "block"
            -->
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
							/>
						</svg>
						<!--
              Icon when menu is open.

              Heroicon name: outline/x-mark

              Menu open: "block", Menu closed: "hidden"
            -->
						<svg
							class="hidden h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<!-- Links section -->
				<div class="hidden lg:block lg:w-80">
					<div class="flex items-center justify-end">
						<div class="flex">
							<a
								href="#"
								class="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white"
								aria-current="page">Dashboard</a
							>
						</div>
						<!-- Profile dropdown -->
						<div class="relative ml-4 flex-shrink-0">
							<div>
								<button
									type="button"
									class="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
									id="user-menu-button"
									aria-expanded="false"
									aria-haspopup="true"
								>
									<span class="sr-only">Open user menu</span>
									<img
										class="h-8 w-8 rounded-full"
										src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
										alt=""
									/>
								</button>
							</div>

							<!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
							<!-- <div
								class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu-button"
								tabindex="-1"
							>

								<a
									href="#"
									class="block px-4 py-2 text-sm text-gray-700"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-0">Your Profile</a
								>

								<a
									href="#"
									class="block px-4 py-2 text-sm text-gray-700"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-1">Settings</a
								>

								<a
									href="#"
									class="block px-4 py-2 text-sm text-gray-700"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-2">Sign out</a
								>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on menu state. -->
		<div class="lg:hidden" id="mobile-menu">
			<div class="space-y-1 px-2 pt-2 pb-3">
				<!-- Current: "text-white bg-indigo-800", Default: "text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600" -->
				<a
					href="#"
					class="text-white bg-indigo-800 block px-3 py-2 rounded-md text-base font-medium"
					aria-current="page">Dashboard</a
				>

				<a
					href="#"
					class="text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
					>Domains</a
				>
			</div>
			<div class="border-t border-indigo-800 pt-4 pb-3">
				<div class="space-y-1 px-2">
					<a
						href="#"
						class="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
						>Your Profile</a
					>

					<a
						href="#"
						class="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
						>Settings</a
					>

					<a
						href="#"
						class="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
						>Sign out</a
					>
				</div>
			</div>
		</div>
	</nav>

	<!-- 3 column wrapper -->
	<div class="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
		<!-- Left sidebar & main wrapper -->
		<div class="min-w-0 flex-1 bg-white xl:flex">
			<!-- Account profile -->
			<div class="bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
				<div class="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
					<div class="flex items-center justify-between">
						<div class="flex-1 space-y-8">
							<div
								class="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8"
							>
								<!-- Profile -->
								<div class="flex items-center space-x-3">
									<div class="h-12 w-12 flex-shrink-0">
										<img
											class="h-12 w-12 rounded-full"
											src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
											alt=""
										/>
									</div>
									<div class="space-y-1">
										<div class="text-sm font-medium text-gray-900">
											{#if $userProfile}{$userProfile.name}{/if}
										</div>
										<a href="#" class="group flex items-center space-x-2.5">
											<svg
												class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
												fill="currentColor"
												viewBox="0 0 20 20"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
													clip-rule="evenodd"
												/>
											</svg>
											{#if $userProfile.github_id}
												<span class="text-sm font-medium text-gray-500 group-hover:text-gray-900"
													>{$userProfile.github_id}</span
												>
											{/if}
										</a>
									</div>
								</div>
								<!-- Action buttons -->
								<div class="flex flex-col sm:flex-row xl:flex-col">
									<button
										class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xl:w-full"
										on:click={showForm}>New Channel</button
									>
									{#if createChannel}
										<NewChannelForm on:save={addChannel} on:cancel={cancelChannel} />
									{/if}
								</div>
							</div>
							<!-- Meta info -->
							<div
								class="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6"
							>
								{#each channels as channel}
									<div class="flex items-center space-x-2">
										<!-- Heroicon name: mini/check-badge -->
										<svg
											class="h-5 w-5 text-gray-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
												clip-rule="evenodd"
											/>
										</svg>
										<button
											on:click={() => channelSelected(channel)}
											class="text-sm font-medium text-gray-500 ">{channel.name}</button
										>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Projects List -->
			<div class="bg-white lg:min-w-0 lg:flex-1">
				<div
					class="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6"
				>
					<div class="flex items-center">
						<h1 class="flex-1 text-lg font-medium uppercase">
							{#if selected_channel}
								{selected_channel.name}
							{:else}
								{channels[0].name}
							{/if}
						</h1>
						<div class="relative">
							<button
								type="button"
								class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								id="sort-menu-button"
								aria-expanded="false"
								aria-haspopup="true"
							>
								<!-- Heroicon name: mini/bars-arrow-up -->
								<svg
									class="mr-3 h-5 w-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M2 3.75A.75.75 0 012.75 3h11.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zM2 7.5a.75.75 0 01.75-.75h6.365a.75.75 0 010 1.5H2.75A.75.75 0 012 7.5zM14 7a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02l-1.95-2.1v6.59a.75.75 0 01-1.5 0V9.66l-1.95 2.1a.75.75 0 11-1.1-1.02l3.25-3.5A.75.75 0 0114 7zM2 11.25a.75.75 0 01.75-.75H7A.75.75 0 017 12H2.75a.75.75 0 01-.75-.75z"
										clip-rule="evenodd"
									/>
								</svg>
								Sort
								<!-- Heroicon name: mini/chevron-down -->
								<svg
									class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
							<!-- Dropdown menu, show/hide based on menu state. -->
							<div
								class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="sort-menu-button"
								tabindex="-1"
							>
								<!-- <div class="py-1" role="none">
									<a
										href="#"
										class="text-gray-700 block px-4 py-2 text-sm"
										role="menuitem"
										tabindex="-1"
										id="sort-menu-item-0">Name</a
									>
									<a
										href="#"
										class="text-gray-700 block px-4 py-2 text-sm"
										role="menuitem"
										tabindex="-1"
										id="sort-menu-item-1">Date modified</a
									>
									<a
										href="#"
										class="text-gray-700 block px-4 py-2 text-sm"
										role="menuitem"
										tabindex="-1"
										id="sort-menu-item-2">Date created</a
									>
								</div> -->
							</div>
						</div>
					</div>
				</div>
				{#if selected_channel}
					<Messages channel={selected_channel} />
				{:else}
					<Messages channel={channels[0]} />
				{/if}
			</div>
		</div>
		<!-- Activity feed -->
		<div
			class="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0"
		>
			<div class="pl-6 lg:w-80">
				<div class="pt-6 pb-2">
					<h2 class="text-sm font-semibold">Activity</h2>
				</div>
				<div>
					<ul role="list" class="divide-y divide-gray-200">
						<li class="py-4">
							<div class="flex space-x-3">
								<img
									class="h-6 w-6 rounded-full"
									src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
									alt=""
								/>
								<div class="flex-1 space-y-1">
									<div class="flex items-center justify-between">
										<h3 class="text-sm font-medium">You</h3>
										<p class="text-sm text-gray-500">1h</p>
									</div>
									<p class="text-sm text-gray-500">
										Deployed Workcation (2d89f0c8 in master) to production
									</p>
								</div>
							</div>
						</li>

						<!-- More items... -->
					</ul>
					<div class="border-t border-gray-200 py-4 text-sm">
						<a href="#" class="font-semibold text-indigo-600 hover:text-indigo-900">
							View all activity
							<span aria-hidden="true"> &rarr;</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
