import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JcatComponent } from './jcat.component';

describe('JcatComponent', () => {
  let component: JcatComponent;
  let fixture: ComponentFixture<JcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
