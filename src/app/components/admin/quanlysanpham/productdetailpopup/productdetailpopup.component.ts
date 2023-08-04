import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/Service/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-product-detail-popup',
  templateUrl: './productdetailpopup.component.html',
})
export class ProductdetailpopupComponent {
  editprof: FormGroup;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductdetailpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editprof = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description],
      color: [data.color],
      size: [data.size],
      price: [data.price],
      quantity: [data.quantity, Validators.min(0)],
      image: [data.image],
      category: [data.category, Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  editProduct(): void {
    if (this.editprof.valid) {
      const editedProduct = this.editprof.value;
      editedProduct.id = this.data.id;
      this.productService.updateProduct(this.editprof.value).subscribe(
        () => {
          console.log(editedProduct);
          this.toastr.success("Lưu thông tin sản phẩm thành công", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
          this.dialogRef.close(editedProduct);
        },
      );
    }
    else {
      this.toastr.error("Vui lòng điền đầy đủ thông tin", "Thông báo", {
        progressBar: true,
        newestOnTop: true
      })
    }
  }
}
