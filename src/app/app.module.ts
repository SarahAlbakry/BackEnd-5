import { OrderService } from './shared/order.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemComponent } from './orders/order-item/order-item.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDailogComponent } from './confirm-dailog/confirm-dailog.component';
import { MaterialModule } from './material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MaterialModule,
    MatButtonModule
  ],
  entryComponents:[OrderItemComponent , ConfirmDailogComponent],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
