import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@environment';
import { hashPassword } from '@common/functions';
import { IAppState } from '@app-state';
import { StateService } from '@common/state';

@Injectable({
    providedIn: 'root',
})
export class AppApiService {
    private __baseUrl: string = environment.serverUrl;
    private __http = inject(HttpClient);
    private __state = inject(StateService<IAppState>);

    login$(username: string, password: string): Observable<any> {
        return new Observable((observer) => {
            const __url = `${this.__baseUrl}/auth/login`;
            const datapost = {
                username,
                password: hashPassword(password),
            };
            this.__http
                .post(__url, datapost)
                .pipe(tap((res) => {}))
                .subscribe({
                    next: (res) => {
                        observer.next(res);
                        observer.complete();
                    },
                    error: (err) => {
                        observer.next({
                            error: true,
                            message: this.validateMessageErrorResponse(err),
                        });
                    },
                });
        });
    }

    register$(username: string, password: string, displayName: string): Observable<any> {
        return new Observable((observer) => {
            const __url = `${this.__baseUrl}/auth/register`;
            const datapost = {
                username,
                password: hashPassword(password),
                displayName,
                roleId: this.__state.currentState.userRoleId
            };
            this.__http
                .post(__url, datapost)
                .pipe(tap((res) => {}))
                .subscribe({
                    next: (res) => {
                        observer.next(res);
                        observer.complete();
                    },
                    error: (err) => {
                        observer.next({
                            error: true,
                            message: this.validateMessageErrorResponse(err),
                        });
                    },
                });
        });
    }

    validateMessageErrorResponse(err: any): string {
        if (err.error) {
            return this.validateMessageErrorResponse(err.error);
        }
        if (err.message) {
            return err.message.value ?? err.message;
        }
        return err;
    }
}
