import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestcompAngularComponent} from './testcomp-angular.component';

describe('TestcompAngularComponent', () => {
  let component: TestcompAngularComponent;
  let fixture: ComponentFixture<TestcompAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestcompAngularComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcompAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
