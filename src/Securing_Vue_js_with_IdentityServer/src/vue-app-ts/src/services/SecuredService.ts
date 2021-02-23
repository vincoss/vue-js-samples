import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export default class SecuredService
{
    private instance: AxiosInstance;

    constructor(instance?: AxiosInstance)
    {
        this.instance = instance ? instance : axios.create();
    }

    get(): Promise<string>
    {
        let url_ = "https://localhost:5000/api/secured";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.instance.request(options_).catch((_error: any) =>
        {
            if (isAxiosError(_error) && _error.response)
            {
                return _error.response;
            } else
            {
                throw _error;
            }
        }).then((_response: AxiosResponse) =>
        {
            return this.processGet(_response);
        });
    }

    protected processGet(response: AxiosResponse): Promise<string>
    {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object")
        {
            for (let k in response.headers)
            {
                if (response.headers.hasOwnProperty(k))
                {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200)
        {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200 = _responseText;
            if (Array.isArray(resultData200))
            {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(item);
            }
            return result200;
        } else if (status !== 200 && status !== 204)
        {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<string>(<any>null);
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any
{
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new Error(message);
}

function isAxiosError(obj: any | undefined): obj is AxiosError
{
    return obj && obj.isAxiosError === true;
}