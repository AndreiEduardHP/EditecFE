import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'interviu';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    const user = this.authService.getLoggedUser();

    if (token && user) {
      if (user.role === 'Admin') {
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
