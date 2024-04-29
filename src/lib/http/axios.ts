import axios, { AxiosRequestHeaders } from "axios";
import { HttpClient, HttpReponse, RequestData } from "./http-client";

const axiosClient = axios.create({
  baseURL: process.env.BACKEND_URL!,
});

export class ApiClient implements HttpClient {
  public async request<Input, Output>(
    data: RequestData<Input>
  ): Promise<HttpReponse<Output>> {
    const headers = this.applyDefaultHeaders(
      data.headers as AxiosRequestHeaders
    );

    try {
      const request = await axiosClient.request({ headers, ...data });

      return {
        body: request.data,
        statusCode: request.status,
      };
    } catch (error) {
      throw this.buildErrorResponse(error);
    }
  }

  private applyDefaultHeaders(headers: AxiosRequestHeaders) {
    // get token from local storage
    // !todo implement token storage
    const token = "blah";

    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  private buildErrorResponse(error: any) {
    return {
      statusCode: error.response?.status || 500,
      error: error.response?.data.error || "Internal Server Error",
      message: error.response?.data.message || "An unexpected error occurred",
    };
  }
}

export const client = new ApiClient();
