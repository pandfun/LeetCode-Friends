import { useState } from "react";
import { Button } from "@/components/ui/button"
import Friends from "./views/Friends";
import Submissions from "./views/Submissions";

function App(){
    const SUBMISSIONS = 1;
    const FRIENDS = 2;

    const [page, setPage] = useState(SUBMISSIONS);

    return (
        <>
        <div className="h-130 w-110 pt-3 pl-5 pr-5">
            <div className="flex gap-10 align-center justify-center mb-10">
                <Button 
                    variant={page == SUBMISSIONS ? "default" : "outline"}
                    onClick={() => setPage(SUBMISSIONS)}
                >
                    Submissions
                </Button>

                <Button 
                    variant={page == FRIENDS ? "default" : "outline"}
                    onClick={() => setPage(FRIENDS)}
                >
                    Add Friends
                </Button>
            </div>

            <div className="">
                {page == FRIENDS && <Friends />}
                {page == SUBMISSIONS && <Submissions />}
            </div>
        </div>
        </>
    );
}

export default App;
