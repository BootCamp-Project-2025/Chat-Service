import axios, { AxiosInstance } from "axios";
import { singleton } from "tsyringe";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";

@singleton()
export class ApiClient {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({ baseURL: API_BASE_URL });
  }

  async get(endpoint: string): Promise<any> {
    console.log(`GET ${API_BASE_URL + endpoint}`);
    const response = await this.api.get(endpoint);
    return response.data;
  }

  async post(endpoint: string, data: any): Promise<any> {
    console.log(`POST ${API_BASE_URL + endpoint} \n ${data}`);
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  async put(endpoint: string, data: any): Promise<any> {
    console.log(`PUT ${API_BASE_URL + endpoint} \n ${data}`);
    const response = await this.api.put(endpoint, data);
    return response.data;
  }

  async delete(endpoint: string): Promise<any> {
    console.log(`DELETE ${API_BASE_URL + endpoint}`);
    const response = await this.api.delete(endpoint);
    return response.data;
  }
}
