import { ZSAError } from "zsa";
import { apiClient } from "./api-client";

const DEFAULT_ERROR_MESSAGE =
  "An internal error occurred while fetching the data";

const makeRequest = async <T, O>(
  url: string,
  method: string,
  body?: T,
  headers?: Record<string, string>
): Promise<O> => {
  let req;

  try {
    const response = await apiClient.request<T, O>({
      url,
      method,
      body,
      headers,
    });
    req = response;
  } catch (e: any) {
    throw {
      code: e.error.code,
      message: e.error.message,
      detailedMessage: e.error.detailedMedssage,
    };
  }

  if (method === "DELETE") {
    return {
      success: req.statusCode === 204 ? true : false,
      status: req.statusCode,
    } as O;
  }

  if (!req) return { error: DEFAULT_ERROR_MESSAGE } as O;

  return { data: req.body } as O;
};

export const GET = async <T, O>(
  url: string,
  headers?: Record<string, string>
): Promise<O> => {
  return makeRequest<T, O>(url, "GET", undefined, headers);
};

export const POST = async <T, O>(
  url: string,
  data: T,
  headers?: Record<string, string>
): Promise<O> => {
  return makeRequest<T, O>(url, "POST", data, headers);
};

export const PUT = async <T, O>(
  url: string,
  data: T,
  headers?: Record<string, string>
): Promise<O> => {
  return makeRequest<T, O>(url, "PUT", data, headers);
};

export const DELETE = async <T, O>(
  url: string,
  headers?: Record<string, string>
): Promise<O> => {
  return makeRequest<T, O>(url, "DELETE", undefined, headers);
};
