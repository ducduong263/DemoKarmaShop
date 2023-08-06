import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    constructor(private toastr: ToastrService, private resgService: AuthService, private router: Router) { }

    regisForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        role: new FormControl('user'),
    });

    onRegister() {
        if (this.regisForm.valid) {
            const password = this.regisForm.get('password')?.value;
            const confirmPassword = this.regisForm.get('confirmPassword')?.value;

            if (password !== confirmPassword) {
                this.toastr.error("Mật khẩu không khớp vui lòng nhập lại", "Thông báo", {
                    progressBar: true,
                    newestOnTop: true
                });
                return;
            }

            this.resgService.Proceedregister(this.regisForm.value).subscribe((res) => {
                this.toastr.success("Đăng ký thành công", "Thông báo", {
                    progressBar: true,
                    newestOnTop: true
                });
                this.router.navigate(['login']);
            });
        } else {
            this.toastr.warning("Vui lòng nhập đầy đủ thông tin", "Thông báo", {
                progressBar: true,
                newestOnTop: true
            })
        }
    }
}
