const N8N_API_KEY = process.env.N8N_API_KEY!;
const N8N_BASE_URL = process.env.N8N_BASE_URL!;

async function n8nFetch(path: string, options: RequestInit = {}) {
  const url = `${N8N_BASE_URL}/api/v1${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "X-N8N-API-KEY": N8N_API_KEY,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`n8n API ${res.status}: ${body}`);
  }

  return res.json();
}

export async function listWorkflows(): Promise<{
  data: Array<{
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
}> {
  return n8nFetch("/workflows");
}

export async function getWorkflow(id: string) {
  return n8nFetch(`/workflows/${id}`);
}

export async function activateWorkflow(id: string) {
  return n8nFetch(`/workflows/${id}/activate`, { method: "POST" });
}

export async function deactivateWorkflow(id: string) {
  return n8nFetch(`/workflows/${id}/deactivate`, { method: "POST" });
}

export async function executeWorkflow(
  id: string,
  data?: Record<string, unknown>
) {
  return n8nFetch(`/executions`, {
    method: "POST",
    body: JSON.stringify({ workflowId: id, ...(data ? { data } : {}) }),
  });
}

export async function listExecutions(
  workflowId?: string,
  limit = 10
): Promise<{
  data: Array<{
    id: string;
    finished: boolean;
    mode: string;
    startedAt: string;
    stoppedAt: string;
    workflowId: string;
    status: string;
  }>;
}> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (workflowId) params.set("workflowId", workflowId);
  return n8nFetch(`/executions?${params}`);
}

export async function getExecution(id: string) {
  return n8nFetch(`/executions/${id}`);
}
