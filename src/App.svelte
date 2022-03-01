<script>
	import { onMount } from "svelte";
	
	// store all variables into a svelte store for ease of access.
	import { results, server, client, nonce, mines, kenoSalt, hiloRounds, beautiesRounds, swordsRounds, risk, rows } from "./store";

	// Import the calculations for each game.
	import calculateHiLo from './lib/hilo';
	import calculateBeauties from './lib/beauties';
	import calculateMines from './lib/mines';
	import calculateSwords from './lib/swords';
	import calculateLimbo from './lib/limbo';
	import calculatePlinko from './lib/plinko';
	import { calculateClassicDice, calculateHashDice } from './lib/dice';
	import { calculateKeno, calculateKenoSingle } from './lib/keno'

	// Import the Result Components
	import Mines from './Components/Mines.svelte';
	import Keno from './Components/Keno.svelte';
	import HiLo from './Components/HiLo.svelte';
	import Beauties from './Components/Beauties.svelte';
	import Swords from './Components/Swords.svelte';
	import Dice from './Components/Dice.svelte';
	import Limbo from './Components/Limbo.svelte';
	import Plinko from './Components/Plinko.svelte';

	// This sets the available games.
	const games = [ "mines", "beauties", "swords", "hilo", "keno", "egyptian", "keno-single", "limbo", "classicdice", "hashdice", "plinko"].sort((a,b)=> a>b?1:a<b?-1:0);

	const risks = ['low', 'medium', 'high'];


	// Currected selected game.
	let game = games[0];

	// Handles changes to the form.
	function onChange() {
		if (!$server || !$client) return;

		switch (game) {
			case "keno": {
				const { resultList } = calculateKeno($server, $kenoSalt);
				$results = [...resultList];
				break;
			}
			case "keno-single": {
				const { resultList } = calculateKenoSingle( $server, $client, $nonce );
				$results = [...resultList];
				break;
			}
			case "mines": {
				const { resultList } = calculateMines($server, $client, $nonce);
				$results = [...resultList.slice(0, $mines)];
				break;
			}
			case "hilo": {
				const { resultList } = calculateHiLo( $server, $client, $nonce, $hiloRounds );
				$results = [...resultList];
				break;
			}
			case "beauties":{
				const { resultList } = calculateBeauties( $server, $client, $nonce, $beautiesRounds);
				$results = [...resultList];
				break;
			}
			case "swords":{
				const { resultList } = calculateSwords( $server, $client, $nonce, $swordsRounds );
				$results = [...resultList];
				break;
			}
			case "classicdice":{
				const { resultList } = calculateClassicDice( $server, $client, $nonce );
				$results = resultList;
				break;
			}
			case "hashdice":{
				const { resultList } = calculateHashDice( $server, $client, $nonce );
				$results = resultList;
				break;
			}
			case "limbo":{
				const { resultList } = calculateLimbo( $server, $client, $nonce );
				$results = resultList;
				break;
			}
			case "plinko":{
				const { resultList } = calculatePlinko( $server, $client, $nonce, $risk, $rows );
				$results = resultList;
				break;
			}
			default:
				break;
		}
	}
	onMount(onChange);
</script>

<svelte:head>
	<link rel="stylesheet" href="/assets/fonts/fonts.css">
</svelte:head>

