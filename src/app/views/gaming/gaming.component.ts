import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";


@Component({
    selector: 'app-gaming',
    templateUrl: './gaming.component.html',
    styleUrls: ['./gaming.component.scss'],
    standalone: true
})
export class GamingComponent extends BaseComponent {

    ngOnInit(): void {
        this.registerAppStateChanged();
    }

    override registerCoreLayer() {
        
    }
    
}