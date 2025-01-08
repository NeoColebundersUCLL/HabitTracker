import { initTRPC } from "@trpc/server";
import { Context } from "../trpc/context";
import { z } from "zod";

const t = initTRPC.context<Context>().create();

export const habitRouter = t.router({

    getHabits: t.procedure.query(async ({ ctx }) => ctx.prisma.habit.findMany()),

    createHabit: t.procedure
        .input(z.object({
            title: z.string(),
            frequenty: z.string(),
        })).mutation(({ input, ctx }) => {
            return ctx.prisma.habit.create({
                data: input
            })
        }),

    updateHabit: t.procedure
        .input(z.object({ 
            id: z.number(), 
            completed: z.boolean() 
        })).mutation(({ input, ctx }) => {
            return ctx.prisma.habit.update({
                where: { id: input.id },
                data: { completed: input.completed }
            })
        }),
    
    deleteHabit: t.procedure
    .input(z.object({
        id: z.number()
    })).mutation(({input, ctx}) => {
        return ctx.prisma.habit.delete({
            where: {id: input.id}
        })
    })
})