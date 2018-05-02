import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePublicationComponent } from './page-publication.component';

describe('PagePublicationComponent', () => {
  let component: PagePublicationComponent;
  let fixture: ComponentFixture<PagePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
