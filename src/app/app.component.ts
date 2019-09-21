import { Component } from '@angular/core';

@Component({
  selector: 'cm-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
}
