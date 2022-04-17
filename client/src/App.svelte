<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Home from "./routes/Home.svelte";
	import Login from "./routes/Login.svelte";
	import signOut from "./scripts/signout.js";
	import Courses from "./routes/Courses.svelte";
	import Checkout from "./routes/Checkout.svelte";
	import Confirmation from "./routes/Confirmation.svelte";
	import { loginStore, basketStore } from "./stores.js";
	import PrivateRoute from "./PrivateRoute.svelte";
	import {navigate} from "svelte-navigator";


	let isLoggedIn = false;
	let basket = [];

	let basketAmount;

	$: basketAmount = basket.reduce((prev, next) => prev + next.amount, 0);

	loginStore.subscribe((value) => isLoggedIn = value);
	basketStore.subscribe((value) => {basket = value; console.log(basket)});


</script>

<Router>
	<nav class="link-wrapper">
		<Link to="/" class="header-link space-between first-link">Home</Link>
		<Link to="courses" class="header-link align-left">Courses</Link>

		<Link to="checkout" class="header-link align-right" id="cart">Cart ({basketAmount})</Link>
		
		{#if !isLoggedIn}
		<Link to="login" class="header-link align-right">Sign in</Link>
		{:else}
		<span class="header-link align-right" on:click={() => signOut(navigate)}>Sign out</span>
		{/if}
	</nav>
	<main>
		<Route path="login" component={Login}/>
		<Route path="courses" component={Courses} />
		<Route path="/" component={Home} />
		<Route path="confirmation" component={Confirmation} />
		<PrivateRoute path="checkout" let:location>
			<Checkout/>
		</PrivateRoute>
	</main>

</Router>


<style>
	nav {
		display: flex;
		justify-content: center;
	}

	nav :global(.align-right) {
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

	nav :global(#cart) {
		background-color: green;
		margin-left: auto;
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