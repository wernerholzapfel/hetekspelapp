import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HalloffamePage } from './halloffame.page';

describe('HalloffamePage', () => {
  let component: HalloffamePage;
  let fixture: ComponentFixture<HalloffamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalloffamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HalloffamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
