import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    islogin: any;
    isadmin: any;
    constructor(private lgcheck: AuthService) { }

    ngOnInit(): void {
        this.islogin = this.lgcheck.IsloggedIn();
        this.isadmin = this.lgcheck.getUserRole();
    }
    OnLogOut() {
        sessionStorage.clear();
        location.reload();
        window.scrollTo(0, 0);
    }
}
