import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListerPage } from './lister.page';

describe('ListerPage', () => {
  let component: ListerPage;
  let fixture: ComponentFixture<ListerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
