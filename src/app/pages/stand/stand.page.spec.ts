import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StandPage } from './stand.page';

describe('StandPage', () => {
  let component: StandPage;
  let fixture: ComponentFixture<StandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
