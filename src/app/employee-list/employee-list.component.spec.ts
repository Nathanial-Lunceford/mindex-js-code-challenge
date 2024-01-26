import {async, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from '../employee.service';
import { of } from 'rxjs';
import { Employee } from '../employee';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockProvider } from 'ng-mocks';

var mockEmployeeValue: Employee[] =
[
  {
    id: 1,
    firstName: 'Brian',
    lastName: 'McGee',
    position: 'CEO',
    compensation: 0,
    directReports: [2, 3]
  },
  {
    id: 2,
    firstName: 'Homer',
    lastName: 'Thompson',
    position: 'Dev Manager',
    compensation: 0,
    directReports: [4]
  },
  {
    id: 3,
    firstName: 'Rock',
    lastName: 'Strongo',
    position: 'Lead Tester',
    compensation: 0,
  },
  {
    id: 4,
    firstName: 'Max',
    lastName: 'Power',
    compensation: 0,
    position: 'Junior Software Engineer'
  }
];

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

let employeeService:EmployeeService;

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
        GridListComponent,
        GridTileComponent
      ],
      imports: [
        MatDialogModule
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        MatDialogModule, MatDialog,
      MockProvider(MAT_DIALOG_DATA), 
      {provide: MatDialogRef, useValue: {}}
      ],
    }).compileComponents();
    employeeService = TestBed.inject(EmployeeService);
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('should get initial values', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    employeeServiceSpy['getAll'].and.returnValue(mockEmployeeValue);
    expect(comp.employees).toBeTruthy();
  }))
});
