import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancingComponent } from './instancing.component';

describe('InstancingComponent', () => {
  let component: InstancingComponent;
  let fixture: ComponentFixture<InstancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstancingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
