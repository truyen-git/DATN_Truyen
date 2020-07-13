import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomComponent } from './mom.component';

describe('MomComponent', () => {
  let component: MomComponent;
  let fixture: ComponentFixture<MomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
