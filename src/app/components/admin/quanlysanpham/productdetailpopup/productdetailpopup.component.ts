import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail-popup',
  templateUrl: './productdetailpopup.component.html',
})
export class ProductdetailpopupComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductdetailpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  editProduct(): void {
    // Implement your edit logic here
  }
}
