import { QuanlydonhangComponent } from './components/admin/quanlydonhang/quanlydonhang.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { QuanlysanphamComponent } from './components/admin/quanlysanpham/quanlysanpham.component';
import { ProductlistComponent } from './components/admin/quanlysanpham/productlist/productlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductdetailpopupComponent } from './components/admin/quanlysanpham/productdetailpopup/productdetailpopup.component';
import { ProductAddPopupComponent } from './components/admin/quanlysanpham/product-add-popup/product-add-popup.component';
import { QuanlydanhmucComponent } from './components/admin/quanlydanhmuc/quanlydanhmuc.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        LoginComponent,
        ProductListComponent,
        ProductDetailComponent,
        RegisterComponent,
        UserComponent,
        CartComponent,
        AdminComponent,
        CheckoutComponent,
        QuanlysanphamComponent,
        ProductlistComponent,
        ProductdetailpopupComponent,
        ProductAddPopupComponent, 
        QuanlydanhmucComponent,
        QuanlydonhangComponent

    ],
    imports: [BrowserModule, ReactiveFormsModule, MatDialogModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
