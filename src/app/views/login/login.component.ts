import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true
})
export class LoginComponent extends BaseComponent {

    ngOnInit(): void {
        this.registerAppStateChanged();
    }

    override registerCoreLayer() {
        
    }
    
}