import { saveUsername } from "./storage.js";
import { loadFriendsDivs } from "./friends.js";
import { loadActivities } from "./activity.js";


const viewActivitiesBtn = document.getElementById("view-activities-bnt");
const addFriendsBtn = document.getElementById("add-friends-bnt");


viewActivitiesBtn.addEventListener("click", () => {

    document.getElementById("add-friends").classList.remove("active");
    document.getElementById("view-activities").classList.add("active");

    addFriendsBtn.classList.remove("active-btn");
    viewActivitiesBtn.classList.add("active-btn");

    loadActivities();
});

addFriendsBtn.addEventListener("click", () => {

    document.getElementById("view-activities").classList.remove("active");
    document.getElementById("add-friends").classList.add("active");

    viewActivitiesBtn.classList.remove("active-btn");
    addFriendsBtn.classList.add("active-btn");

    loadFriendsDivs();
});



const usernameInputBtn = document.getElementById("username-input-btn");
const usernameInputField = document.getElementById("username-input");


usernameInputBtn.addEventListener("click", () => {

    const friendUsername = usernameInputField.value;

    if (friendUsername !== "") {
        saveUsername(friendUsername);
        usernameInputField.value = "";
    }
});

// Call loadFriendsDivs when the popup is opened
document.addEventListener("DOMContentLoaded", () => {

    viewActivitiesBtn.classList.add("active-btn");
    loadActivities();
});
