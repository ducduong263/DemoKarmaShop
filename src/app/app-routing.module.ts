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

        ]
    },
    {
        path: 'admin', component: AdminComponent, children: [
            { path: 'quanlysanpham', component: QuanlysanphamComponent },
            { path: 'quanlydanhmuc', component: QuanlydanhmucComponent },
            { path: 'quanlydonhang', component: QuanlydonhangComponent },
        ]
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
