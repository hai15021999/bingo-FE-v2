import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from "@angular/forms";
import { BaseComponent } from "@common/base";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { takeUntil } from "rxjs";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
    ]
})
export class RegisterComponent extends BaseComponent {
    
    
    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required, this.__confirmPasswordValidator]),
        displayName: new FormControl('', [Validators.required])
    });

    ngOnInit(): void {
        this.registerAppStateChanged();
    }

    override registerCoreLayer() {
        
    }

    private __confirmPasswordValidator(): ValidatorFn {
        return (control) => {
            if (control.value !== this.registerForm.get('password')?.value) {
                return { notMatch: true };
            }
            return null;
        }
    }
    
    onSubmitForm() {
        const { username, password, displayName } = this.registerForm.value;
        this.loadingDialog.open();
        if (username && password && displayName) {
            this.apiService.register$(username, password, displayName).pipe(takeUntil(this.destroy$)).subscribe({
                next: (res) => {
                    this.loadingDialog.close();
                    if (res.error) {
                        this.snackbarService.showSnackbar(res.message, 'error');
                        return;
                    }
                    this.appState.accessToken = res.accessToken;
                    this.state.commit(this.appState);
                    this.router.navigate(['/home']);
                }
            })
        }
    }
}