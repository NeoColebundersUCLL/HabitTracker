import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "../trpc/context";
import { z } from "zod";

const t = initTRPC.context<Context>().create();

export const userRouter = t.router({

    getUsers: t.procedure.query(async ({ ctx }) => {
        return ctx.prisma.user.findMany()
    }),

    createUser: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {

        const checkExistingUserEmail = await ctx.prisma.user.findUnique({
            where: {email: input.email}
        })

        if (checkExistingUserEmail) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: `User with email: ${input.email} already exists.`,
            });
        }
        
        return ctx.prisma.user.create({
            data: input,
        });
    }),
})