import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeelnemerPage } from './deelnemer.page';

describe('DeelnemerPage', () => {
  let component: DeelnemerPage;
  let fixture: ComponentFixture<DeelnemerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeelnemerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeelnemerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
