import { HTTP_STATUS_MESSAGES } from "@/config/constants";

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export const handleAPIError = (error: unknown): string => {
  if (error instanceof APIError) {
    return `エラー (${error.statusCode}): ${error.message}`;
  }
  if (error instanceof Error) {
    return `予期しないエラー: ${error.message}`;
  }
  return "不明なエラーが発生しました";
};

export const createAPIError = (status: number, message?: string): APIError => {
  return new APIError(
    message || HTTP_STATUS_MESSAGES[status] || "エラーが発生しました",
    status
  );
};

// ログ出力用のユーティリティ
export const logAPIError = (
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>
): void => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    additionalInfo,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...(error instanceof APIError && {
        statusCode: error.statusCode,
        code: error.code,
      }),
    } : error,
  };

  console.error(`[${context}] API Error:`, JSON.stringify(errorInfo, null, 2));
};