<script>
    let emailInpput = "";
    let passwordInput = "";
    let loggedIn = false;

    async function signup() {
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
    }
</script>

{#if !loggedIn}
<label for="email">Email: </label>
<input type="email" name="email" id="email" bind:value={emailInpput}> <br>
<label for="password">Password: </label>
<input type="password" name="password" id="password" bind:value={passwordInput}> <br>
<button on:click={signup}>Signup</button>
{:else}
<p>You are now logged in</p>
{/if}

