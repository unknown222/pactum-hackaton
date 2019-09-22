import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Report } from "../../entities/Report";

@Component({
  selector: 'cm-combat-results',
  templateUrl: './combat-results.component.html',
  styleUrls: ['./combat-results.component.scss']
})
export class CombatResultsComponent implements OnInit {

  constructor(
      @Optional() @Inject(MAT_DIALOG_DATA) public data: Report,
      @Optional() public dialogRef: MatDialogRef<CombatResultsComponent>) {
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {

    }
  }

  close() {
    this.dialogRef.close();
  }

}
