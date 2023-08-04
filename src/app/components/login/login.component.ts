import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });
    userdata: any;
    constructor(
        private loginsv: LoginService,
        private toastr: ToastrService,
        private loginService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }
    ngOnInit(): void {
        window.scrollTo(0, 0);

    }

    onLogin() {
        if (this.loginForm.valid) {
            this.loginService.GetbyEmail(this.loginForm.value.email).subscribe(res => {
                this.userdata = res;
                if (this.userdata[0].password === this.loginForm.value.password) {
                    sessionStorage.setItem('userId', this.userdata[0].id);
                    sessionStorage.setItem('username', this.userdata[0].name);
                    sessionStorage.setItem('userrole', this.userdata[0].role);
                    // this.router.navigate(['']);
                    location.assign('http://localhost:4200');
                    // this.router.navigate([''], { relativeTo: this.route })
                    window.scrollTo(0, 0);
                    this.toastr.success("Đăng nhập thành công", "Thông báo", {
                        progressBar: true,
                        newestOnTop: true
                    })
                } else {
                    this.toastr.error("Đăng nhập Thất Bại", "Thông báo", {
                        progressBar: true,
                        newestOnTop: true
                    })
                }
            });
        } else {
            this.toastr.error("Vui lòng điền đầy đủ thông tin", "Thông báo", {
                progressBar: true,
                newestOnTop: true
            })
        }
    }
}
