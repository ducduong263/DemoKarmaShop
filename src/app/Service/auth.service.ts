import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiurl = ' http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    GetAll() {
        return this.http.get(this.apiurl);
    }
    GetbyEmail(email: any) {
        return this.http.get(this.apiurl + '?email=' + email);
    }

    Proceedregister(inputdata: any) {
        return this.http.post(this.apiurl, inputdata);
    }
    updateUser(code: any, inputdata: any) {
        return this.http.put(this.apiurl + '/' + code, inputdata);
    }
    IsloggedIn() {
        return sessionStorage.getItem('username') != null;
    }
    getUserRole() {
        return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
    }
    getUserID(): number | undefined {
        const userIdStr = sessionStorage.getItem('userId');
        return userIdStr ? parseInt(userIdStr) : undefined;
    }

}
