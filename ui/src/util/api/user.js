const url = "https://leetcode.com/graphql";

export const getUserInfo = async (username) => {
    const query = `
        query userPublicProfile($username: String!) {
            matchedUser(username: $username) {
                username
                profile {
                    userAvatar
                }
            }
        }
    `;

    const variables = {
        username: username
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
    console.log(result);

    if (result.data.matchedUser === null) {
        return null;
    }

    if (result.errors) {
        console.error("GraphQL Error:", result.errors);
        return [];
    }

    return result.data.matchedUser.profile;
}


// query userPublicProfile($username: String!) {
//     matchedUser(username: $username) {
//       contestBadge {
//         name
//         expired
//         hoverText
//         icon
//       }
//       username
//       githubUrl
//       twitterUrl
//       linkedinUrl
//       profile {
//         ranking
//         userAvatar
//         realName
//         aboutMe
//         school
//         websites
//         countryName
//         company
//         jobTitle
//         skillTags
//         postViewCount
//         postViewCountDiff
//         reputation
//         reputationDiff
//         solutionCount
//         solutionCountDiff
//         categoryDiscussCount
//         categoryDiscussCountDiff
//       }
//     }
//   }