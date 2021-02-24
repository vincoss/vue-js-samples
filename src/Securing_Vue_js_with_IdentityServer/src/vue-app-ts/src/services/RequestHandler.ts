//Parts of this taken from https://laptrinhx.com/how-does-axios-cancel-duplicate-requests-253816797/

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AuthenticationService from "@/services/AuthenticationService";
import Tokens from '@/services/Tokens';

const auth = new AuthenticationService();
const tokens = Tokens.getInstance();

export default class RequestHandler
{
    private pendingRequests = new Map();
    private requestCount = 0;
    private isLoadingFunc: any;

    public Axios: AxiosInstance = axios.create();

    constructor(router: any)
    {
        //if the user changes route, cancel everything
        router.beforeEach((_to: any, _from: any, next: () => void) =>
        {
            this.clearPending(undefined);
            next();
        });

        //XHR request handler
        this.Axios.interceptors.request.use(
            config =>
            {
                this.ensureAuthorizationHeader(config);
                this.addToRequestCount();
                this.removePending(config, true); // check and cancel the previous request before the request starts
                this.addPending(config); // add the current request to pending
                return config;
            },
            error =>
            {
                this.subtractFromRequestCount();
                return Promise.reject(error);
            }
        );

        //XHR response handler
        this.Axios.interceptors.response.use(
            response =>
            {
                this.subtractFromRequestCount();
                this.removePending(response.config, false); // after the request, remove the request
                return response;
            },
            error =>
            {
                //todo: remove from pending?
                this.subtractFromRequestCount();
                this.ensureAuthentication(error);
                return Promise.reject(error);
            }
        );
    }

    public isLoadingCallback(func: any): void
    {
        this.isLoadingFunc = func;
    }

    private addToRequestCount()
    {
        this.requestCount++;
        this.isLoadingFunc(true);
    }

    private subtractFromRequestCount()
    {
        this.requestCount--;
        this.isLoadingFunc(this.requestCount > 0);
    }

    private requestSignature(config: any): string
    {
        return [config.method, config.url, JSON.stringify(config.params), JSON.stringify(config.data)].join("&");
    }

    private addPending(config: any)
    {
        const url = this.requestSignature(config);
        if (config.cancelToken)
        {
            return;
        }
        var cancel = axios.CancelToken.source();
        config.cancelToken = cancel.token;
        this.pendingRequests.set(url, cancel.cancel);
    }

    private removePending(config: any, performCancel: boolean)
    {
        const url = this.requestSignature(config);

        // if the current request ID exists in pending, you need to cancel the current request and remove it
        if (this.pendingRequests.has(url))
        {
            if (performCancel)
            {
                const cancellationFunction = this.pendingRequests.get(url);
                cancellationFunction(url); //url here is just for info
            }
            this.pendingRequests.delete(url);
        }
    }

    public clearPending(matcher: string | undefined)
    {
        for (const [url, cancellationFunction] of this.pendingRequests)
        {
            if (matcher && !url.includes(matcher))
            {
                continue;
            }
            cancellationFunction(url);
        }
        this.pendingRequests.clear();
        this.requestCount = 0;
        if (this.isLoadingFunc)
        {
            this.isLoadingFunc(false);
        }
    }

    ensureAuthorizationHeader(config: AxiosRequestConfig)
    {
        var token = tokens.getAccessToken();
        if (token)
        {
            config.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }

    ensureAuthentication(error: any)
    {
        let originalRequest = error.config
        if (error != null && error.response.status === 401 && !originalRequest._retry)
        {
            originalRequest._retry = true // now it can be retried 
            auth.login();
        }
    }
}
