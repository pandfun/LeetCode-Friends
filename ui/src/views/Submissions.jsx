import { useEffect, useState } from "react";

import { getFriends } from "@/util/storage";
import { getRecentAcSubmissions, getProblemInfo } from "@/util/api/problems";


function getDateKey(timestamp) {
    return new Date(timestamp * 1000).toISOString().split("T")[0];
}

function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

function groupByDate(submissions) {
    return submissions.reduce((acc, sub) => {
        const date = getDateKey(sub.timestamp);

        if (!acc[date]) {
            acc[date] = [];
        }

        acc[date].push(sub);
        return acc;
    }, {});
}

function formatDate(dateStr) {
    return new Date(dateStr).toDateString();
}

function getDifficultyClass(difficulty) {
    switch (difficulty) {
        case "Easy":
            return "text-green-600";
        case "Medium":
            return "text-yellow-600";
        case "Hard":
            return "text-red-600";
        default:
            return "text-foreground";
    }
}


const problemCache = {};
async function getCachedProblemInfo(titleSlug) {
    if (problemCache[titleSlug]) {
        return problemCache[titleSlug];
    }

    const info = await getProblemInfo(titleSlug);
    problemCache[titleSlug] = info;
    return info;
}


function Submissions() {
    const [grouped, setGrouped] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);

            const friends = await getFriends();
            if (friends.length === 0) {
                setGrouped({});
                setLoading(false);
                return;
            }

            const results = await Promise.all(
                friends.map(async (friend) => {
                    const subs = await getRecentAcSubmissions(friend);
            
                    return Promise.all(
                        subs.map(async (s) => {
                            const info = await getCachedProblemInfo(s.titleSlug);
            
                            return {
                                ...s,
                                username: friend,
                                difficulty: info?.difficulty,
                                isPaidOnly: info?.isPaidOnly,
                            };
                        })
                    );
                })
            );

            const allSubs = results
                .flat()
                .sort((a, b) => b.timestamp - a.timestamp);

            const groupedByDate = groupByDate(allSubs);

            setGrouped(groupedByDate);
            setLoading(false);
        }

        load();
    }, []);

    if (loading) {
        return (
            <div className="text-sm text-muted-foreground">
                Loading…
            </div>
        );
    }

    const dates = Object.keys(grouped).sort(
        (a, b) => new Date(b) - new Date(a)
    );

    return (
        <div className="space-y-6">
            {dates.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                    No submissions yet..
                </div>
            ) : (
                dates.map((date) => (
                    <div key={date} className="space-y-2">
                        <div className="text-sm font-semibold">
                            {formatDate(date)}
                        </div>

                        <ul className="divide-y">
                            {grouped[date].map((s) => (
                                <li
                                    key={s.id}
                                    className="grid grid-cols-[3.5rem_7rem_1fr] items-center gap-2 py-2 text-sm hover:bg-muted rounded"
                                >
                                    {/* Time */}
                                    <span className="text-xs text-muted-foreground">
                                        {formatTime(s.timestamp)}
                                    </span>

                                    {/* Username */}
                                    <a
                                        href={`https://leetcode.com/submissions/detail/${s.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium truncate hover:underline"
                                        title={"Submission Link"}
                                    >
                                        {s.username}
                                    </a>

                                    {/* Problem title */}
                                    <a
                                        href={`https://leetcode.com/problems/${s.titleSlug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`truncate hover:underline ${getDifficultyClass(s.difficulty)}`}
                                        title={`${s.title} • ${s.difficulty}`}
                                    >
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

export default Submissions;
