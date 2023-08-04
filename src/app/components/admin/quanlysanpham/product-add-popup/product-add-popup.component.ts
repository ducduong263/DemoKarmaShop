import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/Service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add-popup',
  templateUrl: './product-add-popup.component.html',
})
export class ProductAddPopupComponent {
  addProductForm: FormGroup;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductAddPopupComponent>,
  ) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      color: [''],
      size: [''],
      price: [0],
      quantity: [0, Validators.min(0)],
      image: [''],
      category: ['', Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addProduct(): void {
    if (this.addProductForm.valid) {
      const newProduct = this.addProductForm.value;
      this.productService.addProduct(newProduct).subscribe(
        () => {
          this.toastr.success("Thêm sản phẩm thành công", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error("Lỗi khi thêm sản phẩm", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
        }
      );
    }
    else {
      this.toastr.error("Vui lòng điền đầy đủ thông tin", "Thông báo", {
        progressBar: true,
        newestOnTop: true
      })
    }
  }
  // onImageFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.addProductForm.patchValue({ imageFile: file, imageUrl: '' });
  //   }
  // }

  onImageUrlChanged() {
    const imageUrl = this.addProductForm.get('image')?.value;
    if (imageUrl) {
      this.addProductForm.patchValue({ imageFile: null });
    }
  }

  getImageUrl() {
    const imageUrl = this.addProductForm.get('image')?.value;
    if (imageUrl) {
      return imageUrl;
    }
    return '';
  }

}
