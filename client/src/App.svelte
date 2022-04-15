<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Home from "./routes/Home.svelte";
	import Login from "./routes/Login.svelte";
	import signOut from "./scripts/signout.js";
	import Courses from "./routes/Courses.svelte";
	import { loginStore } from "./stores.js";


	let isLoggedIn = false;

	loginStore.subscribe((value) => isLoggedIn = value);


</script>

<Router>
	<nav class="link-wrapper">
		<Link to="/" class="header-link space-between first-link">Home</Link>
		<Link to="courses" class="header-link align-left">Courses</Link>
		
		{#if !isLoggedIn}
		<Link to="login" class="header-link align-right">Sign in</Link>
		{:else}
		<span class="header-link align-right" on:click={signOut}>Sign out</span>
		{/if}
	</nav>
	<main>
		<Route path="login" component={Login}/>
		<Route path="courses" component={Courses} />
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

	nav :global(.first-link) {
		margin-left: 10px;
		margin-right: 20px;
	}
	
	nav {
		background-color: rgb(72, 72, 199);
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
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>