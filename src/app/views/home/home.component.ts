import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true
})
export class HomeComponent extends BaseComponent {

    override registerCoreLayer() {
        throw new Error("Method not implemented.");
    }
    
}