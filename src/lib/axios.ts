import axiosPackage, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpClient, HttpErrorResponse, HttpRequest } from "@/lib/http-client";

const axios = axiosPackage.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 30000,
});

export class AxiosHttpClient implements HttpClient {
  async request<Input, Output>(
    req: HttpRequest<Input>
  ): Promise<Output | HttpErrorResponse> {
    const config: AxiosRequestConfig = {
      method: req.method,
      data: req.body,
      headers: req.headers,
      params: req.params,
      responseType: req.responseType,
    };

    const fullUrl =
      axios.defaults.baseURL?.endsWith("/") && req.url.startsWith("/")
        ? axios.defaults.baseURL.slice(0, -1) + req.url
        : axios.defaults.baseURL + req.url;

    try {
      const response: AxiosResponse = await axios({ ...config, url: fullUrl });
      return response.data as Output;
    } catch (error: any) {
      throw {
        message: error.message,
        detail: { message: error?.response?.data.message },
      } as HttpErrorResponse;
    }
  }
}

export const httpClient: HttpClient = new AxiosHttpClient();

export default axios;
