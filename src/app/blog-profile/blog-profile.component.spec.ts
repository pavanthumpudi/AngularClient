import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogProfileComponent } from './blog-profile.component';

describe('BlogProfileComponent', () => {
  let component: BlogProfileComponent;
  let fixture: ComponentFixture<BlogProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
