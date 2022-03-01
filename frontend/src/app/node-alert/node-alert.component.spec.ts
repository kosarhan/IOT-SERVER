import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeAlertComponent } from './node-alert.component';

describe('NodeAlertComponent', () => {
  let component: NodeAlertComponent;
  let fixture: ComponentFixture<NodeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
