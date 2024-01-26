import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { By } from '@angular/platform-browser';
import { MockProvider, MockRender } from 'ng-mocks';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
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
      MockProvider(MAT_DIALOG_DATA, mockObj_EDIT),
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

  it('When user is editing, only edit elements should be visible', () => {
    component.ngOnInit();
    expect(fixture.debugElement.query(By.css('.delete'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.edit'))).toBeTruthy();
  })
});