<main>
	<header>
		<div class="corner">
			<a href="https://bcverify.gdoc.win">
				<img src="/assets/logo.png" alt="BCGAME Verification" />
			</a>
		</div>
		<div class="title">
			BCGAME Verification Tool
		</div>
		<div class="corner"/>
	</header>

	<form on:submit|preventDefault={onChange}>
		<div class="form-group games">
			<label for="games">Select a Game</label>
			<select bind:value={game} on:change={onChange}>
				{#each games as gameSelect}
					<option value={gameSelect}>{gameSelect}</option>
				{/each}
			</select>
		</div>
		<div class="form-group server">
			<label for="serverSeed">Server Seed (unhashed)</label>
			<input
				type="text"
				id="serverSeed"
				required
				bind:value={$server}
				on:input={onChange}
			/>
		</div>
		<div class="form-group client" class:hidden={game && game === "keno"}>
			<label for="clientSeed">Client Seed</label>
			<input
				type="text"
				id="clientSeed"
				required
				bind:value={$client}
				on:input={onChange}
			/>
		</div>
		<div class="form-group salt" class:hidden={game && game !== "keno"}>
			<label for="salt">Salt</label>
			<input
				type="text"
				id="salt"
				required
				bind:value={$kenoSalt}
				on:input={onChange}
				disabled
			/>
		</div>
		<div class="form-group nonce" class:hidden={game && game === "keno"}>
			<label for="nonce">Nonce</label>
			<input
				id="nonce"
				type="number"
				min="0"
				bind:value={$nonce}
				required
				on:input={onChange}
			/>
		</div>
		<div class="form-group rounds" class:hidden={game && game !== "hilo"}>
			<label for="rounds"># of Cards</label>
			<input
				id="rounds"
				type="number"
				min="1"
				bind:value={$hiloRounds}
				required
				on:input={onChange}
			/>
		</div>
		<div class="form-group mines" class:hidden={game && game !== "mines"}>
			<label for="mines"># of Mines</label>
			<select bind:value={$mines} on:change={onChange}>
				{#each [...new Array(24).keys()].map((m) => m + 1) as mines}
					<option value={mines}>{mines}</option>
				{/each}
			</select>
		</div>

		<div class="plinko-options" class:hidden={game && game !== "plinko"}>
			

		<div class="form-group rows">
			<label for="rows">Rows</label>
			<select bind:value={$rows} on:change={onChange}>
				{#each [...new Array(9).keys()].map((m) => m + 8) as rows}
					<option value={rows}>{rows}</option>
				{/each}
			</select>
		</div>

		<div class="form-group risk" >
			<label for="risk">Risk</label>
			<select bind:value={$risk} on:change={onChange}>
				{#each risks as risk}
					<option value={risk}>{risk}</option>
				{/each}
			</select>
		</div>
	</div>

	</form>

	<div class="results" class:enterseeds={!$server || !$client}>
		{#if game.includes("keno")}
			<Keno results={$results} />
		{:else if game.includes("dice")}
			<Dice results={$results} />	
		{:else if game === "mines"}
			<Mines results={$results} />
		{:else if game === "hilo"}
			<HiLo results={$results} />
		{:else if game === "beauties"}
			<Beauties results={$results} />
		{:else if game === "swords"}
			<Swords results={$results} />
		{:else if game === "limbo"}
			<Limbo results={$results} />
		{:else if game === "plinko"}
			<Plinko {...$results} />
		{:else}
			<div class="wip">Coming Soon...</div>
		{/if}
	</div>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
		/* background-color: rgb(95, 95, 95); */
		background-color: var(--result-container);
		color: white;
		border-radius: 10px;
	}
	header {
		display: flex;
		justify-content: space-between;
		margin: 1rem 0 2rem 0;
		
	}
	.title{
		font-family: 'Pill', Arial, sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
	}
	.corner {
		width: 3em;
		height: 3em;
	}
	.corner img{
		max-width: 100%;
		max-height: 100%;
	}
	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.form-group,
	.form-group input,
	.form-group select {
		width: 100%;
		border-radius: 0.25rem;
	}
	.wip {
		margin-top: 2rem;
	}
	.hidden {
		display: none;
	}
	label {
		display: inline-block;
		margin-bottom: 0.5rem;
	}
	.form-group select {
		text-transform: capitalize;
	}
	@media (min-width: 340px) {
		main {
			max-width: none;
		}
		.title{
			line-height: 2;
		}
	}
	@media (min-width: 640px) {
		main {
			max-width: 640px;
		}
		.title{
			font-size: 2.5rem;
			line-height: 1.25;
		}
	}
	@media (min-width: 1240px) {
		main {
			max-width: 1000px;
		}
		.title{
			font-size: 3rem;
			line-height: 1;
		}
	}
</style>
