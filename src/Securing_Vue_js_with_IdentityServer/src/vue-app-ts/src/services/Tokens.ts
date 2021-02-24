import Storage from '@/services/LocalStorageService';
import { User } from 'oidc-client';

enum Locals
{
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
    USER = 'user'
}

export default class Tokens extends Storage<Locals>
{
    private static instance?: Tokens;

    private constructor()
    {
        super();
    }

    public static getInstance()
    {
        if (!this.instance)
        {
            this.instance = new Tokens();
        }

        return this.instance;
    }

    public getUser(): User | null
    {
        var user = this.get(Locals.USER);
        if (user)
        {
            return JSON.parse(user) as User;
        }
        return null;
    }

    public setUser(user: User)
    {
        this.set(Locals.USER, JSON.stringify(user));
    }

    public getAccessToken()
    {
        return this.get(Locals.ACCESS_TOKEN);
    }

    public setAccessToken(accessToken: string)
    {
        this.set(Locals.ACCESS_TOKEN, accessToken);
    }

    public getRefreshToken()
    {
        return this.get(Locals.REFRESH_TOKEN);
    }

    public setRefreshToken(refreshToken: string)
    {
        this.set(Locals.REFRESH_TOKEN, refreshToken);
    }

    public clear()
    {
        this.clearItems([Locals.ACCESS_TOKEN, Locals.REFRESH_TOKEN, Locals.USER]);
    }
}