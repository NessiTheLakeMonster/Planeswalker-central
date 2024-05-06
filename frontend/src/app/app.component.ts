import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) { }

  isLoginOrRegister(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/registro') || url.includes('/error');
  }

  title = 'frontend';
}
