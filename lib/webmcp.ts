/**
 * Valgfri WebMCP-registrering, som i prototypen. Gjør ingenting i nettlesere uten
 * `document.modelContext`.
 */
export interface ModelContextTool {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: Record<string, boolean>;
  execute: (input: Record<string, unknown> | undefined) => unknown;
}

interface ModelContext {
  registerTool?: (tool: ModelContextTool) => unknown;
  unregisterTool?: (name: string) => unknown;
}

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
}

export function registerModelContextTool(tool: ModelContextTool): () => void {
  const context = document.modelContext;
  if (!context?.registerTool) return () => {};
  try {
    Promise.resolve(context.registerTool(tool)).catch(() => {});
  } catch {
    return () => {};
  }
  return () => {
    try {
      Promise.resolve(context.unregisterTool?.(tool.name)).catch(() => {});
    } catch {}
  };
}
