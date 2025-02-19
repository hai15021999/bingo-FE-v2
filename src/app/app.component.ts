import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from '@common/base';
import { SnackbarErrorComponent, SnackbarInfoComponent, SnackbarSuccessComponent } from '@common/components';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent {

    snackbar = inject(MatSnackBar);

    ngOnInit(): void {
        this.registerIcon();
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    override registerCoreLayer() {
        this.appWindowResize$
            .asObservable()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (size: number) => {
                    this.handleWindowSize(size);
                },
            });
        this.snackbarService
            .registerSnackbarEvent$()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res) => {
                    this.bindingSnackbarTemplate(res.type, res.message);
                },
            });
    }

    bindingSnackbarTemplate(type: 'info' | 'error' | 'success', message: string) {
        const config: any = {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            data: { message },
            panelClass: '__app-snackbar-container'
        }
        if (type === 'error') {
            this.snackbar.openFromComponent(SnackbarErrorComponent, config);
        }
        if (type === 'info') {
            this.snackbar.openFromComponent(SnackbarInfoComponent, config);
        }
        if (type === 'success') {
            this.snackbar.openFromComponent(SnackbarSuccessComponent, config);
        }
    }
}
