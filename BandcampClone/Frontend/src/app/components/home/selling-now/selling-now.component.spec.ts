import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingNowComponent } from './selling-now.component';

describe('SellingNowComponent', () => {
  let component: SellingNowComponent;
  let fixture: ComponentFixture<SellingNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingNowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellingNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
