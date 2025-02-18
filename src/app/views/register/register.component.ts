import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from "@angular/forms";
import { BaseComponent } from "@common/base";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";


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
    })

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
        
    }
}