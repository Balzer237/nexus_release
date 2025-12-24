interface coreResponseOptions<T> {
  data?: T | null;
  message?: string;
  status?: number;
  meta?: Record<string, any>;
}

export function coreResponse<T>({
  message = 'Success',
  data = null,
  status = 200,
  meta = {},
}: coreResponseOptions<T>) {
  return {
    data,
    status,
    message,
    meta,
  };
}
