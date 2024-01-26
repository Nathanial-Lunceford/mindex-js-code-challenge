import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import { DialogComponent } from '../dialog/dialog.component';
import { dialogmode } from '../dialogmode';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, ) {
  }


// This method collects the employee list when the page is loaded.
  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

  // These methods use the employee ID emitted to get the employee information. Then, they send that information to the DialogComponent. After the user makes a decision, that decision is taken back here, where the employee is either deleted, edited, or left alone.
  async onDelete(employeeID: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        employee: this.employees[employeeID], 
        mode: dialogmode.delete
      }
    })
    var deleteConfirmed:boolean = await dialogRef.afterClosed().toPromise();
    if(deleteConfirmed)
    {
      this.employeeService.remove(this.employees[employeeID]).subscribe(returnedEmployee => {
        console.log("employee was deleted");
        this.employees.forEach(employee => {
          if(employee.directReports != null)
          {
            for(var i = 0; i < employee.directReports.length; i++)
            {
              if(employee.directReports[i] == employeeID + 1)
              {
                employee.directReports.splice(i, 1);
              }
            }
          }
        })
        this.employees.splice(employeeID, 1);
      });
    }    
  }

  async onEdit(employeeId: number)
  {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        employee: this.employees[employeeId], 
        mode: dialogmode.edit
      }
    })
    var editConfirmed: Employee = await dialogRef.afterClosed().toPromise();
    if(editConfirmed)
    {
      this.employeeService.save(editConfirmed).subscribe( returnedEmployee => {
        console.log("employee was edited");
        this.employees[returnedEmployee.id - 1] = returnedEmployee;
      })
    }
    console.log("edit was ran");
  }
}
