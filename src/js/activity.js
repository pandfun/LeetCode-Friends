import { getFriendsList } from "./storage.js";
import { getRecentAcSubmissions } from "../graphql/problems.js";

const activitiesListDiv = document.getElementById("activities-list");
const emptyImg = document.getElementById("empty-activity-list-img");


export const loadActivities = () => {

    activitiesListDiv.innerHTML = "";

    emptyImg.src = "../../images/loading.gif"
    emptyImg.classList.add("active");
    emptyImg.classList.remove("inactive");

    getFriendsList(async (friends) => {

        let allActivities = [];

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

        // Sort all activities by timestamp in descending order
        allActivities.sort((a, b) => b.timestamp - a.timestamp);

        if (allActivities.length === 0) {
            emptyImg.src = "../../images/nothing_here.png"
            emptyImg.classList.add("active");
            emptyImg.classList.remove("inactive");
        }
        else {
            emptyImg.src = "../../images/nothing_here.png"
            emptyImg.classList.add("inactive");
            emptyImg.classList.remove("active");
        }

        // Group activities by day
        const groupedActivities = groupActivitiesByDay(allActivities);

        // Create and append divs for each day of activities
        Object.keys(groupedActivities).forEach((dateKey) => {

            // Add a separator for each new day
            const daySeparatorDiv = document.createElement("div");
            
            daySeparatorDiv.classList.add("day-separator");
            daySeparatorDiv.textContent = dateKey; // Display the date

            activitiesListDiv.appendChild(daySeparatorDiv);

            // Add activity divs for the activities on that day
            groupedActivities[dateKey].forEach((activity) => {
                const activityDiv = createActivityDiv(activity);
                activitiesListDiv.appendChild(activityDiv);
            });

        });
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
const createActivityDiv = (activity) => {

    const activityDiv = document.createElement("div");
    activityDiv.classList.add("activity");

    const time = getTime(activity.timestamp);

    // Add the username and activity title to the div
    const descriptionSpan = document.createElement("span");
    descriptionSpan.textContent = `${activity.username} - ${activity.title} (${time})`;

    activityDiv.appendChild(descriptionSpan);

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
