import axios, {AxiosInstance, AxiosResponse} from 'axios';
import https from 'node:https';

export default class RestClient {
    private apiContext: AxiosInstance;
    private _lastResponse: AxiosResponse;

    constructor(baseUrl: string) {
        this.apiContext = axios.create({
            baseURL: baseUrl,
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
            headers: {'content-type': 'application/json'},
        });
    }

    get lastResponse() {
        return this._lastResponse;
    }

    async lastResponseBodyAsString() {
        return JSON.stringify(JSON.parse((await this._lastResponse.data).toString('utf-8')), null, 2);
    }

    async get(endPoint: string, queryParams?: Record<string, string | number | boolean>) {
        this._lastResponse = await this.apiContext.get(endPoint, {
            params: queryParams,
        });
    }

    async post(endPoint: string, data: unknown, queryParams?: Record<string, string | number | boolean>) {
        this._lastResponse = await this.apiContext.post(endPoint, {
            data: data,
            params: queryParams,
        });
    }

    async put(endPoint: string, data: unknown, queryParams?: Record<string, string | number | boolean>) {
        this._lastResponse = await this.apiContext.put(endPoint, {
            data: data,
            params: queryParams,
        });
    }

    async delete(endPoint: string, queryParams?: Record<string, string | number | boolean>) {
        this._lastResponse = await this.apiContext.delete(endPoint, {
            params: queryParams,
        });
    }
}
