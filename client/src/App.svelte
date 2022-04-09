<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Test from "./routes/Test.svelte";
</script>

<Router>
	<span class="link-wrapper">
		<Link to="test" class="link">Go to /test</Link>
	</span>
	
	<Route path="test" component={Test} />
</Router>

<h1>Hello</h1>

<style>
	
	.link-wrapper :global(.link) {
        color: red;
    }

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>