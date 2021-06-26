import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {KnockoutPredictionItemComponent} from './knockout-prediction-item.component';

describe('KnockoutPredictionItemComponent', () => {
  let component: KnockoutPredictionItemComponent;
  let fixture: ComponentFixture<KnockoutPredictionItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [KnockoutPredictionItemComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KnockoutPredictionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
