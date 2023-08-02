import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/users.mode';

const api = 'http://localhost:3000/';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUser(): Observable<Array<User>> {
        return this.http.get<Array<User>>(api + 'users');
    }
}
