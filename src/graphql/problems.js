const url = "https://leetcode.com/graphql";

const NUM_SUBMISSIONS = 5;

// Get the recent AC Submissions for a user
export const getRecentAcSubmissions = async (username, limit = NUM_SUBMISSIONS) => {

    const query = `
        query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
                id
                title
                titleSlug
                timestamp
            }
        }
    `;

    const variables = {
        username: username,
        limit: limit,
    };


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const result = await response.json();

    if (result.errors) {
        console.error("GraphQL Error:", result.errors);
        return [];
    }

    return result.data.recentAcSubmissionList;
};


// Get more info about a problem
export const getProblemInfo = async (problemTitleSlug) => {

    const query = `
        query questionTitle($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                isPaidOnly
                difficulty
            }
        }
    `;

    const variables = {
        titleSlug: problemTitleSlug
    };


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const result = await response.json();

    if (result.errors) {
        console.error("GraphQL Error:", result.errors);
        return [];
    }

    return result.data.question;
};