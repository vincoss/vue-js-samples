import { UserManager, WebStorageStateStore, User } from 'oidc-client';

export default class AuthenticationService {
    private userManager: UserManager;

    constructor() {
        const IDENTITY_DOMAIN: string = 'https://localhost:5443';

        const settings: any = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: IDENTITY_DOMAIN,
            client_id: 'js',
            redirect_uri: 'https://localhost:5000/callback.html',
            automaticSilentRenew: true,
            silent_redirect_uri: 'https://localhost:5000/silent-renew.html',
            response_type: 'code',
            scope: 'openid profile api1',
            post_logout_redirect_uri: 'https://localhost:5000',
            filterProtocolClaims: true,
            accessTokenExpiringNotificationTime: 10,
        };

        this.userManager = new UserManager(settings);
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }

    public getAccessToken(): Promise<string> {
        return this.userManager.getUser().then((data: any) => {
            return data.access_token;
        });
    }
}
