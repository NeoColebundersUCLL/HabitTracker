import { createTRPCProxyClient, httpBatchLink, TRPCClientError } from "@trpc/client";
import type { AppRouter } from "./src/trpc/appRouter";
import { title } from "process";

// Configure the tRPC client
const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc",
        }),
    ],
});

async function main() {

    const user = {
        name: "Neo",
        email: "neo@example.com"
    }

    const habit = {
        title: "Duolingo",
        frequenty: "daily"
    }

    const habit2 = {
        title: "Touch Typing",
        frequenty: "daily"
    }

    try {
        const createdHabit1 = await trpc.habit.createHabit.mutate(habit)
        const createdHabit2 = await trpc.habit.createHabit.mutate(habit2)
        // const updateHabit = await trpc.habit.updateHabit.mutate({id: 2, completed: true})
        // const getHabits = await trpc.habit.getHabits.query()
        // console.log(getHabits)
    } catch (error: any) {
        console.error(error.message);
    }
}

main();
