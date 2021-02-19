import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSimpleComponent } from './stat-simple.component';

describe('StatSimpleComponent', () => {
  let component: StatSimpleComponent;
  let fixture: ComponentFixture<StatSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
