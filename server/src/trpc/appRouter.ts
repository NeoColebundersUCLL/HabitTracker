import { initTRPC } from "@trpc/server";
import { userRouter } from "../routes/userRouter";
import { habitRouter } from "../routes/habitRouter";

const t = initTRPC.create();
export const appRouter = t.router({
    user: userRouter,
    habit: habitRouter
})

export type AppRouter = typeof appRouter
