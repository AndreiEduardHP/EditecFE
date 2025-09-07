import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User | null;

  constructor(private authService: AuthService,private router: Router) {
    this.user = this.authService.getLoggedUser();
  }
    logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
