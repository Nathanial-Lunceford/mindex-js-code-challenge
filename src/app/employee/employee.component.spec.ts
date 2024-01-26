import {async, TestBed} from '@angular/core/testing';
import { Component, EventEmitter } from '@angular/core';

import {EmployeeComponent} from './employee.component';
import { By } from '@angular/platform-browser';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
const employeesArray = [
  {
    id: 1,
    firstName: 'Brian',
    lastName: 'McGee',
    position: 'CEO',
    directReports: [2, 3]
  },
  {
    id: 2,
    firstName: 'Homer',
    lastName: 'Thompson',
    position: 'Dev Manager',
    directReports: [4]
  },
  {
    id: 3,
    firstName: 'Rock',
    lastName: 'Strongo',
    position: 'Lead Tester'
  },
  {
    id: 4,
    firstName: 'Max',
    lastName: 'Power',
    position: 'Junior Software Engineer'
  }
];

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };

    expect(comp).toBeTruthy();
  }));

  

  it('should create directReport components', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employees = employeesArray;
    comp.employee = {
      id: 1,
      firstName: 'Brian',
      lastName: 'McGee',
      position: 'CEO',
      directReports: [2, 3]
    };
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.DirectReport'))).toBeTruthy();
  }))


  // Trying to implement mocking a click wasn't working, so this is the next best thing.
  it('delete function should emit', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.debugElement.componentInstance;
    const deleteSpy = spyOn(component.DeleteEmitter, 'emit');
    component.Delete(1);
    expect(deleteSpy).toHaveBeenCalled();
  })

  it('edit function should emit', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.debugElement.componentInstance;
    const editSpy = spyOn(component.EditEmitter, 'emit');
    component.Edit(1);
    expect(editSpy).toHaveBeenCalled();
  })
});
