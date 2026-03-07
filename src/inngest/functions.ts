import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from 'ai';

const google = createGoogleGenerativeAI();
const openai = createOpenAI();

export const testAIModel = inngest.createFunction(
    { id: "execute" },
    { event: "execute/ai" },
    async ({ event, step }) => {
        await step.sleep("fetching-data", "10s");

        const { steps: geminiSteps } = await step.ai.wrap("gemini-generate-text", generateText, {
            model: google("gemini-2.5-flash"),
            system: "You are a helpful assistant.",
            prompt: "What is 2 + 2 ?",
            experimental_telemetry: {
                isEnabled: true,
                recordInputs: true,
                recordOutputs: true,
            },
        });

        const { steps: openAISteps } = await step.ai.wrap("openai-generate-text", generateText, {
            model: openai("gpt-3.5-turbo"),
            system: "You are a helpful assistant.",
            prompt: "What is the capital of Vietnam ?",
            experimental_telemetry: {
                isEnabled: true,
                recordInputs: true,
                recordOutputs: true,
            },
        });

        return {
            geminiSteps,
            openAISteps
        };
    },
);