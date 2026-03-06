import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("fetching-video", "10s");

        await step.sleep("transcribing", "10s");

        await step.sleep("sending-to-AI", "10s");

        await step.run("create-workflow", () => {
            return prisma.workflow.create({
                data: {
                    name: "workflow-from-inngest",
                }
            })
        })
    },
);