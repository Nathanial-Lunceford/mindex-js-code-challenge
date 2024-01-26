import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent{
  //This gets the input from the employee list HTML
  @Input() employee: Employee;
  @Input() employees: Employee[];


  // These emit information to the employee list when a delete or edit button is pressed
  @Output() DeleteEmitter: EventEmitter<any> = new EventEmitter();
  @Output() EditEmitter: EventEmitter<any> = new EventEmitter();
  canEdit: boolean = false;

  constructor() {
  }

  Delete(employeeID: number) {
    this.DeleteEmitter.emit(employeeID);
  }

  Edit(employeeID: number) {
    this.EditEmitter.emit(employeeID);
  }
}
