import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsDashboardComponent } from './user-details-dashboard.component';

describe('UserDetailsDashboardComponent', () => {
  let component: UserDetailsDashboardComponent;
  let fixture: ComponentFixture<UserDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
