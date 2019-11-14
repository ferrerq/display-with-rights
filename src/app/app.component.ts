import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public roleSelected = true;
  title = 'app-with-directives';
  constructor() {
    localStorage.setItem('QF_userRight', 'STUDENT');
  }

  public explose(event: any) {
    event.srcElement.style.animation = 'shake 0.5s';
    event.srcElement.style.animationIterationCount = 'infinite';
  }

  public changeRight(event: any) {
    this.roleSelected = false;
    localStorage.setItem('QF_userRight', event.value);
    setTimeout(() => this.roleSelected = true, 200);
  }
}
