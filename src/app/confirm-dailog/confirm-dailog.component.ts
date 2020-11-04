import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-dailog',
  templateUrl: './confirm-dailog.component.html',
  styleUrls: ['./confirm-dailog.component.scss']
})
export class ConfirmDailogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data : any ,
  public dailogRef: MatDialogRef<ConfirmDailogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
this.dailogRef.close(false);
  }
  onConfirm(): void {
    // Close the dialog, return true
    this.dailogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dailogRef.close(false);
  }

}
