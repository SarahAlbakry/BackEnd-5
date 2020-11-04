import { OrderService } from './../../shared/order.service';
import { Item } from './../../shared/item.model';
import { ItemService } from './../../shared/item.service';
import { OrderItem } from './../../shared/order-item.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: [
  ]
})
export class OrderItemComponent implements OnInit {

  title = "Order Food Item";

  formDataItem: OrderItem;
  ItemFood: Item[];
  isvalid: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemComponent>,
    private itemService: ItemService,
    private oder: OrderService

  ) { }
  //  initialize value of function called OpenDailogItem to form(formDataItem)
  ngOnInit(): void {
    this.itemService.getItemList().then(res => this.ItemFood = res as Item[]);
    if (this.data.orderItemIndex == null) {
      this.formDataItem = {
        OrderItemID: null,
        ItemID: 0,
        OrderID: this.data.orderID,
        Quantity: 0,
        ItemName: '',
        Price: 0,
        Total: 0
      }
    }
    else {
      this.formDataItem = Object.assign({}, this.oder.orderItem[this.data.orderItemIndex]);
    }
  }
  // this function about updateprice if price&itemfood is empty or not
  updatePrice(dolrs) {
    if (dolrs.selectedIndex == 0) {

      this.formDataItem.Price = 0;
      this.formDataItem.ItemName = '';
    }
    else {
      this.formDataItem.Price = this.ItemFood[dolrs.selectedIndex - 1].Price;
      this.formDataItem.ItemName = this.ItemFood[dolrs.selectedIndex - 1].Name;
    }
    // when change item food also change total
    this.resultTotal();
  }
  // this function about mulltiplay quantity with price
  resultTotal() {
    this.formDataItem.Total = parseFloat((this.formDataItem.Quantity * this.formDataItem.Price).toFixed(2));
  }
  //   push orderItem data or submit data to order component in table
  onSubmit(form: NgModel) {
     //  validate from data is found or empty
    if (this.isValidDataForm(form.value)) {
      // check value if new data or fill
      if (this.data.orderItemIndex == null) {
        this.oder.orderItem.push(form.value);
      }
      else {
        this.oder.orderItem[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }
  // this function  is validate from itemfood&quantity is empty
  isValidDataForm(formDataItem: OrderItem) {
    this.isvalid = true;
    if (this.formDataItem.OrderID == 0) {
      this.isvalid = false;
    }
    else if (this.formDataItem.Quantity == 0) {
      this.isvalid = false;
    }
    return this.isvalid;
  }
}
