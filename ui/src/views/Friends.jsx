import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getFriends, saveUsername, removeFriend } from "@/util/storage";

function Friends() {
    const [friends, setFriends] = useState([]);
    const [typedUsername, setTypedUsername] = useState("");

    useEffect(() => {
        getFriends().then(setFriends);
    }, []);

    const handleAddBtnClick = async () => {
        if (!typedUsername.trim()) return;

        const result = await saveUsername(typedUsername);

        if (result.status === "OK") {
            setFriends(result.friends);
            setTypedUsername("");
        } else if (result.status === "ALREADY_PRESENT") {
            alert("Friend already added");
        } else if (result.status === "NOT_FOUND") {
            alert("User not found");
        }
    };

    return (
        <div className="space-y-4">
            <div className="w-80">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddBtnClick();
                    }}
                >
                    <Field orientation="horizontal">
                        <Input
                            type="search"
                            placeholder="LeetCode Username"
                            value={typedUsername}
                            onChange={(e) => setTypedUsername(e.target.value)}
                        />
                        <Button type="submit">
                            Add
                        </Button>
                    </Field>
                </form>
            </div>

            <div className="h-92 w-100 overflow-auto">            
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {friends.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-muted-foreground">
                                    No friends added yet
                                </TableCell>
                            </TableRow>
                        ) : (
                            friends.map((friend) => (
                                <TableRow key={friend}>
                                    <TableCell>
                                        <a
                                            href={`https://leetcode.com/u/${friend}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            {friend}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            className="h-7 w-7 p-0 ml-50"
                                            onClick={async () => {
                                                const result = await removeFriend(friend);
                                                if (result.status === "OK") {
                                                    setFriends(result.friends);
                                                }
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                width="8"
                                                height="8"
                                                aria-hidden="true"
                                                fill="white"
                                            >
                                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                            </svg>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Friends;
