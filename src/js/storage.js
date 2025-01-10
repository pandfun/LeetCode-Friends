import { loadFriendsDivs } from "./friends.js";

// Save the username to local storage
export const saveUsername = (username) => {
    chrome.storage.local.get({ friends: [] }, (data) => {
        const friends = data.friends;

        // Check if the username already exists
        if (friends.includes(username)) return;

        // Add the new friend and update the local storage
        friends.push(username);
        chrome.storage.local.set({ friends: friends }, () => {
            console.log("Friends data updated");
        });

        loadFriendsDivs();
    });
};

// Get the list of friends from local storage
export const getFriendsList = (callback) => {
    chrome.storage.local.get({ friends: [] }, (data) => {
        callback(data.friends);
    });
};

// Remove a friend from local storage
export const removeFriend = (friend) => {
    chrome.storage.local.get({ friends: [] }, (data) => {
        const friends = data.friends;
        const updatedFriends = friends.filter(
            (username) => username !== friend
        );
        chrome.storage.local.set({ friends: updatedFriends }, () => {
            console.log(`Friend ${friend} removed`);
        });
    });
};
