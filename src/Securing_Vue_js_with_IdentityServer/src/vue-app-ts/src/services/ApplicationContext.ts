import RequestHandler from "@/services/RequestHandler";
import ValuesService from "@/services/ValuesService";
import SecuredService from "@/services/SecuredService";
import AuthenticationService from "@/services/AuthenticationService";

export interface IApplicationContext
{
    RequestHandler: RequestHandler;
    Values: ValuesService;
    Secured: SecuredService;
    Authentication: AuthenticationService;
}

export class ApplicationContext implements IApplicationContext
{
    public RequestHandler: RequestHandler;
    public Values: ValuesService;
    public Secured: SecuredService;
    public Authentication: AuthenticationService;

    constructor(router: any)
    {
        this.RequestHandler = new RequestHandler(router);
        this.Values = new ValuesService(this.RequestHandler.Axios);
        this.Secured = new SecuredService(this.RequestHandler.Axios);
        this.Authentication = new AuthenticationService();
    }
}