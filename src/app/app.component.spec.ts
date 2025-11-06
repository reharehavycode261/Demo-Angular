import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';

class MockNgxSpinnerService {
  show() {}
  hide() {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let spinnerService: NgxSpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: NgxSpinnerService, useClass: MockNgxSpinnerService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(NgxSpinnerService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide spinner during data export', async () => {
    spyOn(spinnerService, 'show');
    spyOn(spinnerService, 'hide');

    spyOn(component['regionService'], 'getRegions').and.returnValue(of([]));

    await component.exportData('pdf');
    expect(spinnerService.show).toHaveBeenCalled();
    expect(spinnerService.hide).toHaveBeenCalled();
  });
});