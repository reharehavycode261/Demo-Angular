import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CopyService } from './copy.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let copyServiceSpy: jasmine.SpyObj<CopyService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CopyService', ['copyText']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: CopyService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    copyServiceSpy = TestBed.inject(CopyService) as jasmine.SpyObj<CopyService>;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait appeler copyText depuis CopyService lors de l\'appel de copyImportantText', () => {
    const text = component.importantText;
    component.copyImportantText();
    expect(copyServiceSpy.copyText).toHaveBeenCalledWith(text);
  });
});