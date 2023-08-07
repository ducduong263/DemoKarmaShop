import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { QuanlysanphamComponent } from './components/admin/quanlysanpham/quanlysanpham.component';
import { QuanlydonhangComponent } from './components/admin/quanlydonhang/quanlydonhang.component';
import { QuanlydanhmucComponent } from './components/admin/quanlydanhmuc/quanlydanhmuc.component';

import { QuanlytaikhoanComponent } from './components/admin/quanlytaikhoan/quanlytaikhoan.component';

import { SuccessCheckoutComponent } from './components/checkout/success-checkout/success-checkout.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, children: [
            { path: '', component: ProductListComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'detail/:id', component: ProductDetailComponent },
            { path: 'cart', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'thankforpurchase', component: SuccessCheckoutComponent },
        ]
    },
    {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
            { path: 'quanlysanpham', component: QuanlysanphamComponent },
            { path: 'quanlydanhmuc', component: QuanlydanhmucComponent },
            { path: 'quanlydonhang', component: QuanlydonhangComponent },
            { path: 'quanlytaikhoan', component: QuanlytaikhoanComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
