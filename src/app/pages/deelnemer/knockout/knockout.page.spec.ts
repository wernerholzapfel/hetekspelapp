import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KnockoutPage } from './knockout.page';

describe('KnockoutPage', () => {
  let component: KnockoutPage;
  let fixture: ComponentFixture<KnockoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnockoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KnockoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
