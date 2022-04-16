<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { loginStore } from "./stores.js";

    let isLoggedIn = false;

    loginStore.subscribe((value) => isLoggedIn = value);

    const navigate = useNavigate();
    const location = useLocation();

    $: if (!isLoggedIn) {
        navigate("/login", {
      state: { from: $location.pathname },
      replace: true,
    });
    }
</script>

<slot/>