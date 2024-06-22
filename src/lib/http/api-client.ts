import {
  HttpClient,
  HttpReponse,
  HttpStatusCode,
  RequestData,
} from "./http-definitions";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export class ApiClient implements HttpClient {
  constructor(private readonly baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async request<Input, Output>(
    data: RequestData<Input>
  ): Promise<HttpReponse<Output>> {
    const headers = await this.applyDefaultHeaders(data.headers);

    try {
      const response = await fetch(`${this.baseUrl}${data.url}`, {
        method: data.method,
        headers,
        body: data.body ? JSON.stringify(data.body) : null,
      });

      let responseBody: Output | undefined;

      if (!response.ok) {
        const responseBody = await response.json();
        throw responseBody;
      }

      if (response.status !== HttpStatusCode.noContent) {
        responseBody = await response.json();
      }

      return {
        body: responseBody,
        statusCode: response.status as HttpStatusCode,
      };
    } catch (error) {
      throw this.buildErrorResponse(error);
    }
  }

  private async applyDefaultHeaders(
    headers: HeadersInit = {}
  ): Promise<HeadersInit> {
    return {
      ...headers,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  }

  private buildErrorResponse(error: any): HttpReponse<never> {
    console.error("Error from API", error);
    const statusCode = error.status || 500;
    const err = error.error || "Internal Server Error";
    const message = error.message || "Internal Server Error";
    const code = error.code || "internalError";
    const detailedMedssage = error.detailedMessage || "Internal Server Error";

    throw {
      statusCode: statusCode as HttpStatusCode,
      error: {
        status: statusCode as HttpStatusCode,
        error: err,
        message: message,
        code: code,
        detailedMedssage: detailedMedssage,
      },
    };
  }
}

export const apiClient = new ApiClient(BASE_URL);
