import { Component, Inject, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dialogmode } from '../dialogmode';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
mode: "EDIT" | "DELETE"
EditMode = dialogmode.edit
deleteMode = dialogmode.delete
employee: Employee;
employeeForm: any;

// This code handles the popup for deleting or updating an employee. 


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  // This sets this component's variables equal to the ones given by the employee list component
  ngOnInit(): void {
    this.mode = this.data.mode;
    this.employee = {...this.data.employee}
    this.employeeForm = new FormGroup({
      firstName: new FormControl(this.employee.firstName, [
        Validators.required, Validators.pattern('^[a-zA-Z ]*$')
      ]),
      lastName: new FormControl(this.employee.lastName, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      position: new FormControl(this.employee.position, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      compensation: new FormControl(this.employee.compensation, [Validators.required, Validators.pattern('^[0-9]+$')])
    });
  }

  // These three methods either close, or send a confirmation of delete, or send edited employee information
  close() {
    this.dialogRef.close();
  }

  Delete() {
    this.dialogRef.close(true)
  }

  Edit() {
    this.employee.firstName = this.employeeForm.value.firstName;
    this.employee.lastName = this.employeeForm.value.lastName;
    this.employee.position = this.employeeForm.value.position;
    this.employee.compensation = this.employeeForm.value.compensation;    
    this.dialogRef.close(this.employee)
  }
}
