import { trpc } from "@/lib/trcp";
import { useEffect, useState } from "react";

function UpdateTimer() {

    // update habit logic
    const { data, refetch } = trpc.habit.getHabits.useQuery()

    const updateHabit = trpc.habit.updateHabit.useMutation()

    // timer logic
    const [remainingTime, setRemainingTime] = useState<number>(0)

    function timeUntilMidnight() {
        const now = new Date()
        // const midnight = new Date();
        // midnight.setHours(24, 0, 0, 0);

        // test (1 minuut)
        const midnight = new Date(now.getTime() + 1 * 60 * 1000); 
        midnight.setSeconds(0, 0); 

        const remainingTimeUntilMidnight = midnight.getTime() - now.getTime();
        setRemainingTime(remainingTimeUntilMidnight)

        if (remainingTimeUntilMidnight <= 1000 && data) {
            data?.forEach((habit) => {
                updateHabit.mutate({ id: habit.id, completed: false })
            })
        }
        refetch()
    }

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);

    useEffect(() => {
        timeUntilMidnight()
        const interval = setInterval(timeUntilMidnight, 1000)
        return () => clearInterval(interval);
    }, [data])

    return (
        <>
            <div className="flex justify-center items-center mb-8">
                <h1 className="text-lg font-semibold text-gray-600 mr-2">⏰ Next day in:</h1>
                <div className="text-lg font-mono bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg shadow">
                    {`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                </div>
            </div>
        </>
    );
}

export default UpdateTimer