import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicLoaderComponent } from './profile-pic-loader.component';

describe('ProfilePicLoaderComponent', () => {
  let component: ProfilePicLoaderComponent;
  let fixture: ComponentFixture<ProfilePicLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePicLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePicLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
