import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A2hsComponent } from './a2hs.component';

describe('A2hsComponent', () => {
  let component: A2hsComponent;
  let fixture: ComponentFixture<A2hsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A2hsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A2hsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
