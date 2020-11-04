import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Customer } from './../../shared/customer.model';
import { CustomerService } from './../../shared/customer.service';
import { OrderItemComponent } from './../order-item/order-item.component';
import { OrderService } from './../../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {
  isvalid: boolean = true;
  customerList: Customer[];
  constructor(
    public service: OrderService,
    private Dailog: MatDialog,
    private customer: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    // get id from real url
    let orderID = this.currentRouter.snapshot.paramMap.get('id');
    // check about id(orderID)
    if (orderID == null) { this.restForm(); }
    else {
      // fill data to table
        this.service.getOrderByID(parseInt(orderID)).then(res => {
        this.service.formData = res.order;
        this.service.orderItem = res.orderDetails;

      });
    }
    this.customer.getCustomerList().then(res => this.customerList = res as Customer[]);
  }
  // initilize value to table(formData)
  restForm(form?: NgForm) {
    if (form = null) { form.resetForm(); }

    this.service.formData = {
      OrderID: null,
      CustomerID: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      PMehtod: '',
      GTotal: 0,
      DeleteOrderItemIDs:'',
    }
    // empty of table
    this.service.orderItem = [];

  }
  //  open dialog in orderitem component and take two parameter
  // first one index of arr and second parameter orderID foreign key
  OpenDailogItem(orderItemIndex, orderID) {

    const DialogCon = new MatDialogConfig();
    DialogCon.autoFocus = true;
    DialogCon.disableClose = true;
    DialogCon.width = "50%";
    DialogCon.data = { orderItemIndex, orderID };
    // when open dialog excute function or called function updateGTotal
    this.Dailog.open(OrderItemComponent, DialogCon).afterClosed().subscribe(res => {
      this.updateGTotal();
    });

  }
  // this function about delet data from table orderitem model
  onDeleteItem(orderItem: number, i: number) {
    if (orderItem != null) {
       // here store arr from new orderItem and seprated by comma
      this.service.formData.DeleteOrderItemIDs += orderItem + ',';

    }
    this.service.orderItem.splice(i, 1);
    this.updateGTotal();
  }
  // this function sum of column Gtotal in orderItem
  updateGTotal() {
    this.service.formData.GTotal = this.service.orderItem.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  }
  // this function about validate from data is fond or not
  isValidForm() {
    this.isvalid = true;
    if (this.service.formData.CustomerID == 0) { return this.isvalid = false; }
    else if (this.service.orderItem.length == 0) { return this.isvalid = false; }
    else if (this.service.formData.PMehtod == '') { return this.isvalid = false; }
    return this.isvalid;
  }
  // click on submit excute two fun validate and post data
  onSubmit(form: NgForm) {
    if (this.isValidForm()) {
      this.service.saveOrupdateOrder().subscribe(res => {
        return this.restForm();
      });
      this.toastr.success('Submitted Successfully', 'Restaurant App.');
      this.router.navigate(['/orders']);
    }
  }
}
