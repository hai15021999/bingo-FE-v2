import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from '@common/base';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent {
  
  ngOnInit(): void {
    this.registerIcon();
    this.registerAppStateChanged();
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
  }
}
