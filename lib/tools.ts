import { tool } from "ai";
import { z } from "zod";
import {
  listWorkflows,
  getWorkflow,
  activateWorkflow,
  deactivateWorkflow,
  executeWorkflow,
  listExecutions,
  getExecution,
} from "./n8n";
import { searchWeb } from "./perplexity";

export const allTools = {
  // --- Web Search ---
  webSearch: tool({
    description:
      "Search the web for real-time information using Perplexity AI. Use for current events, market research, competitor analysis, latest technical docs, trends, or any question where up-to-date data is valuable. Do NOT use for things you already know well.",
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          "The search query. Be specific and detailed for best results."
        ),
    }),
    execute: async ({ query }) => {
      return searchWeb(query);
    },
  }),

  // --- n8n Workflow Management ---
  listWorkflows: tool({
    description:
      "List all n8n workflows. Returns workflow names, IDs, and active status.",
    inputSchema: z.object({}),
    execute: async () => {
      const result = await listWorkflows();
      return result.data.map((w) => ({
        id: w.id,
        name: w.name,
        active: w.active,
        updatedAt: w.updatedAt,
      }));
    },
  }),

  getWorkflow: tool({
    description:
      "Get details of a specific n8n workflow by ID, including its nodes and connections.",
    inputSchema: z.object({
      workflowId: z.string().describe("The workflow ID"),
    }),
    execute: async ({ workflowId }) => {
      return getWorkflow(workflowId);
    },
  }),

  activateWorkflow: tool({
    description: "Activate an n8n workflow so it starts running on its trigger.",
    inputSchema: z.object({
      workflowId: z.string().describe("The workflow ID to activate"),
    }),
    execute: async ({ workflowId }) => {
      const result = await activateWorkflow(workflowId);
      return { success: true, id: result.id, name: result.name, active: true };
    },
  }),

  deactivateWorkflow: tool({
    description: "Deactivate an n8n workflow so it stops running.",
    inputSchema: z.object({
      workflowId: z.string().describe("The workflow ID to deactivate"),
    }),
    execute: async ({ workflowId }) => {
      const result = await deactivateWorkflow(workflowId);
      return { success: true, id: result.id, name: result.name, active: false };
    },
  }),

  executeWorkflow: tool({
    description:
      "Manually trigger/execute an n8n workflow right now. Optionally pass input data.",
    inputSchema: z.object({
      workflowId: z.string().describe("The workflow ID to execute"),
      data: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("Optional input data to pass to the workflow"),
    }),
    execute: async ({ workflowId, data }) => {
      const result = await executeWorkflow(
        workflowId,
        data as Record<string, unknown> | undefined
      );
      return result;
    },
  }),

  listExecutions: tool({
    description:
      "List recent workflow executions. Optionally filter by workflow ID.",
    inputSchema: z.object({
      workflowId: z
        .string()
        .optional()
        .describe("Filter executions by workflow ID"),
      limit: z
        .number()
        .optional()
        .default(10)
        .describe("Number of executions to return (default 10)"),
    }),
    execute: async ({ workflowId, limit }) => {
      const result = await listExecutions(workflowId, limit);
      return result.data.map((e) => ({
        id: e.id,
        workflowId: e.workflowId,
        status: e.status,
        finished: e.finished,
        startedAt: e.startedAt,
        stoppedAt: e.stoppedAt,
      }));
    },
  }),

  getExecution: tool({
    description: "Get details of a specific workflow execution by ID.",
    inputSchema: z.object({
      executionId: z.string().describe("The execution ID"),
    }),
    execute: async ({ executionId }) => {
      return getExecution(executionId);
    },
  }),
};
