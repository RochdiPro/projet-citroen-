import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImporterPage } from './importer.page';

describe('ImporterPage', () => {
  let component: ImporterPage;
  let fixture: ComponentFixture<ImporterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImporterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImporterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
