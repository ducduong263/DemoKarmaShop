import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

@Component({
  selector: 'app-quanlytaikhoan',
  templateUrl: './quanlytaikhoan.component.html',
  styleUrls: ['./quanlytaikhoan.component.css']
})
export class QuanlytaikhoanComponent implements OnInit{
    accounts: Account[] = [];
    showPopup:boolean = false;
    newAccount: Account = this.createNewAccount();
    createNewAccount(): Account {
        return {
          id: 0,
          name: '',
          email: '',
          password: '',
          role: 'user'
        };
      }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.http.get<Account[]>('http://localhost:3000/users').subscribe(
      (data) => {
        this.accounts = data;
      },
      (error) => {
        console.error('Error loading accounts:', error);
      }
    );
  }

  createAccount() {
    // Cập nhật id cho newAccount
    this.newAccount.id = Date.now();
    
    this.http.post('http://localhost:3000/users', this.newAccount).subscribe(
      () => {
        console.log('Account created successfully');
        this.loadAccounts();
        this.newAccount = this.createNewAccount();
        this.closePopup(); // Reset lại newAccount sau khi đã tạo
      },
      (error) => {
        console.error('Error creating account:', error);
      }
    );
  }

  assignRole(account: Account, role: 'user' | 'admin') {
    this.http.patch(`http://localhost:3000/users/${account.id}`, { role }).subscribe(
      () => {
        console.log(`Role assigned to ${account.name}`);
        this.loadAccounts();
      },
      (error) => {
        console.error('Error assigning role:', error);
      }
    );
  }

  deleteAccount(account: Account) {
    this.http.delete(`http://localhost:3000/users/${account.id}`).subscribe(
      () => {
        console.log(`Account ${account.name} deleted`);
        this.loadAccounts();
      },
      (error) => {
        console.error('Error deleting account:', error);
      }
    );
  }
  openPopup() {
    this.showPopup = true;
    console.log("click");
  }

  closePopup() {
    this.showPopup = false;
    
  }
}