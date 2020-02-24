import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StandCardComponent } from './stand-card.component';

describe('StandCardComponent', () => {
  let component: StandCardComponent;
  let fixture: ComponentFixture<StandCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
