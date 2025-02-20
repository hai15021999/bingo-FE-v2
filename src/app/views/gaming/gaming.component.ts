import { Component, inject } from "@angular/core";
import { BaseComponent } from "@common/base";
import { forkJoin, Observable, take } from "rxjs";

import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-gaming',
    templateUrl: './gaming.component.html',
    styleUrls: ['./gaming.component.scss'],
    standalone: true
})
export class GamingComponent extends BaseComponent {
    route = inject(ActivatedRoute);

    isDataLoaded = false;
    roomCode = '';

    ngOnInit(): void {
        this.roomCode = this.route.snapshot.paramMap.get('roomCode') ?? '';
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    override registerCoreLayer() {
        //register all socket events

        //get the current user info
        //get the current room info
        {
            forkJoin([this.getUserInfo$(), this.apiService.getRoomInfo$(this.roomCode)]).pipe(take(2)).subscribe({
                next: ([userInfo, roomInfo]) => {
                    
                    this.isDataLoaded = true;
                }
            })
        }
        
    }

    getUserInfo$() {
        return new Observable((observer) => {
            const payload = jwtDecode(this.state.currentState.accessToken);
            observer.next(payload);
            observer.complete();
        });
    }
    
}