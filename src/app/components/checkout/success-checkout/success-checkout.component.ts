import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-checkout',
  templateUrl: './success-checkout.component.html',
  styleUrls: ['./success-checkout.component.css']
})
export class SuccessCheckoutComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
