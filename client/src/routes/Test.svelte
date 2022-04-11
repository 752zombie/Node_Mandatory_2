<script>
    getSecret();
    
    async function getSecret() {
        const response = await fetch("http://localhost:8080/secret");
        const { data } = await response.json();
        console.log(data);
    }
</script>
<h1>Hej med dig</h1>
<button on:click={getSecret}></button>