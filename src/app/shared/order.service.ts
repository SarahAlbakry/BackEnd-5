import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from './order-item.model';
import { Order } from './order.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItem: OrderItem[];
  constructor(private http: HttpClient) { }

  // this function about post data in order and orderItem tables
  saveOrupdateOrder() {
    var body = {
      // restructurings Index from JavaScript
      ...this.formData,
      OrderItems: this.orderItem
    };
    //  post the order to database
    return this.http.post(environment.apiUrl + '/C_Order', body);
  }

  //  get orderlist from database
  getOrderList() {
    return this.http.get(environment.apiUrl + '/C_Order').toPromise();
  }

  // get data by using (id) for update
  getOrderByID(id: number): any {
    return this.http.get(environment.apiUrl + '/C_Order/' + id).toPromise();
  }

  deleteOrder(id: number){
    return this.http.delete(environment.apiUrl + '/C_Order/' + id).toPromise();
  }
}
