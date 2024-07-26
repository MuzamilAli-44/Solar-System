import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformToolComponent } from './transform-tool.component';

describe('TransformToolComponent', () => {
  let component: TransformToolComponent;
  let fixture: ComponentFixture<TransformToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransformToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
