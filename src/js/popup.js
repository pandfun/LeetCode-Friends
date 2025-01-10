import { saveUsername, removeFriend, getFriendsList } from "./storage.js";
import { loadFriendsDivs } from "./friends.js";

const viewActivitiesBtn = document.getElementById("view-activities-bnt");
const addFriendsBtn = document.getElementById("add-friends-bnt");

// Switch between activities and add friends page
viewActivitiesBtn.addEventListener("click", () => {
    document.getElementById("add-friends").classList.remove("active");
    document.getElementById("view-activities").classList.add("active");

    addFriendsBtn.classList.remove("active-btn");
    viewActivitiesBtn.classList.add("active-btn");
});

addFriendsBtn.addEventListener("click", () => {
    document.getElementById("view-activities").classList.remove("active");
    document.getElementById("add-friends").classList.add("active");

    viewActivitiesBtn.classList.remove("active-btn");
    addFriendsBtn.classList.add("active-btn");

    loadFriendsDivs();
});

// Handle username input for adding a friend
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
    addFriendsBtn.classList.add("active-btn");
    loadFriendsDivs();
});
