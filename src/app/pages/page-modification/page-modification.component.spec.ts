import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageModificationComponent } from './page-modification.component';

describe('PageModificationComponent', () => {
  let component: PageModificationComponent;
  let fixture: ComponentFixture<PageModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
