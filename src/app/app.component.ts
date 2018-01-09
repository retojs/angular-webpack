import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [String(require('./app.component.scss'))]
})
export class AppComponent {
  title = 'My App';
}
