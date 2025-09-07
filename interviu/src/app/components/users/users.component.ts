import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/IUser';
import { UserService } from '../../core/services/user.services';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  form!: FormGroup;
  isNew = false;
  showPassword = false;
    isFormVisible = false; 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.buildForm();
  }

  buildForm(user?: User) {
    this.form = this.fb.group({
      id: [user?.id || ''],
      fullName: [user?.fullName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      password: ['',Validators.minLength(6)], 
      role: [user?.role || 'User', Validators.required],
      status: [user?.status || 'Active', Validators.required],
    });

    this.isNew = !user;
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => (this.users = data));
  }

  addUser() {
    this.buildForm(); 
     this.isFormVisible = true;  
  }

  editUser(user: User) {
    this.buildForm(user); 
     this.isFormVisible = true; 
  }

  saveUser() {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    if (this.isNew) {
    delete formValue.id;
    this.userService.add(formValue).subscribe(() => this.loadUsers());
  } else {
    this.userService.update(formValue).subscribe(() => this.loadUsers());
  }

      this.closeForm();
  }

  deleteUser(user: User) {
    if (confirm(`Delete ${user.fullName}?`)) {
      this.userService.delete(user.id).subscribe(() => this.loadUsers());
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  closeForm() {
    this.form.reset();
    this.isFormVisible = false;
  }
}
