import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasestudyviewComponent } from './casestudyview.component';

describe('CasestudyviewComponent', () => {
  let component: CasestudyviewComponent;
  let fixture: ComponentFixture<CasestudyviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasestudyviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasestudyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
