import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonstructComponent } from './jsonstruct.component';

describe('JsonstructComponent', () => {
  let component: JsonstructComponent;
  let fixture: ComponentFixture<JsonstructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonstructComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
