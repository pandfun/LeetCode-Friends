import { getUserInfo } from "./api/user";

function getFriends() {
    return new Promise((resolve) => {
        chrome.storage.local.get({ friends: [] }, (res) => {
            resolve(res.friends);
        });
    });
}

async function saveUsername(username) {
    const friendData = await getUserInfo(username);

    if (friendData === null) {
        return { status: "NOT_FOUND" };
    }

    return new Promise((resolve) => {
        chrome.storage.local.get({ friends: [] }, (data) => {
            const friends = data.friends;

            if (friends.includes(username)) {
                resolve({ status: "ALREADY_PRESENT", friends });
                return;
            }

            const updated = [...friends, username];

            chrome.storage.local.set({ friends: updated }, () => {
                resolve({ status: "OK", friends: updated });
            });
        });
    });
}

function removeFriend(username) {
    return new Promise((resolve) => {
        chrome.storage.local.get({ friends: [] }, (data) => {
            const updatedFriends = data.friends.filter(
                (friend) => friend !== username
            );

            chrome.storage.local.set({ friends: updatedFriends }, () => {
                resolve({ status: "OK", friends: updatedFriends });
            });
        });
    });
}

export { getFriends, saveUsername, removeFriend };
