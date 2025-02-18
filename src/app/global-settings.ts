import { environment } from '@environment';

export class GlobalSettings {
    production: boolean;
    version: string;
    serverUrl: string;
    accessToken: string = '';
    userRoleId: string = '';

    constructor(production = false, version = '1.0.0', serverUrl = 'http://localhost:4200', accessToken = '', userRoleId = '') {
        this.production = production;
        this.version = version;
        this.serverUrl = serverUrl;
        this.accessToken = accessToken;
        this.userRoleId = userRoleId;
    }
}

export class GlobalSettingsBuilder {
    private production!: boolean;
    private version!: string;
    private serverUrl!: string;
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

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
        return this;
    }

    setUserRoleId(userRoleId: string) {
        this.userRoleId = userRoleId;
        return this;
    }

    build() {
        return new GlobalSettings(this.production, this.version, this.serverUrl, this.accessToken, this.userRoleId);
    }
}

export const GLOBAL_SETTINGS = new GlobalSettingsBuilder()
    .setProduction(environment.production)
    .setVersion(environment.version)
    .setServerUrl(environment.serverUrl)
    .setAccessToken('')
    .setUserRoleId(environment.userRoleId)
    .build();