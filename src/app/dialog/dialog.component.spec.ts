import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { By } from '@angular/platform-browser';
import { MockProvider, MockRender } from 'ng-mocks';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let mockObj = { employee: {
    "id": 2,
  "firstName": "Homer",
  "lastName": "Thompson",
  "position": "Dev Manager",
  "compensation": "",
  "directReports": [
      4
    ]
  }, 
  mode: "DELETE"}
  let mockObj_EDIT = {
    employee: {
      "id": 2,
    "firstName": "Homer",
    "lastName": "Thompson",
    "position": "Dev Manager",
    "directReports": [
        4
      ]
    }, 
    mode: "EDIT"
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [MatDialogModule, MatDialog,
      MockProvider(MAT_DIALOG_DATA, mockObj), 
      {provide: MatDialogRef, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When user is deleting, only delete elements should be visible', () => {
    component.ngOnInit();
    expect(fixture.debugElement.query(By.css('.edit'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.delete'))).toBeTruthy();
  })

  it('When popup is opened, component should receive information correctly', () => {
    component.ngOnInit();
    expect(component.mode).toEqual(mockObj.mode);
    expect(component.employee.id).toEqual(2);
    expect(component.employee.firstName).toEqual("Homer");
  })

});
