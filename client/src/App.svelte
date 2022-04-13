<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Test from "./routes/Test.svelte";
	import Home from "./routes/Home.svelte";
	import Signup from "./routes/Signup.svelte";
	import signOut from "./scripts/signout.js";
	import { loginStore } from "./stores.js";


	let isLoggedIn = false;

	loginStore.subscribe((value) => isLoggedIn = value);


</script>

<Router>
	<nav class="link-wrapper">
		<Link to="/" class="header-link space-between first-link">Home</Link>
		<Link to="test" class="header-link space-between">Products</Link>
		<Link to="test" class="header-link space-between">Products</Link>
		<Link to="test" class="header-link align-left">Products</Link>
		
		{#if !isLoggedIn}
		<Link to="login" class="header-link align-right">Sign in</Link>
		{:else}
		<span class="header-link align-right" on:click={signOut}>Sign out</span>
		{/if}
	</nav>
	<main>
		<Route path="login" component={Signup}/>
		<Route path="test" component={Test} />
		<Route path="/" component={Home} />
	</main>

</Router>


<style>
	nav {
		display: flex;
		justify-content: center;
	}

	nav :global(.align-right) {
		margin-left: auto;
		margin-right: 20px;
	}

	nav :global(.align-left) {
		margin-right: auto;
	}

	nav :global(.space-between) {
		margin-right: 20px;
	}

	nav :global(.first-link) {
		margin-left: 10px;
	}
	
	nav {
		background-color: green;
		padding-top: 25px;
		padding-bottom: 25px;
	}



	nav :global(.header-link) {
		text-decoration: none;
		color: white;
		font-size: x-large;
	}

	.header-link {
		text-decoration: none;
		color: white;
		font-size: x-large;
		cursor: pointer;
	}

	nav :global(.header-link:hover) {
		text-decoration: underline;
	}

	:global(body) {
		margin: 0px;
		padding: 0px;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		margin-top: 10%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>