import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should copy text to clipboard when copyText is called', () => {
    const spy = spyOn(document, 'execCommand').and.callThrough();
    const textElement: HTMLParagraphElement = document.createElement('p');
    textElement.textContent = 'Test Text';

    component.copyText(textElement);

    expect(spy).toHaveBeenCalledWith('copy');
  });
});