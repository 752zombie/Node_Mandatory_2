<script>
    import { basketStore } from "../stores.js";

    let basket = [];
    basketStore.subscribe(basketFromStore => basket = basketFromStore);

    $: totalPrice = basket.reduce((prev, next) => prev + next.amount * next.price, 0);
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
</div>

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
</style>
