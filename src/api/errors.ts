export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function toResponse(err: unknown): { status: number; body: { error: string } } {
  if (err instanceof HttpError) return { status: err.status, body: { error: err.message } };
  const message = err instanceof Error ? err.message : "Unexpected error";
  return { status: 400, body: { error: message } };
}
