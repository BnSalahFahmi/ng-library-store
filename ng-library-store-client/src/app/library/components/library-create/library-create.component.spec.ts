import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCreateComponent } from './library-create.component';

describe('LibraryCreateComponent', () => {
  let component: LibraryCreateComponent;
  let fixture: ComponentFixture<LibraryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
