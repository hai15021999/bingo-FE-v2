import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@environment';
import { hashPassword } from '@common/functions';
import { IAppState } from '@app-state';
import { StateService } from '@common/state';
import { LogService } from '../log.service';

@Injectable({
    providedIn: 'root',
})
export class AppApiService {
    private __baseUrl: string = environment.serverUrl;
    private __http = inject(HttpClient);
    private __state = inject(StateService<IAppState>);
    private __logger = inject(LogService);

    login$(username: string, password: string): Observable<any> {
        return new Observable((observer) => {
            const __url = `${this.__baseUrl}/auth/login`;
            const datapost = {
                username,
                password: hashPassword(password),
            };
            this.__http
                .post(__url, datapost)
                .pipe(tap((res) => {
                    this.__logger.log('AppApiService', 'login$', res);
                }))
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
                .pipe(tap((res) => {
                    this.__logger.log('AppApiService', 'register$', res);
                }))
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

    createRoom$(): Observable<any> {
        return new Observable((observer) => {
            const __url = `${this.__baseUrl}/room/createRoom`;
            this.__http
                .post(__url, {})
                .pipe(tap((res) => {
                    this.__logger.log('AppApiService', 'createRoom$', res);
                }))
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

    joinRoom$(roomCode: string): Observable<any> {
        return new Observable((observer) => {
            const __url = `${this.__baseUrl}/room/joinRoom`;
            const datapost = {
                roomCode,
            };
            this.__http
                .post(__url, datapost)
                .pipe(tap((res) => {
                    this.__logger.log('AppApiService', 'joinRoom$', res);
                }))
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

    getRoomInfo$(roomCode: string): Observable<any> {
        return new Observable((observer) => {
            const __url = `${this.__baseUrl}/room/roomInfo/${roomCode}`;
            this.__http
                .get(__url)
                .pipe(tap((res) => {
                    this.__logger.log('AppApiService', 'getRoomInfo$', res);
                }))
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
        if (err.status === 0) {
            return 'Máy chủ không phản hồi';
        }
        if (err.error && err.error.message) {
            return this.validateMessageErrorResponse(err.error);
        }
        if (err.message) {
            return err.message.value ?? err.message;
        }
        return err;
    }
}
