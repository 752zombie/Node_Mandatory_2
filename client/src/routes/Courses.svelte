<script>
    import { onMount } from "svelte";

    let courses = [];
    let pageToFetch = 1;

    onMount(fetchCourses);

    function nextPage() {
        pageToFetch++;
        fetchCourses();
    }

    function previousPage()  {
        pageToFetch--;
        fetchCourses();
    }

    async function fetchCourses() {
        const url = "http://localhost:8080/courses/" + pageToFetch;
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            courses = data.courses;
        }

        else {
            // display message that there is no more pages;
        }
    }
</script>



{#each courses as course}
    <div class="course-container">
        <h3 class="title">{course.title}</h3>
        <p class="description">{course.description}</p>
        <div class="price">
            <span>Price: {course.price}$</span>
            <button class="add-to-basket">Add to basket</button> 
        </div>
    </div> <br>
{/each}

<button class="previous" on:click={previousPage}>Previous page</button>
<button on:click={nextPage}>Next page</button>

<style>
    .add-to-basket {
        color: white;
        background-color: green;
    }

    .course-container {
        width: 500px;
        max-width: 500px;
        display: inline-block;
        border-style: solid;
        border-width: 20px, 20px, 20px, 20px;
        border-color: grey;
        margin-top: 50px;
    }

    .price {
        text-align: right;
    }

</style>


