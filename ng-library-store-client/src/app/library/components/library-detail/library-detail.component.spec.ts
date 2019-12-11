import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryDetailComponent } from './library-detail.component';

describe('LibraryDetailComponent', () => {
  let component: LibraryDetailComponent;
  let fixture: ComponentFixture<LibraryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
