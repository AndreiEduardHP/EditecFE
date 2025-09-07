import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error = '';
    showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        const user = this.authService.getLoggedUser();
        if (user?.role === 'Admin') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.error = 'Invalid email or password or account inactive';
        } else if (err.status === 404) {
          this.error = 'User not found';
        } else {
          this.error = 'Invalid email or password';
        }
      }
    });
  }
}
