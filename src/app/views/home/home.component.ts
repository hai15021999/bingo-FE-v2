import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { getExpandCollapseVerticalTrigger } from "@common/animations";
import { BaseComponent } from "@common/base";
import { take } from "rxjs";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        MatInputModule,
        NgClass,
        MatButtonModule,
        ReactiveFormsModule, 
        FormsModule
    ],
    animations: [
        getExpandCollapseVerticalTrigger('expandCollapse', '__expanded', '__collapsed', '0px', '200ms'),
    ]
})
export class HomeComponent extends BaseComponent {

    roomCode = new FormControl('', [Validators.required]);

    isExpandedRoomCode = false;

    ngOnInit(): void {
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    override registerCoreLayer() {
        if ([null, undefined, ''].includes(this.state.currentState.accessToken)) {
            this.router.navigate(['/login']);
        }
    }

    onHover() {
        this.isExpandedRoomCode = true;
    }
    
    onBlur() {
        this.isExpandedRoomCode = false;
    }

    joinRoom() {
        if (this.roomCode.invalid) {
            this.snackbarService.showSnackbar('Mã phòng không hợp lệ', 'error');
            return;
        }
        this.loadingDialog.open();
        this.apiService.joinRoom$(this.roomCode.value as string).pipe(
            take(1)
        ).subscribe({
            next: (res) => {
                this.loadingDialog.close();
                if (res.error) {
                    this.snackbarService.showSnackbar(res.message, 'error');
                    return;
                }
                this.snackbarService.showSnackbar('Tham gia phòng thành công', 'success');
                this.router.navigate([`/gaming/${this.roomCode.value}`]);
            }
        });
    }

    createRoom() {
        this.loadingDialog.open();
        this.apiService.createRoom$().pipe(
            take(1)
        ).subscribe({
            next: (res) => {
                this.loadingDialog.close();
                if (res.error) {
                    this.snackbarService.showSnackbar(res.message, 'error');
                    return;
                }
                this.snackbarService.showSnackbar('Tạo phòng thành công', 'success');
                this.router.navigate([`/gaming/${res.roomCode}`]);
            }
        });
    }
}