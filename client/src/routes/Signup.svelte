<script>
    import { useNavigate } from "svelte-navigator";
    import { loginStore } from "../stores.js";
    const navigate = useNavigate();
    let emailInpput = "";
    let passwordInput = "";
    let loggedIn = false;
    let isSignUpForm = false;

    async function signUp() {
        const request = {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({email : emailInpput, password : passwordInput})
        }
        const response = await fetch("http://localhost:8080/signup", request);
        const { result } = await response.json();
        loggedIn = result === "success";
        console.log("result: ", result);
        if (loggedIn) {
            loginStore.set(true);
            navigate("/");
        }
    }

    async function signIn() {
        const request = {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({email : emailInpput, password : passwordInput})
        }
        const response = await fetch("http://localhost:8080/signin", request);
        const { result } = await response.json();
        loggedIn = result === "success";
        console.log("result: ", result);
        if (loggedIn) {
            loginStore.set(true);
            navigate("/");
        }
    }
</script>
<label for="email">Email: </label>
<input type="email" name="email" id="email" bind:value={emailInpput}> <br>
<label for="password">Password: </label>
<input type="password" name="password" id="password" bind:value={passwordInput}> <br>

{#if isSignUpForm}
<button on:click={signUp}>Sign up</button><br>
<span on:click={() => isSignUpForm = false}>Already have an account? Go to sign in</span>
{:else}
<button on:click={signIn}>Sign in</button><br>
<span on:click={() => isSignUpForm = true}>Don't have an account yet? Go to sign up</span>
{/if}

<style>
    span {
     cursor:pointer;
     color:blue;
     text-decoration:underline;
    }
</style>

