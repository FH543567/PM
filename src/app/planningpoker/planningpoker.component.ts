import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-planningpoker',
  templateUrl: './planningpoker.component.html',
  styleUrls: ['./planningpoker.component.css']
})
export class PlanningpokerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlanningpokerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
