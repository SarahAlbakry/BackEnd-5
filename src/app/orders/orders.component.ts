import { DailogService } from './../shared/dailog.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {

  orderList;
  constructor(
    private service: OrderService,
    private router: Router,
    private toastr: ToastrService,
    private dailog: DailogService
    ) { }

  ngOnInit(): void {
    this.reFresh();
  }
  reFresh()
  {
    this.service.getOrderList().then(res => this.orderList = res);
  }
  // navigation function
  openForEdite(OrderID: number)
  {
   console.log( this.router.navigate(['/order/edit/' + OrderID]));
   this.router.navigate(['/order/edit/' + OrderID]);
  }
  // delete order
  onOrderDelete(id: number){

this.dailog.openConfirmDailog('Are You Sure Delete This Order ?')
.afterClosed().subscribe(res => {
   if (res) {
  this.service.deleteOrder(id).then( response => {
  this.reFresh();
  this.toastr.warning( ' Delete Successfully ' , ' Restaurant App.');
});
   }
});
  }
}
