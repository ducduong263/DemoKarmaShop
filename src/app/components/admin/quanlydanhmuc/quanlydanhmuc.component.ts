import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-quanlydanhmuc',
  templateUrl: './quanlydanhmuc.component.html',
  styleUrls: ['./quanlydanhmuc.component.css']
})
export class QuanlydanhmucComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';

  constructor(
    private pro: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {
    this.pro.getCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }
  onAddCategory() {
    if (this.newCategoryName.trim() !== '') {
      const existingCategory = this.categories.find(category => category.name.toLowerCase() === this.newCategoryName.toLowerCase());
      if (existingCategory) {
        this.toastr.error("Tên danh mục đã tồn tại", "Thông báo", {
          progressBar: true,
          newestOnTop: true
        });
      } else {
        const newCategory = { name: this.newCategoryName };

        this.pro.addCategory(newCategory).subscribe(
          (res) => {
            this.categories.push(res);
            this.newCategoryName = '';
            this.toastr.success("Thêm danh mục mới thành công", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            });
          },
          (error) => {
            console.error('Error adding category', error);
          }
        );
      }
    }
  }
  onDeleteCategory(item: any) {
    const confirmDelete = confirm(`Bạn có chắc muốn xóa danh mục "${item.name}" không?`);
    if (confirmDelete) {
      this.pro.deleteCategory(item.id).subscribe(
        () => {
          this.categories = this.categories.filter(category => category.id !== item.id);
        },
        (error) => {
          console.error('Error deleting category', error);
        }
      );
    }
  }
}
