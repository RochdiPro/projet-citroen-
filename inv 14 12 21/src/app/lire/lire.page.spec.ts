import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LirePage } from './lire.page';

describe('LirePage', () => {
  let component: LirePage;
  let fixture: ComponentFixture<LirePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LirePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
