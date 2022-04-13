import {loginStore} from "../stores.js";

async function signOut() {
    const request = {
        method : "POST"
    }
    const response = await fetch("http://localhost:8080/sign-out", request);
    const { result } = await response.json();
    if (result === "success") {
        loginStore.set(false);
        sessionStorage.removeItem("isLoggedIn");
        window.location.href = "http://localhost:8080/";
    }

    else {
        alert("Something went wrong");
    }
}

export default signOut;