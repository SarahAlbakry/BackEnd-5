import { OrderItem } from './order-item.model';
import { Order } from './order.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData:Order;
  orderItem:OrderItem[];
  constructor() { }
}
