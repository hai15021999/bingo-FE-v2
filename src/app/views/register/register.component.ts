import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true
})
export class RegisterComponent extends BaseComponent {

    override registerCoreLayer() {
        throw new Error("Method not implemented.");
    }
    
}