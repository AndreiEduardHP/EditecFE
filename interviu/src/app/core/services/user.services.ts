import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../environments/environment';
import { User } from '../../models/IUser';


@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${config.BASE_URL}/api/User`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAll`);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get/${id}`);
  }

  add(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, user);
  }

  update(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
