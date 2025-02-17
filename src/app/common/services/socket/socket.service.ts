import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private __socket!: Socket;

    constructor() {
        const socketUrl = environment.serverUrl;
        this.__socket = io(socketUrl, {
            transports: ['websocket'],
            autoConnect: false,
            withCredentials: true,
        });
        this.__socket.connect();
    }

    listenSocketKey$(key: string) {
        return new Observable((observer) => {
            this.__socket.on(key, (data) => {
                observer.next(data);
            });
        });
    }

    removeSocketKeyListener(key: string) {
        this.__socket.off(key);
    }

    destroySocket() {
        if (this.__socket) {
            this.__socket.disconnect();
        }
    }
}
