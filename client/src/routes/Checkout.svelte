<script>
    import { basketStore } from "../stores.js";
    import { useNavigate } from "svelte-navigator";
	
    const navigate = useNavigate();

    let currentError = "";

    let basket = [];
    basketStore.subscribe(basketFromStore => basket = basketFromStore);

    $: totalPrice = basket.reduce((prev, next) => prev + next.amount * next.price, 0);

    async function checkOut() {
        const request = {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({courses : basket})
        }
        const response = await fetch("http://localhost:8080/checkout", request);
        const data = await response.json();

        if (data.result === "success") {
            //remove all items from basket
            basket = [];
            basketStore.set([]);

            //navigate to thank you for purchase screen
            navigate("/confirmation");
        }

        else {
            currentError = data.result;
        }
    }
</script>

<div id="checkout-container">
    <h1>Checkout summary</h1>
    <table id="checkout-table">
        <tr>
            <th>Course name</th>
            <th>Price (USD)</th>
            <th>Amount</th>
            <th>Subtotal</th>
        </tr>
        
        {#each basket as course}
            <tr>
                <td>{course.title}</td>
                <td>{course.price}</td>
                <td>{course.amount}</td>
                <td>{course.price * course.amount}</td>
            </tr>
        {/each}
    </table>
    <p id="total">Total: {totalPrice}</p>
    <button on:click={checkOut}>Confirm purchase</button>
</div>
{#if currentError}
<p id="error">Error: {currentError}</p>
{/if}

<style>
    #checkout-container {
        margin-top: 10%;
    }

    #checkout-table  {
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }

    td {
        padding-top: 15px;
        padding-right: 15px;
        border-bottom: 2px solid black;
    }

    button {
        background-color: green;
        color: white;
    }

    #error {
        color: red;
    }
</style>
