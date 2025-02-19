import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseComponent } from '@common/base';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
})
export class LoginComponent extends BaseComponent {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.registerAppStateChanged();
    }

    override registerCoreLayer() {}

    onSubmitForm() {
        const { username, password } = this.loginForm.value;
        this.loadingDialog.open();
        if (username && password) {
            this.apiService.login$(username, password).pipe(takeUntil(this.destroy$)).subscribe({
                next: (res) => {
                    this.loadingDialog.close();
                    if (res.error) {
                        this.snackbarService.showSnackbar(res.message, 'error');
                        return;
                    }
                    this.snackbarService.showSnackbar('Đăng nhập thành công', 'success');
                    this.appState.accessToken = res.accessToken;
                    this.state.commit(this.appState);
                    localStorage.setItem('accessToken', res.accessToken);
                    this.router.navigate(['/home']);
                }
            })
        }
    }

    forgotPassword() {

    }

    onRegister() {
        this.router.navigate(['/register']);
    }
}
