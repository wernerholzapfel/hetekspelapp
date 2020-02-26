import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpelregelsPage } from './spelregels.page';

describe('SpelregelsPage', () => {
  let component: SpelregelsPage;
  let fixture: ComponentFixture<SpelregelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelregelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpelregelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
