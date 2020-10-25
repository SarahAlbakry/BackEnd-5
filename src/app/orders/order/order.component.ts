import { OrderItemComponent } from './../order-item/order-item.component';
import { OrderService } from './../../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {

  constructor(
    public service: OrderService,
    private Dailog: MatDialog

  ) { }

  ngOnInit(): void {
    this.restForm();
  }
  // initilize value to table(formData)
  restForm(form?: NgForm) {
    if ( form = null )
     { form.resetForm();}

    this.service.formData = {
      OrderID: null,
      CustomerID: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      PMehtod: '',
      GTotal: 0
    }
    // empty of table
    this.service.orderItem = [];

  }
  // this function about open dialog in orderitem component
  AddOrEditItem(orderItemIndex, orderID) {

    const DialogCon = new MatDialogConfig();
    DialogCon.autoFocus = true;
    DialogCon.disableClose = true;
    DialogCon.width = "50%";
    DialogCon.data = { orderItemIndex, orderID };

    this.Dailog.open(OrderItemComponent, DialogCon);

  }
  // this function about delet data from table orderitem model
  onDeleteItem(orderItem: number, i: number) {
    this.service.orderItem.splice(i,1);
  }
}
