import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { TRPCError } from '@trpc/server';
import * as Sentry from "@sentry/nextjs";

export const appRouter = createTRPCRouter({
    testAI: premiumProcedure.mutation(async () => {
        console.log("This log to check sentry")

        Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })


        await inngest.send({
            name: "execute/ai"
        });

        return { success: true, message: "Job queued" };
    }),
    getWorkflows: protectedProcedure
        .query(({ ctx }) => {
            return prisma.workflow.findMany();
        }),
    createWorkflow: protectedProcedure.mutation(async () => {
        await inngest.send({
            name: "test/hello.world",
            data: {
                email: "vdt040499@gmail.com"
            }
        })

        return { success: true, message: "Job queued" };
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;