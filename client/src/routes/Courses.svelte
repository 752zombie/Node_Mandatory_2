<script>
    import { onMount } from "svelte";
    import { basketStore } from "../stores";

    let courses = [];
    let pageToFetch = 1;

    onMount(fetchCourses);

    function nextPage() {
        if (courses.length !== 0) {
            pageToFetch++;
            fetchCourses();
        }
    }

    function previousPage()  {
        if (pageToFetch > 1) {
            pageToFetch--;
            fetchCourses();
        }
    }

    async function fetchCourses() {
        const url = "http://localhost:8080/courses/" + pageToFetch;
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            courses = data.courses;
        }
    }

    function addToBasket(courseToAdd) {
        basketStore.update(basket => {
            const courseToIncrement = basket.find((course) => course.id === courseToAdd.id);
            if (courseToIncrement) {
                courseToIncrement.amount++;
                return [...basket];
            }

            else {
                courseToAdd.amount = 1;
                return [...basket, courseToAdd];
            }
        });
    }
</script>


<h1>Courses</h1>

{#each courses as course}
    <div class="course-container">
        <h3 class="title">{course.title}</h3>
        <p class="description">{course.description}</p>
        <div class="price">
            <span>Price: {course.price}$</span>
            <button class="add-to-basket" on:click={() => addToBasket({...course})}>Add to cart</button> 
        </div>
    </div> <br>
{/each}

{#if pageToFetch > 1}
<button on:click={previousPage}>Previous page</button>
{/if}
{#if courses.length !== 0}
<button on:click={nextPage}>Next page</button>
{:else}
<p>There are no more courses</p>
{/if}        



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


