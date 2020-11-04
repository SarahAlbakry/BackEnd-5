import { ConfirmDailogComponent } from './../confirm-dailog/confirm-dailog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DailogService {

  constructor(private dailog: MatDialog) { }


openConfirmDailog(msg)
{
  return this.dailog.open(ConfirmDailogComponent, {
    width: '390px',
    panelClass: 'confirm-dialog-container',
    disableClose: true,
    data: { message: msg }
  });
}
}
