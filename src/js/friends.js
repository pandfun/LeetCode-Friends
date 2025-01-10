import { getFriendsList, removeFriend } from "./storage.js";

const friendsListDiv = document.getElementById("friends-list");


// Load and display all the friends from storage
export const loadFriendsDivs = () => {

    friendsListDiv.innerHTML = "";

    // Get the list of friends
    getFriendsList((friends) => {

        if (friends.length === 0) {
            document.getElementById("empty-friends-list-img").classList.add("active");
            document.getElementById("empty-friends-list-img").classList.remove("inactive");
        } 
        else {
            document.getElementById("empty-friends-list-img").classList.remove("active");
            document.getElementById("empty-friends-list-img").classList.add("inactive");

            friends.forEach((friend) => {
                const friendDiv = createFriendDiv(friend);
                friendsListDiv.appendChild(friendDiv);
            });
        }
    });
};

export const createFriendDiv = (username) => {
    const friendDiv = document.createElement("div");
    friendDiv.classList.add("friend");

    // Username display
    const usernameSpan = document.createElement("span");
    usernameSpan.textContent = username;
    friendDiv.appendChild(usernameSpan);

    // Buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("friend-buttons");

    // Link button with SVG icon
    const linkButton = document.createElement("button");
    linkButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
            <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/>
        </svg>`;
    linkButton.addEventListener("click", () => {
        window.open(`https://leetcode.com/u/${username}`, "_blank");
    });
    buttonsContainer.appendChild(linkButton);

    // Delete button with SVG icon
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
        </svg>`;

    deleteButton.addEventListener("click", () => {
        removeFriend(username);
        friendDiv.remove(); // Remove the div from the UI
    });

    buttonsContainer.appendChild(deleteButton);

    friendDiv.appendChild(buttonsContainer);

    return friendDiv;
};
