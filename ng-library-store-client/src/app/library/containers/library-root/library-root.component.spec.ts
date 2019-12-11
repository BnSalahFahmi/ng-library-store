import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryRootComponent } from './library-root.component';

describe('LibraryRootComponent', () => {
  let component: LibraryRootComponent;
  let fixture: ComponentFixture<LibraryRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
