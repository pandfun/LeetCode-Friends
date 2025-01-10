export const getRecentAcSubmissions = async (username, limit = 10) => {
    
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

    const url = "https://leetcode.com/graphql";

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
