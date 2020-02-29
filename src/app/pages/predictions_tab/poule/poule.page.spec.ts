import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoulePage } from './poule.page';

describe('PoulePage', () => {
  let component: PoulePage;
  let fixture: ComponentFixture<PoulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
