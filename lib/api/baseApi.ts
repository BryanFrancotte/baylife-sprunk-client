const API_BASE_URL = process.env.NEXT_PUBLIC_FRONT_API_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string, type: string, summary: string) {
    super(message);
    this.name = "ApiError";
    this.summary = summary;
    this.type = type;
  }
  public type: string;
  public summary: string; 
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        errorData.type,
        errorData.summary
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new Error(
      `Network error ${
        error instanceof Error ? error.message : "Unknown error!"
      }`
    );
  }
}
