import { getFriendsList } from "./storage.js";
import { getProblemInfo, getRecentAcSubmissions } from "../graphql/problems.js";

const activitiesListDiv = document.getElementById("activities-list");
const emptyImg = document.getElementById("empty-activity-list-img");
const loadingImg = document.getElementById("loading-activity-list-img");


export const loadActivities = () => {

    activitiesListDiv.innerHTML = "";

    loadingImg.classList.add("active");
    loadingImg.classList.remove("inactive");

    getFriendsList(async (friends) => {

        let allActivities = [];

        // Fetch activities for each friend
        for (const username of friends) {
            try {
                const activities = await getRecentAcSubmissions(username);
                allActivities.push(
                    ...activities.map((activity) => ({
                        ...activity,
                        username: username,
                    }))
                );

            }
            catch (error) {
                console.error(`Error fetching activities for ${username}:`, error);
            }
        }


        // Sort activities by timestamp in descending order
        allActivities.sort((a, b) => b.timestamp - a.timestamp);


        if (allActivities.length === 0) {
            emptyImg.classList.add("active");
            emptyImg.classList.remove("inactive");
        }
        else {
            emptyImg.classList.add("inactive");
            emptyImg.classList.remove("active");
        }

        loadingImg.classList.remove("active");
        loadingImg.classList.add("inactive");


        // Group activities by day
        const groupedActivities = groupActivitiesByDay(allActivities);

        // Create and append divs for each day of activities
        for (const dateKey of Object.keys(groupedActivities)) {

            // Add a separator for each new day
            const daySeparatorDiv = document.createElement("div");
            daySeparatorDiv.classList.add("day-separator");

            daySeparatorDiv.textContent = dateKey;
            activitiesListDiv.appendChild(daySeparatorDiv);

            // Add activity divs for the activities on that day
            const activitiesOfDay = groupedActivities[dateKey];

            for (const activity of activitiesOfDay) {

                const activityDiv = await createActivityDiv(activity);
                activitiesListDiv.appendChild(activityDiv);
            }
        }
    });
};



// Return the activities grouped by the date
const groupActivitiesByDay = (activities) => {

    const groupedActivities = {};

    activities.forEach((activity) => {

        const formattedDate = formatTimestamp(activity.timestamp);

        if (formattedDate) {
            // Use the date (without time) as the key to group activities
            const dateKey = formattedDate.split(",")[0]; // Format: 'MM/DD/YYYY'

            if (!groupedActivities[dateKey]) {
                groupedActivities[dateKey] = [];
            }

            groupedActivities[dateKey].push(activity);
        }
    });

    return groupedActivities;
};


// Create a div for each activity
const createActivityDiv = async (activity) => {

    const activityDiv = document.createElement("div");
    activityDiv.classList.add("activity");

    const time = getTime(activity.timestamp);

    // Username with submission link
    const usernameSpan = document.createElement("span");
    usernameSpan.classList.add("username");
    usernameSpan.textContent = activity.username;


    // Problem name link
    const problemLink = document.createElement("a");
    problemLink.classList.add("problem-name");

    problemLink.textContent = activity.title;
    problemLink.href = `https://leetcode.com/problems/${activity.titleSlug}/description`;
    problemLink.target = "_blank";


    // Submission Link
    const submissionLink = document.createElement("a");
    submissionLink.classList.add("submission-link");

    submissionLink.textContent = "View Submission";
    submissionLink.href = `https://leetcode.com/submissions/detail/${activity.id}/`;
    submissionLink.target = "_blank";


    // Problem info
    let problemInfo = await getProblemInfo(activity.titleSlug);

    if (!problemInfo) {
        console.error(`Problem info not found for: ${activity.titleSlug}`);
        problemInfo = { difficulty: "Unknown" }; // Fallback value
    }

    const statusSpan = document.createElement("span");
    statusSpan.classList.add("status");

    statusSpan.textContent = `${problemInfo.difficulty} (${time})`;

    const difficulty = problemInfo.difficulty.toLowerCase();

    const difficultyColor = getDifficultyColor(difficulty);
    const difficultyText = problemInfo.difficulty;


    const difficultySpan = document.createElement("span");
    difficultySpan.style.color = difficultyColor;
    difficultySpan.textContent = difficultyText;


    statusSpan.textContent = ` (${time})`;
    statusSpan.prepend(difficultySpan);


    activityDiv.appendChild(usernameSpan);
    activityDiv.appendChild(problemLink);
    activityDiv.appendChild(submissionLink);
    activityDiv.appendChild(statusSpan);

    return activityDiv;
};




// Format timestamp into human-readable date and time
const formatTimestamp = (timestamp) => {

    // Convert the timestamp from seconds to milliseconds
    const dateInMilliseconds = timestamp * 1000;
    const date = new Date(dateInMilliseconds);

    let time = "Invalid Date";

    if (timestamp && !isNaN(date)) {
        time = date.toLocaleString();
    }

    return time;
};

// Get the time from the timestamp
const getTime = (timestamp) => {

    // Convert the timestamp from seconds to milliseconds
    const dateInMilliseconds = timestamp * 1000;
    const date = new Date(dateInMilliseconds);

    let time = "Invalid Time"

    if (timestamp && !isNaN(date)) {
        // Format only the time (HH:mm:ss)
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        time = `${hours}:${minutes}:${seconds}`;
    }

    return time;
};


const getDifficultyColor = (difficulty) => {

    let color = "#7f8c8d";

    switch (difficulty) {
        case "medium":
            color = "rgb(255 184 0)";
            break;
        case "easy":
            color = "rgb(0 175 155)";
            break;
        case "hard":
            color = "rgb(255 45 85)";
            break;
        default:
            color = "#7f8c8d";
    }

    return color;
};