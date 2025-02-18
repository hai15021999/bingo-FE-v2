import { GLOBAL_SETTINGS } from './global-settings';

export interface IAppState {
    production: boolean;
    version: string;
    serverUrl: string;
    screenSize: 'small' | 'large';
    accessToken: string;
    userRoleId: string;
}

export class AppState {
    production: boolean;
    version: string;
    serverUrl: string;
    screenSize: 'small' | 'large';
    accessToken: string = '';
    userRoleId: string = '';

    constructor(
        production = false,
        version = '1.0.0',
        serverUrl = 'http://localhost:4200',
        screenSize: 'small' | 'large' = 'large',
        accessToken = '',
        userRoleId = ''
    ) {
        this.production = production;
        this.version = version;
        this.serverUrl = serverUrl;
        this.screenSize = screenSize;
        this.accessToken = accessToken;
        this.userRoleId = userRoleId;
    }
}

export class AppStateBuilder {
    private production!: boolean;
    private version!: string;
    private serverUrl!: string;
    private screenSize!: 'small' | 'large';
    private accessToken!: string;
    private userRoleId!: string;

    setProduction(production: boolean) {
        this.production = production;
        return this;
    }

    setVersion(version: string) {
        this.version = version;
        return this;
    }

    setServerUrl(serverUrl: string) {
        this.serverUrl = serverUrl;
        return this;
    }

    setScreenSize(screenSize: 'small' | 'large') {
        this.screenSize = screenSize;
        return this;
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
        return this;
    }

    setUserRoleId(userRoleId: string) {
        this.userRoleId = userRoleId;
        return this;
    }

    build() {
        return new AppState(this.production, this.version, this.serverUrl, this.screenSize, this.accessToken, this.userRoleId);
    }
}

export const INITIAL_STATE = new AppStateBuilder()
    .setProduction(GLOBAL_SETTINGS.production)
    .setVersion(GLOBAL_SETTINGS.version)
    .setServerUrl(GLOBAL_SETTINGS.serverUrl)
    .setScreenSize('large')
    .setAccessToken('')
    .setUserRoleId(GLOBAL_SETTINGS.userRoleId)
    .build();
